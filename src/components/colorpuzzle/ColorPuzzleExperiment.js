import React, { useState, useEffect } from 'react';
import Editor from '../Editor';
import ColorPuzzleEngine from './ColorPuzzleEngine';
import Console from '../Console';
import { getScore, newPuzzle } from '../../colorPuzzleUtils';
import Controls from '../Controls';

window.shouldStopCode = false;

export default function ColorPuzzleExperiment(props) {
    const [editorVal, setEditorVal] = useState('');
    const [code, setCode] = useState('');
    const [running, setRunning] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [consoleMessage, setConsoleMessage] = useState("");

    const [env, setEnv] = useState(null)
    const [score, setScore] = useState(null);
    const [maxScore, setMaxScore] = useState(null);


    useEffect(()=>{
      initializePuzzle();
    }, [])

    const initializePuzzle = () => {
      const {board, score, maxScore} = newPuzzle(10, 8);
      setEnv(board);
      setScore(score);
      setMaxScore(maxScore);
  }

    if(!env || !score || !maxScore){ return(<div/>) }

    return (
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', paddingTop:50}}>
        <div style={{width: 1200, minHeight:"100vh", borderStyle:"solid", borderColor:"black", borderRadius:"10px", padding:"10px", backgroundColor:"#F8F7D5", fontSize:"1.5rem", fontFamily:"Andale Mono, monospace"}}>
          <h1>a combinatorial puzzle</h1>
          <p>The puzzle below shows a 10x10 grid of square tiles. Each of the four edges of each tile are colored either red, yellow, green, or blue. The goal is to rearrange (by swapping, but not rotating) the tiles in such a way that as many adjacent edges have the same color as possible. Currently the board has a score of {score} (try counting them to see if you get it). You can interact with the puzzle using the following API. Check out the <text className="demo-button" style={{padding:"5px 10px"}}>demo</text>, which uses <b>simulated annealing</b> to obtain an approximate solution.</p>
          <h3>Puzzle API</h3>
          <ul>
            <li><b>swap(i, j, k, l)</b> swap the tile in position (i, j) with the one in position (k, l).</li>
            <li><b>getColors(i, j)</b> returns an array of four colors representing the top, left, bottom, and right colors of the tile in position (i, j).</li>
          </ul>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <div className="flex-grid" style={{width:1200}}>
        <div>
        <Editor setVal={setEditorVal}/>
        <Console message={consoleMessage}/>
        </div>
        <div style={{backgroundColor:"white"}}>
        <ColorPuzzleEngine code={editorVal} running={running} setRunning={setRunning} env={env} cellSize={56} w={10} h={10} 
                speed={1000/speed} setConsoleMessage={setConsoleMessage} consoleMessage={consoleMessage} score={score} maxScore={maxScore}/>
          </div>
          </div>
          <Controls val={editorVal} setCode={setCode} running={running} setRunning={setRunning} speed={speed} changeSpeed={setSpeed} initialize={initializePuzzle}/>
        </div>
        </div>
        <div style={{paddingTop:50}}/>
      </div>

    );
}