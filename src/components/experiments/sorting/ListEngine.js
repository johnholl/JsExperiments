import React, {useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { processCode } from './utils';
import { update, reset } from '../../reducers/consoleReducers';

async function sleepA(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

export default function ListEngine(props) {
        const dispatch = useDispatch();
        const code = useSelector((state) => state.code.value[props.id])
        const running = useSelector((state) => state.run.value[props.id])
        const speed = useSelector((state) => 1000/(state.speed.value[props.id] || 1));
        const canvasRef = useRef(null);
        const cs = props.cellSize;
        const cells = props.cells;
        const sortedList = props.sortedList;
        const lref = useRef(props.list);
        const setConsoleMessage = (x) => dispatch(update({id: props.id, text: x}))
        const starttime = useRef(null);

        const runCode = (demoCode) => {
            dispatch(reset({id:props.id}));
            if(demoCode){
                eval(processCode(demoCode));
            } else{
                eval(processCode(code || ""));
            }
        }

          useEffect(() => {
              if(!running){
                  lref.current = props.list;
                  animate();
              } else if(running == "demo"){
                runCode(`for(var i=0; i<arr.length; i++){
                    var min = arr[i];
                    var minidx = i;
                    for(var j=i; j<arr.length; j++){
                        if(arr[j] < min){
                            min = arr[j];
                            minidx = j;
                        }
                    }
                    swap(i, minidx);
                }`)
              } else{
                  runCode();
              }
          }, [running])

          useEffect(() => {
            lref.current = props.list;
            animate();
          }, [props.list])


        const selectionSort = async () => {
            for(var i=0; i<lref.current.length; i++){
                var min = lref.current[i];
                var minidx = i;
                for(var j=i; j<lref.current.length; j++){
                    if(lref.current[j] < min){
                        min = lref.current[j];
                        minidx = j;
                    }
                }
                await swap(i, minidx);
            }
        }

        const swap = async (i, j) => {
            animate(i, j);
            await sleepA(speed);
            animate()
            let newList = [...lref.current];
            var x = newList[i];
            newList[i] = newList[j];
            newList[j] = x;
            lref.current = newList;
        }

        const animate = (p1=-1, p2=-1) => {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            canvas.width = cs*cells;
            canvas.height = 1000;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            for(let i=0; i<lref.current.length; i++){
                if(i == p1 || i == p2){
                    ctx.fillStyle = 'gray';
                }
                else if(sortedList[i] == lref.current[i]){
                    ctx.fillStyle = colors[Math.floor((i*7)/20) % 7]
                } else{
                    ctx.fillStyle = 'black';
                }
                ctx.fillRect(cs*i, canvas.height, cs/2, -5*lref.current[i])

            }
        }

    return(
            <canvas ref={canvasRef}/>
    )
}