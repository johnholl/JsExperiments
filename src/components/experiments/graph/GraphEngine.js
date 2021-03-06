import React, {useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {update, reset} from '../../reducers/consoleReducers';
import { processCode, forceCoulomb, forceHooke, distance} from './utils';

const sample = `for(var i=0; i<1000; i++){
    if (window.shouldStopCode) { throw new Error('CODE STOPPED')}
    updateLocation();
    if(i%1==0){
        await sleepA(speed);
        animate();
        }
    }
    animate();`

async function sleepA(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const eps = 1;
const scale = 40;

export default function GraphEngine(props) {
        const dispatch = useDispatch();
        const code = useSelector((state) => state.code.value[props.id])
        const speed = useSelector((state) => 100/(state.speed.value[props.id] || 1));
        const running = useSelector((state) => state.run.value[props.id])
        const canvasRef = useRef(null);
        const graph = props.graph;
        const [nodes, setNodes] = useState(props.nodes);
        const locations = useRef([...props.locations]);
        const velocities = useRef(Array(nodes.length).fill([0,0]));
        const setConsoleMessage = (x) => dispatch(update({id: props.id, text: x}))

        const runCode = (demoCode) => {
            dispatch(reset({id:props.id}));
            if(demoCode){
                eval(processCode(demoCode));
            }
            else {
                eval(processCode(code || ""));
            }
        }

          useEffect(() => {
              if(!running){
                  locations.current = [...props.locations];
                  animate();
              } else if(running == "demo"){
                runCode(sample);
              } else{
                  runCode();
              }
          }, [running])

          useEffect(() => {
              locations.current = [...props.locations]
            animate();
          }, [graph])
        
            const updateLocation = () => {
            const ls = locations.current;
            const vs = velocities.current;
            const n = nodes.length;
            let forces = Array(n).fill([0,0]);
            for(var i=0; i<n-1; i++){
                for(var j=i+1; j<n; j++){
                    const fc = forceCoulomb(ls[i][0], ls[i][1], ls[j][0], ls[j][1], 1);
                    forces[i] = [forces[i][0] + fc[0], forces[i][1] + fc[1]];
                    forces[j] = [forces[j][0] - fc[0], forces[j][1] - fc[1]];
                }
            }
            graph.forEach((e)=>{
                const fh = forceHooke(ls[e[0]][0], ls[e[0]][1], ls[e[1]][0], ls[e[1]][1], 1);
                forces[e[0]] = [forces[e[0]][0] + fh[0], forces[e[0]][1] + fh[1]];
                forces[e[1]] = [forces[e[1]][0] - fh[0], forces[e[1]][1] - fh[1]];

            });
            velocities.current = vs.map((v, i) => {return [forces[i][0], forces[i][1]]})
            locations.current = ls.map((l,i) => {return [l[0]+eps*velocities.current[i][0], l[1]+eps*velocities.current[i][1]]})
        }


        const animate = async () => {
                await sleepA(speed);
                const canvas = canvasRef.current
                const ctx = canvas.getContext('2d')
                canvas.width = 500;
                canvas.height = 500;
                const n = nodes.length;
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.fillStyle = "black";
                for(var i=0; i<locations.current.length; i++){
                    ctx.fillRect(scale*locations.current[i][0] + 250, scale*locations.current[i][1] + 250, 10, 10);            
                }

                ctx.strokeStyle = "red";
                graph.forEach((e) => {
                    const ls = locations.current;
                    ctx.moveTo(scale*ls[e[0]][0]+255, scale*ls[e[0]][1]+255);
                    ctx.lineTo(scale*ls[e[1]][0]+255, scale*ls[e[1]][1]+255);
                    ctx.stroke();
                })
        }

    if(!locations){
        return(<div/>)
    }
    return(
            <canvas ref={canvasRef}/>
    )
}