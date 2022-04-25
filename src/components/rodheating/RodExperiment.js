import React, { useState, useEffect } from 'react';
import Editor from '../Editor';
import Console from '../Console';
import Controls from '../Controls';
import RodEngine from './RodEngine';
import { newRod } from '../../rodUtils';

window.shouldStopCode = false;

export default function RodExperiment(props) {
    const [editorVal, setEditorVal] = useState('');
    // temporary holder for code as it's being written
    const [code, setCode] = useState('');
    // boolean whether experiment has been ran. Reset sets back to false
    const [running, setRunning] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [consoleMessage, setConsoleMessage] = useState("");

    // list state
    const [rod, setRod] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    const [eqRod, setEqRod] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);

    useEffect(() => {
      initializeRod();
    }, [])

    const initializeRod = () => {
      var {r, er} = newRod(100, 0, 100);
      setRod(r);
      setEqRod(er);
  }


    return (
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', paddingTop:50}}>
      <div style={{width: 1200, minHeight:"100vh", borderStyle:"solid", borderColor:"black", borderRadius:"10px", padding:"10px", backgroundColor:"#F8F7D5", fontSize:"1.5rem", fontFamily:"Andale Mono, monospace"}}>
        <h1>rod heating</h1>
        <p>The heat equation is one of the most well-studied partial differential equations (PDE). One of the simplest physical systems that can be analyzed is a one-dimensional rod, which can be solved exactly. Even in situations where the evolution of heat in a system cannot be solved exactly, it can be effectively simulated using local interactions. In this experiment, you are given a <em>discretized</em> one dimensional rod, represented as an array of 100 temperature values with the values at the ends (at index 0 and index 99) held fixed. Your task is to simulate the evolution of temperatures at each point in the rod, until the temperatures approach a steady state. Check out the  <text className="demo-button" style={{padding:"5px 10px"}}>demo</text> which uses the <b>Gauss-Seidel algorithm</b>.</p>
        <h3>Rod API</h3>
        <ul>
          <li><b>rod</b> An array of temperatures.</li>
        </ul>
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <div className="flex-grid" style={{width:1200}}>
        <div style={{borderColor:"black", borderStyle:"solid"}}>
        <Editor setVal={setEditorVal}/>
        <Console message={consoleMessage}/>
        </div>
        <div style={{borderStyle:"solid", borderColor:"black", borderRadius:"10px", padding:"10px", backgroundColor:"#F5F5F5"}}>
        <RodEngine code={editorVal} running={running} setRunning={setRunning} cellSize={30} cells={20}
                speed={1000/speed} setConsoleMessage={setConsoleMessage} consoleMessage={consoleMessage}
                rod={rod} setRod={setRod} eqRod={eqRod}/>
        </div>
      </div>
      <Controls val={editorVal} setCode={setCode} running={running} setRunning={setRunning} speed={speed} changeSpeed={setSpeed} initialize={initializeRod}/>
    </div>
    </div>
    <div style={{paddingTop:50}}/>
    </div>
    );
}