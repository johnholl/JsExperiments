import React, { useState, useEffect } from 'react';
import ColorPuzzleEngine from './ColorPuzzleEngine';
import { getScore, newPuzzle } from './utils';
import Controls from '../../controls/Controls';

import "../styles.css";
import EditorConsole from '../../editor/EditorConsole';

window.shouldStopCode = false;
const EXPERIMENT_ID = "colorpuzzle";

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
      <div className="experiment-page">
        <div className="experiment-container">
          <h1>a combinatorial puzzle</h1>
          <p>The puzzle below shows a 8x10 grid of square tiles. Each of the four edges of each tile are colored either red, yellow, green, or blue.</p><p>The goal is to rearrange (by swapping, but not rotating) the tiles in such a way that as many adjacent edges have the same color as possible.</p><p>Currently the board has a score of {score} (try counting them to see if you get it). Check out the <span className="demo-button" style={{padding:"5px 10px"}}>demo</span>, which uses <a href="https://en.wikipedia.org/wiki/Simulated_annealing#:~:text=Simulated%20annealing%20(SA)%20is%20a,space%20for%20an%20optimization%20problem.">simulated annealing</a> to obtain an approximate solution.</p><p>You can interact with the puzzle using the following API.</p>
          <h3>Puzzle API</h3>
          <ul>
            <li><b>swap(i, j, k, l)</b> swap the tile in position (i, j) with the one in position (k, l).</li>
            <li><b>getColors(i, j)</b> returns an array of four colors representing the top, left, bottom, and right colors of the tile in position (i, j).</li>
          </ul>

        <div className="interface">
      <div className="flex-container">
        <EditorConsole setVal={setEditorVal} message={consoleMessage} id={EXPERIMENT_ID}/>
        <div className="engine-container" style={{backgroundColor:"white"}}>
        <ColorPuzzleEngine code={editorVal} running={running} setRunning={setRunning} env={env} cellSize={32} w={10} h={10} 
                speed={1000/speed} setConsoleMessage={setConsoleMessage} consoleMessage={consoleMessage} score={score} maxScore={maxScore} id={EXPERIMENT_ID}/>
          </div>
          </div>
          <Controls speed={speed} changeSpeed={setSpeed} initialize={initializePuzzle} id={EXPERIMENT_ID}/>
        </div>
        </div>
      </div>

    );
}