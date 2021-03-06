import React, {useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { processCode } from './utils';
import {update, reset} from '../../reducers/consoleReducers';

export default function MazeEngine(props) {
        const dispatch = useDispatch();
        const code = useSelector((state) => state.code.value[props.id])
        const running = useSelector((state) => state.run.value[props.id])
        const speed = useSelector((state) => 1000/(state.speed.value[props.id] || 1));
        const canvasRef = useRef(null);
        const cs = props.cellSize;
        const h = props.h;
        const w = props.w;
        const start = props.start;
        const end = props.end;
        const env = props.env;
        const setConsoleMessage = (x) => dispatch(update({id: props.id, text: x}))

        const [player, setPlayer] = useState({x: start[0], y: start[1], type: 'player', facing: 0});
        const p = useRef({x: start[0], y: start[1], type: 'player', facing: 0})

        const runCode = (demoCode) => {
            dispatch(reset({id:props.id}));
            if(demoCode){
                eval(processCode(demoCode))
            } else{
                console.log(code);
                eval(processCode(code || ""));
            }
        }

          useEffect(() => {
                p.current = {...p.current, x:start[0], y:start[1]};
                draw();
          }, [env])

          useEffect(() => {
              if(!running){
                  p.current = {x: start[0], y: start[1], type: 'player', facing: 0};
                  setPlayer(p.current);
                  draw();
              } else if(running == "demo"){
                  runCode(`while(!atGoal()){
                    const w = walls();
                    if(!w[3]){
                        turnRight();
                        move();
                    } else if(!w[0]){
                        move();
                    } else {
                        turnLeft();
                    }
                }`);
              } else {
                  runCode();
              }
          }, [running])

        const rightHandRule = async () => {
            while(!atGoal()){
                const w = walls();
                if(!w[3]){
                    await turnRight();
                    await move();
                } else if(!w[0]){
                    await move();
                } else {
                    await turnLeft();
                }
            }
        }

        const move = async () => {
            const pl = p.current
            switch(pl.facing){
                case 1: if(!env[pl.y][pl.x-1]){p.current = {...pl, x: pl.x-1};}; break;
                case 3: if(!env[pl.y][pl.x+1]){p.current = {...pl, x: pl.x+1};}; break;
                case 0: if(!env[pl.y-1][pl.x]){p.current = {...pl, y: pl.y-1};}; break;
                case 2: if(!env[pl.y+1][pl.x]){p.current = {...pl, y: pl.y+1};}; break;     
            }
            await sleepA(speed);
            setPlayer(p.current);
            draw();
        }

          async function sleepA(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        const turnRight = async () => {
            p.current = {...p.current, facing: (p.current.facing + 3)%4}
            await sleepA(speed);
            setPlayer(p.current);
            draw();
        }

        const turnLeft = async () => {
            p.current = {...p.current, facing: (p.current.facing + 1)%4}
            await sleepA(speed);
            setPlayer(p.current);
            draw();
        }

        const atGoal = () => {
            const pl = p.current;
            return pl.x == end[0] && pl.y == end[1];
        }

        const walls = () => {
            const pl = p.current;
            const orientations = [env[pl.y-1][pl.x], env[pl.y][pl.x-1], env[pl.y+1][pl.x], env[pl.y][pl.x+1], env[pl.y-1][pl.x], env[pl.y][pl.x-1], env[pl.y+1][pl.x], env[pl.y][pl.x+1]];
            return orientations.slice(pl.facing, pl.facing+4);
        }

        const draw = () => {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            canvas.width = cs*(w);
            canvas.height = cs*(h);
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            ctx.fillStyle = '#000000';
            for(let i=0; i<env.length; i++){
                for(let j=0; j<env[0].length; j++){
                    if(env[i][j]){
                        ctx.fillRect(cs*(j), cs*(i), cs, cs);
                    }
                }
            }
            ctx.fillStyle = 'yellow';
            ctx.fillRect(cs*(p.current.x), cs*p.current.y, cs, cs);
            ctx.fillStyle = 'red';
            ctx.fillRect(cs*end[0], cs*end[1], cs, cs);
            ctx.fillStyle = 'black'
            switch(p.current.facing){
                case 1: {
                    ctx.beginPath();
                    ctx.moveTo(cs*(p.current.x) + cs/2, cs*p.current.y);
                    ctx.lineTo(cs*(p.current.x)+cs/2, cs*p.current.y+cs);
                    ctx.lineTo(cs*(p.current.x), cs*p.current.y+cs/2);
                    ctx.fill();
                    break;
                }
                case 3: {
                    ctx.beginPath();
                    ctx.moveTo(cs*(p.current.x) + cs/2, cs*p.current.y);
                    ctx.lineTo(cs*(p.current.x)+cs/2, cs*p.current.y+cs);
                    ctx.lineTo(cs*(p.current.x)+cs, cs*p.current.y+cs/2);
                    ctx.fill();
                    break;
                }
                case 0: {
                    ctx.beginPath();
                    ctx.moveTo(cs*(p.current.x), cs*p.current.y+cs/2);
                    ctx.lineTo(cs*(p.current.x)+cs, cs*p.current.y+cs/2);
                    ctx.lineTo(cs*(p.current.x)+cs/2, cs*p.current.y);
                    ctx.fill();
                    break;
                }
                case 2: {
                    ctx.beginPath();
                    ctx.moveTo(cs*(p.current.x), cs*p.current.y+cs/2);
                    ctx.lineTo(cs*(p.current.x)+cs, cs*p.current.y+cs/2);
                    ctx.lineTo(cs*(p.current.x)+cs/2, cs*p.current.y+cs);
                    ctx.fill();
                    break;
                }
                    
            }
        }

    return(
            <canvas ref={canvasRef}/>
    )
}