import React, {useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { processCode } from './utils';
import { update, reset } from '../../reducers/consoleReducers';

async function sleepA(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "purple", "gold", "black"];

export default function HanoiEngine(props: any) {
        const dispatch = useDispatch();
        const code = useSelector((state: any) => state.code.value[props.id])
        const running = useSelector((state: any) => state.run.value[props.id])
        const speed = useSelector((state: any) => 1000/(state.speed.value[props.id] || 1));
        const canvasRef = useRef<HTMLCanvasElement | null>(null);
        const towerRef = useRef([[...props.towers[0]], [...props.towers[1]], [...props.towers[2]]]);
        const setConsoleMessage = (x: String) => dispatch(update({id: props.id, text: x}))

        const runCode = (demoCode = "") => {
            dispatch(reset({id:props.id}));
            if(demoCode != ""){
                eval(processCode(demoCode));
            } else{
                eval(processCode(code || ""));
            }
        }

          useEffect(() => {
              if(!running){
                  towerRef.current = [[...props.towers[0]], [...props.towers[1]], [...props.towers[2]]];
                  animate();
              } else if(running == "demo"){
                runCode(`await recurse(10, 0, 2, 1)`)
              } else{
                  runCode();
              }
          }, [running])

          useEffect(() => {
            towerRef.current = [[...props.towers[0]], [...props.towers[1]], [...props.towers[2]]];
            animate();
          }, [props.towers])


        const recurse = async(size: number, source: number, target: number, aux: number) => {
            if (window.shouldStopCode) { throw new Error('CODE STOPPED')} 
            if(size>0){
                await recurse(size-1, source, aux, target);
                await move(source, target);
                await recurse(size-1, aux, target, source);
            }
            return;
        }

        const move = async (i: number, j: number) => {
            if(towerRef.current[i].length == 0){
                return
            } else if(towerRef.current[j].length != 0 && towerRef.current[i][-1] > towerRef.current[j][-1]){
                return
            }
            // await sleepA(speed);
            animate(i, j);
            await sleepA(speed);
            towerRef.current[j].push(towerRef.current[i].pop())
            animate();
        }

        const animate = (p1=-1, p2=-1) => {
            const canvas = canvasRef!.current;
            const ctx = canvas!.getContext('2d');
            canvas!.width = 600;
            canvas!.height = 600;
            ctx!.clearRect(0, 0, ctx!.canvas.width, ctx!.canvas.height);
            for(let i=0; i<3; i++){
                for(let j=0; j<towerRef.current[i].length; j++){
                    if((i == p1 || i == p2) && j==towerRef.current[i].length-1){
                        ctx!.fillStyle = 'gray';
                    } else{
                        ctx!.fillStyle = colors[towerRef.current[i][j]-1]
                    }
                    ctx!.fillRect(i*200 +(100 - towerRef.current[i][j]*9), 580-j*18, towerRef.current[i][j]*18, 18)
                }
            }
        }

    return(
            <canvas ref={canvasRef}/>
    )
}