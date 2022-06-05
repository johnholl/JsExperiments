import React, {useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { processCode, nimSum, nimScore } from './utils';
import { update, reset } from '../../reducers/consoleReducers';

async function sleepA(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function NimEngine(props) {
        const dispatch = useDispatch();
        const code = useSelector((state) => state.code.value[props.id])
        const running = useSelector((state) => state.run.value[props.id])
        const speed = useSelector((state) => 1000/(state.speed.value[props.id] || 1));
        const canvasRef = useRef(null);
        const cs = props.cellSize;
        const cells = props.cells;
        const pref = useRef([...props.piles]);
        const turn = useRef(true);
        const setConsoleMessage = (newMessage) => dispatch(update({id: props.id, text: newMessage}))

        const runCode = (demoCode) => {
            dispatch(reset({id: props.id}))
            if(demoCode){
                eval(processCode(demoCode));
            } else{
                eval(processCode(code || ""));
            }
        }

          useEffect(() => {
              if(!running){
                  pref.current = [...props.piles];
                  animate();
              } else if(running == "demo"){
                runCode(`await fullBotPlay();`)
              } else{
                  runCode();
              }
          }, [running])

          useEffect(() => {
            pref.current = [...props.piles];
            animate();
          }, [props.piles])

        const take = async (i, j) => {
            animate(i, j);
            await sleepA(speed);
            pref.current[i] -= j;
            animate();
            turn.current = !turn.current;
            await botPlay();
        }

        const takeNoBotPlay = async (i, j) => {
            animate(i, j);
            await sleepA(speed);
            pref.current[i] -= j;
            animate();
            turn.current = !turn.current;
        }

        const botPlay = async () => {
            const ns = nimScore(pref.current);
            for(var i=0; i<pref.current.length; i++){
                const pileSum = nimSum(ns, pref.current[i]);
                console.log(pileSum);
                if(pileSum < pref.current[i]){
                    await takeNoBotPlay(i, pref.current[i] - pileSum);
                    return;
                }
            }

            for(var i=0; i<pref.current.length; i++){
                if(pref.current[i] > 0){
                    await takeNoBotPlay(i, 1);
                    return;
                }
            }
        }

        const fullBotPlay = async () => {
            if (window.shouldStopCode) { throw new Error('CODE STOPPED')}
            const ns = nimScore(pref.current);
            console.log("NIMSCORE:", ns);
            for(var i=0; i<pref.current.length; i++){
                const pileSum = nimSum(ns, pref.current[i]);
                console.log("PILESUM:", pileSum);
                console.log(pileSum);
                if(pileSum < pref.current[i]){
                    await takeFullBotPlay(i, pref.current[i] - pileSum);
                    return;
                }
            }

            for(var i=0; i<pref.current.length; i++){
                if(pref.current[i] > 0){
                    await takeFullBotPlay(i, 1);
                    return;
                }
            }
        }

        const takeFullBotPlay = async (i, j) => {
            if (window.shouldStopCode) { throw new Error('CODE STOPPED')}
            animate(i, j);
            await sleepA(speed);
            pref.current[i] -= j;
            animate();
            turn.current = !turn.current;
            await fullBotPlay();
        }

        const animate = (p1=-1, p2=-1) => {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            canvas.width = 1000;
            canvas.height = 1000;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            const m = pref.current.length;
            for(let i=0; i<pref.current.length; i++){
                const n = pref.current[i]
                for(let j=0; j<pref.current[i]; j++){
                    if(i==p1 && j >= (pref.current[i]-p2)){
                        if(turn.current){
                            ctx.fillStyle = 'red';
                        } else {
                            ctx.fillStyle = 'green';
                        }
                    } else{
                        ctx.fillStyle = 'black';
                    }
                    ctx.fillRect((130) * j, (1000/m)*i, 50, 50);
                }
            }
        }

    return(
            <canvas ref={canvasRef}/>
    )
}