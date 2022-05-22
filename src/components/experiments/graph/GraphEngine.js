import React, {useEffect, useRef, useState} from 'react';
import { processCode } from './utils';
import {forceCoulomb, forceHooke, distance} from './utils';

async function sleepA(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const eps = 1;
const scale = 40;

export default function GraphEngine(props) {

        const code = props.code;
        const running = props.running;
        const canvasRef = useRef(null);
        const graph = props.graph;
        const [nodes, setNodes] = useState(props.nodes);
        const locations = useRef(props.locations);
        const velocities = useRef(Array(nodes.length).fill([0,0]));
        const speed = props.speed;
        const setConsoleMessage = props.setConsoleMessage; 

        const runCode = (demoCode) => {
            setConsoleMessage("");
            if(demoCode){
                eval(processCode(demoCode));
            }
            else {
                eval(processCode(code));
            }
        }

          useEffect(() => {
              if(!running){
                  locations.current = props.locations;
                  animateGraph();
              } else if(running == "demo"){
                runCode(`for(var i=0; i<1000; i++){
                    if (window.shouldStopCode) { throw new Error('CODE STOPPED')}
                    updateLocation();
                    if(i%1==0){
                        await sleepA(10);
                        animateGraph();
                    }
                }`);
              } else{
                  runCode();
              }
          }, [running])

          useEffect(() => {
              locations.current = props.locations
            animateGraph();
          }, [graph])

          const setLocations = async (newLocations) => {
              await sleepA(speed);
              locations.current = newLocations;
              animateGraph();

          }

        const forceDirected = async () => {
            for(var i=0; i<1000; i++){
                updateLocation()
                await sleepA(1)
                animateGraph();
            }
        }
        
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


        const animateGraph = () => {
            // requestAnimationFrame(() => {
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
            // });
        }

    if(!locations){
        return(<div/>)
    }
    return(
            <canvas ref={canvasRef} style={{width:7*scale, height:7*scale}}/>
    )
}