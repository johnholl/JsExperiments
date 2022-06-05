import React, {useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Slider } from 'antd';
import { processCode, getScore } from './utils';
import {update, reset} from '../../reducers/consoleReducers';

async function sleepA(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

export default function ColorPuzzleEngine(props) {
        const dispatch = useDispatch();
        const code = useSelector((state) => state.code.value[props.id])
        const running = useSelector((state) => state.run.value[props.id])
        const speed = useSelector((state) => 1000/(state.speed.value[props.id] || 1));
        const canvasRef = useRef(null);
        const cs = props.cellSize;
        const h = props.h;
        const w = props.w;
        const start = props.start;
        const env = useRef(props.env.map(function(arr) { return arr.slice();}));
        const prob = useRef(0.1);
        const score = useRef(props.score);
        const setConsoleMessage = (x) => dispatch(update({id: props.id, text: x}))

        const runCode = (demoCode) => {
            dispatch(reset({id:props.id}));
            if(demoCode){
                eval(processCode(demoCode))
            } else{
                eval(processCode(code || ""));
            }
        }

          useEffect(() => {
            env.current = props.env;
                draw();
          }, [props.env])

          useEffect(() => {
              async function switchRun() {
              if(!running){
                env.current = props.env.map(function(arr) { return arr.slice();});;
                draw();
              } else if(running == "demo"){
                  runCode(`await simulatedAnnealing()`);
              } else {
                  runCode();
              }
            };
            switchRun();
          }, [running])

        const simulatedAnnealing = async () => {
            let step = 0;
            while(prob.current > 0){
                if (window.shouldStopCode) { throw new Error('CODE STOPPED')}
                const i1 = Math.floor(Math.random()*10);
                const j1 = Math.floor(Math.random()*8);
                const i2 = Math.floor(Math.random()*10);
                const j2 = Math.floor(Math.random()*8);
                const points = getPoints(i1, j1) + getPoints(i2, j2);
                await swap(i1, j1, i2, j2);
                const newPoints = getPoints(i1, j1) + getPoints(i2, j2);
                const coin = Math.random();
                if(newPoints < points){
                    if(coin > prob.current){
                        swap(i1, j1, i2, j2);
                    } else{
                        score.current = score.current + newPoints - points;
                    }
                } else{
                    score.current = score.current + newPoints - points;
                }
                if(step%10 == 0){
                    await sleepA(10);
                    draw();
                }
                step++;
                prob.current -= 0.00001;
            }
        }

        const swap = async (i,j,k,l) => {
            const temp = env.current[i][j];
            env.current[i][j] = env.current[k][l];
            env.current[k][l] = temp;
            draw();
        }

        const getColors = (i, j) => {
            const tile = env.current[i][j];
            return [tile.top, tile.left, tile.bottom, tile.right];
        }

        const getPoints = (i, j) => {
            let points = 0
            const cTile = env.current[i][j];
            if(i>0 && cTile.left == env.current[i-1][j].right){
                points++;
            }
            if(i<env.current.length-1 && cTile.right == env.current[i+1][j].left){
                points++;
            }
            if(j>0 && cTile.top == env.current[i][j-1].bottom){
                points++;
            }
            if(j<env.current[0].length-1 && cTile.bottom == env.current[i][j+1].top){
                points++;
            }
            return points;
        }

        const draw = () => {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d');
            canvas.width = cs*(w);
            canvas.height = cs*(h);
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = '#000000';

            ctx.font = "bold 16px Arial";
            ctx.fillText("initial", cs, cs*9);
            ctx.fillText("current", cs*4, cs*9);
            ctx.fillText("theoretical", cs*7, cs*9);

            ctx.fillText(props.score, cs, cs*9.5);
            ctx.fillText(getScore(env.current), cs*4, cs*9.5);
            ctx.fillText(props.maxScore, cs*7, cs*9.5);

            for(let i=0; i<env.current.length; i++){
                for(let j=0; j<env.current[0].length; j++){
                    ctx.fillStyle = env.current[i][j].top;
                    ctx.beginPath();
                    ctx.moveTo(cs*i, cs*j);
                    ctx.lineTo(cs*i+cs, cs*j);
                    ctx.lineTo(cs*i+cs/2, cs*j+cs/2);
                    ctx.fill();

                    ctx.fillStyle = env.current[i][j].left;
                    ctx.beginPath();
                    ctx.moveTo(cs*i, cs*j);
                    ctx.lineTo(cs*i, cs*j+cs);
                    ctx.lineTo(cs*i+cs/2, cs*j+cs/2);
                    ctx.fill();

                    ctx.fillStyle = env.current[i][j].bottom;
                    ctx.beginPath();
                    ctx.moveTo(cs*i, cs*j+cs);
                    ctx.lineTo(cs*i+cs, cs*j+cs);
                    ctx.lineTo(cs*i+cs/2, cs*j+cs/2);
                    ctx.fill();

                    ctx.fillStyle = env.current[i][j].right;
                    ctx.beginPath();
                    ctx.moveTo(cs*i+cs, cs*j);
                    ctx.lineTo(cs*i+cs, cs*j+cs);
                    ctx.lineTo(cs*i+cs/2, cs*j+cs/2);
                    ctx.fill();

                }
            }
        }

    return(
            <canvas ref={canvasRef}/>
    )
}