import React, {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { processCode } from './utils';
import {update} from "../../reducers/consoleReducers";

async function sleepA(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

export default function RodEngine(props) {
        const dispatch = useDispatch();
        const code = useSelector((state) => state.code.value[props.id])
        const running = useSelector((state) => state.run.value[props.id])
        const speed = useSelector((state) => 1000/(state.speed.value[props.id] || 1));
        const canvasRef = useRef(null);
        const cs = props.cellSize;
        const cells = props.cells;
        const eqRod = props.eqRod;
        const rRef = useRef([...props.rod]);
        const setConsoleMessage = (x) => dispatch(update({id: props.id, text: x}))
        const starttime = useRef(null);

        const runCode = (demoCode) => {
            setConsoleMessage("");
            if(demoCode){
                eval(processCode(demoCode));
            } else{
                eval(processCode(code || ""));
            }
        }

          useEffect(() => {
              if(!running){
                  rRef.current = [...props.rod];
                  animate();
              } else if(running == "demo"){
                runCode(`
                let nextVals = [...rRef.current];
                for(let i=0; i<100000; i++){
                    if (window.shouldStopCode) { throw new Error('CODE STOPPED')}
                    for(let j=1; j<rRef.current.length-1; j++){
                        nextVals[j] = 0.33*rRef.current[j-1] + 0.33*rRef.current[j+1] + 0.34*rRef.current[j];
                    }
                    rRef.current = [...nextVals];
                    if(i%10==0){await sleepA(10);animate();}
                }`)
              } else{
                  runCode();
              }
          }, [running])

          useEffect(() => {
            rRef.current = [...props.rod];
            animate();
          }, [props.rod])

          const solve = async () => {
            let nextVals = [...rRef.current]
            for(let i=0; i<100000; i++){
                if (window.shouldStopCode) { throw new Error('CODE STOPPED')}
                for(let j=1; j<rRef.current.length-1; j++){
                    nextVals[j] = 0.33*rRef.current[j-1] + 0.33*rRef.current[j+1] + 0.34*rRef.current[j];
                }
                rRef.current = [...nextVals];
                if(i%1==0){await sleepA(1000);animate();}
            }
        }

        const animate = () => {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            canvas.width = cs*cells;
            canvas.height = 1000;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.strokeStyle="black";
            ctx.stroke();
            for(let i=0; i<rRef.current.length; i++){
                ctx.fillStyle = 'rgb(' + (rRef.current[i]/100)*255 + ", 0, " + ((100-rRef.current[i])/100)*255 + ")";
                ctx.fillRect(10+i*6, 200, 6, 200);
            }

            for(let i=0; i<eqRod.length; i++){
                ctx.fillStyle = 'rgb(' + (eqRod[i]/100)*255 + ", 0, " + ((100-eqRod[i])/100)*255 + ")";
                ctx.fillRect(10+i*6, 600, 6, 200);
            }
        }

    return(
            <canvas ref={canvasRef}/>
    )
}