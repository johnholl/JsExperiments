import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import MazeEngine from './MazeEngine';
import { newMaze, startingMaze } from './utils';
import Controls from '../../controls/Controls';

import "../styles.css";
import EditorConsole from '../../editor/EditorConsole';
import {setRun} from '../../reducers/runReducers';


window.shouldStopCode = false;
const EXPERIMENT_ID = "maze"

export default function MazeExperiment(props) {
    const dispatch = useDispatch();

    // maze state
    const [env, setEnv] = useState(startingMaze)
    const [startingPos, setStartingPos] = useState([1, 5]);
    const [endingPos, setEndingPos] = useState([5,1]);

    useEffect(()=>{
      initializeMaze();
      return () => {
        window.shouldStopCode = true;
        setTimeout(() => {window.shouldStopCode = false; dispatch(setRun({id: EXPERIMENT_ID, value: false}))}, 1300);
      }
    }, [])

    const initializeMaze = () => {
      const {ans, start, end} = newMaze(10, 10);
      setEnv(ans);
      setStartingPos(start);
      setEndingPos(end);
  }


    return (
      <div className="experiment-page">
        <div className="experiment-container">
          <h1>maze navigation</h1>
          <p>The term <i>maze</i> dates to the 13th century, and the concept is thousands of years old. There are a variety of techniques for navigating mazes. Try to write your own in the experiment below. Check out the <span className="demo-button" style={{padding:"5px 10px"}}>demo</span>, which uses <a href="https://en.wikipedia.org/wiki/Maze-solving_algorithm#Wall_follower">wall following</a>.</p>
          <h3>Agent API</h3>
          <ul>
            <li><b>move()</b> will move the <b style={{backgroundColor:"black", color:"yellow", fontWeight:700}}>agent</b> forward one space if it is not blocked by a wall.</li>
            <li><b>turnLeft()</b> will turn the agent 90 degrees counterclockwise</li>
            <li><b>turnRight()</b> will turn the agent 90 degrees clockwise</li>
            <li><b>walls()</b> returns a length 4 array of 1's and 0's indicating the location of walls around the agent. The order is forward, left, behind, and right. So, for example, if walls() returns [1, 0, 0, 1], this indicates there is a wall in front and to the right of the agent.  </li>
            <li><b>atGoal()</b> returns true if the agent is at the <b style={{color:"red", fontWeight:700}}>goal position</b> and false otherwise.</li>
          </ul>

        <div className="interface">
      <div className="flex-container">
        <EditorConsole id={EXPERIMENT_ID}/>
        <div className="engine-container">
        <MazeEngine env={env} cellSize={14} w={21} h={21} start={startingPos} end={endingPos} id={EXPERIMENT_ID}/>
          </div>
          </div>
          <Controls initialize={initializeMaze} id={EXPERIMENT_ID}/>
        </div>
        </div>
]      </div>

    );
}