import React, {useState} from 'react';
import { Slider } from 'antd';

export default function Controls(props) {
    const setRunning = props.setRunning;
    const running = props.running;
    const [buffering, setBuffering] = useState(false);

    const runCode = () => {
        setRunning(true);
      }

      const stopCode = () => {
        window.shouldStopCode = true;
        setBuffering(true);
        setTimeout(() => {window.shouldStopCode = false; setRunning(false); setBuffering(false);}, 1100);
      };

    const startDemo = () => {
        setRunning("demo");
    }

    const resetGraph = () => {
        props.initialize();
        setRunning(false);
    }

    return(
        <div className="flex-grid" style={{marginTop:20, padding:10, width:800, backgroundColor:"lightsteelblue", borderRadius:"8px"}}>
            <button className="play-button" disabled={running} onClick={runCode}>Run</button>
            <button className="demo-button" disabled={running} onClick={startDemo}>demo</button>
            <button className="new-button" disabled={running} onClick={resetGraph}>new experiment</button>
            <button className="kill-button" disabled={!running || buffering} onClick={stopCode}>reset</button>
            <div style={{width:200}}>
                <text style={{color:"white", fontWeight:700, fontSize:"14px"}}>actions per second</text>
                <Slider
                disabled={running}
                min={1}
                max={20}
                onChange={props.changeSpeed}
                value={typeof props.speed === 'number' ? props.speed : 0}/>
            </div>
        </div>
    )
}
