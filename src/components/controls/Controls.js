import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Slider } from 'antd';
import { setRun } from '../reducers/runReducers'
import { setSpeed } from '../reducers/speedReducers';
import "./styles.css";

export default function Controls(props) {
    const running = useSelector((state) => state.run.value[props.id]);
    const speed = useSelector((state) => state.speed.value[props.id] || 1);
    const dispatch = useDispatch();

    const [buffering, setBuffering] = useState(false);

    const runCode = () => {
        dispatch(setRun({id: props.id, value: true}));
      }

      const stopCode = () => {
        window.shouldStopCode = true;
        setBuffering(true);
        setTimeout(() => {window.shouldStopCode = false; dispatch(setRun({id: props.id, value: false})); setBuffering(false);}, 1300);
      };

    const startDemo = () => {
        dispatch(setRun({id: props.id, value: "demo"}));
    }

    const resetGraph = () => {
        props.initialize();
        dispatch(setRun({id: props.id, value: false}));
    }

    return(
        <div className="flex-container" style={{marginTop:20, width:"100%", backgroundColor:"steelblue", borderRadius:"8px", justifyContent:"space-around"}}>
            <button className="play button" disabled={running} onClick={runCode}>Run</button>
            <button className="demo button" disabled={running} onClick={startDemo}>demo</button>
            <button className="new button" disabled={running} onClick={resetGraph}>new</button>
            <button className="kill button" disabled={!running || buffering} onClick={stopCode}>reset</button>
            <div style={{width:200}}>
                <span style={{color:"white", fontWeight:700, fontSize:"14px"}}>actions per second</span>
                <Slider
                handleStyle={{backgroundColor:"white"}}
                trackStyle={{backgroundColor:"white"}}
                disabled={running}
                min={1}
                max={20}
                onChange={v => dispatch(setSpeed({id: props.id, value: v}))}
                value={speed}/>
            </div>
        </div>
    )
}
