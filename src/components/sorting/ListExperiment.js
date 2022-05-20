import React, { useState, useEffect } from 'react';
import Editor from '../Editor';
import ListEngine from './ListEngine';
import Console from '../Console';
import { newList } from '../../utils';
import Controls from '../Controls';

window.shouldStopCode = false;

export default function ListExperiment(props) {
    const [editorVal, setEditorVal] = useState('');
    // temporary holder for code as it's being written
    const [code, setCode] = useState('');
    // boolean whether experiment has been ran. Reset sets back to false
    const [running, setRunning] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [consoleMessage, setConsoleMessage] = useState("");

    // list state
    const [list, setList] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    const [sortedList, setSortedList] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);

    useEffect(() => {
      initializeList();
    }, [])

    const initializeList = () => {
      var {list, sortedList} = newList(20);
      setList(list);
      setSortedList(sortedList);
  }


    return (
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', paddingTop:50}}>
      <div style={{width: 1200, minHeight:"100vh", borderStyle:"solid", borderColor:"black", borderRadius:"10px", padding:"10px", backgroundColor:"#F8F7D5", fontSize:"1.5rem", fontFamily:"Andale Mono, monospace"}}>
        <h1>list sorting</h1>
        <p>Sorting is a fundamental building block of many algorithms. It is an easy problem to state: given an unsorted list of numbers, rearrange them to be in increasing order. Despite this simple formulation there are many ways of solving this problem, and choosing which one to use can be subtle. In this experiment you are given an array called <b>arr</b> containing 20 elements. Write an algorithm that sorts arr. This should be done <em>in place</em>, meaning your code should modify values in arr rather than create a new array with sorted values. Consider reading about and attempting the following algorithms: selection sort, insertion sort, merge sort, and quick sort. Check out the <span className="demo-button" style={{padding:"5px 10px"}}>demo</span> which uses <b>selection sort</b>.</p>
        <h3>Sorting API</h3>
        <ul>
          <li><b>arr</b> The array to sort. It consists of 20 elements with values between 0 and 100.</li>
          <li><b>swap(i, j)</b> This will swap the ith and jth elements in arr. Note that you call this function directly e.g. <em>swap(1,3)</em>. You <em style={{color:"red"}}>should not call it on arr ie <b>arr.swap(1,3).</b></em></li>
        </ul>
        <p>When swap is called, the two swapping values will turn dark gray. As values are placed in their correct order, they will form the colors of the <span className="rainbow-text">rainbow</span>.</p>
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <div className="flex-grid" style={{width:1200}}>
        <div style={{borderColor:"black", borderStyle:"solid"}}>
        <Editor setVal={setEditorVal}/>
        <Console message={consoleMessage}/>
        </div>
        <div style={{borderStyle:"solid", borderColor:"black", borderRadius:"10px", padding:"10px", backgroundColor:"#F5F5F5"}}>
        <ListEngine code={editorVal} running={running} setRunning={setRunning} cellSize={30} cells={20}
                speed={1000/speed} setConsoleMessage={setConsoleMessage} consoleMessage={consoleMessage}
                list={list} setList={setList} sortedList={sortedList}/>
        </div>
      </div>
      <Controls val={editorVal} setCode={setCode} running={running} setRunning={setRunning} speed={speed} changeSpeed={setSpeed} initialize={initializeList}/>
    </div>
    </div>
    <div style={{paddingTop:50}}/>
    </div>
    );
}