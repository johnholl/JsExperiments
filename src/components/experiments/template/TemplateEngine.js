import React, {useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { processCode } from './utils';
import { update, reset } from '../../reducers/consoleReducers';

async function sleepA(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

export default function TemplateEngine(props) {
        const dispatch = useDispatch();
        const code = useSelector((state) => state.code.value[props.id])
        const running = useSelector((state) => state.run.value[props.id])
        const speed = useSelector((state) => 1000/(state.speed.value[props.id] || 1));
        const canvasRef = useRef(null);
        const dataRef = useRef([...props.data]);
        const setConsoleMessage = (x) => dispatch(update({id: props.id, text: x}))

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
                runCode(`console.log("demo code goes here")`)
              } else{
                  runCode();
              }
          }, [running])

          useEffect(() => {
            dataRef.current = props.data;
            animate();
          }, [props.data])


        const animate = () => {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            canvas.width = 800;
            canvas.height = 1000;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            
        }

    return(
            <canvas ref={canvasRef}/>
    )
}