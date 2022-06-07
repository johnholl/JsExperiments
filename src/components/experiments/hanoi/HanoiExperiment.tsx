import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import HanoiEngine from './HanoiEngine';
import { newGame } from './utils';
import EditorConsole from '../../editor/EditorConsole';
import Controls from '../../controls/Controls';
import {setRun} from '../../reducers/runReducers';

import '../styles.css'

window.shouldStopCode = false;
const EXPERIMENT_ID = "hanoi"

export default function HanoiExperiment(props: any) {
    const dispatch = useDispatch();

    const [towers, setTowers] = useState<number[][] | undefined>(undefined);

    useEffect(() => {
      initializeTowers();
      return () => {
        window.shouldStopCode = true;
        setTimeout(() => {window.shouldStopCode = false; dispatch(setRun({id: EXPERIMENT_ID, value: false}))}, 1300);
      }
    }, [])

    const initializeTowers = () => {
      var ts = newGame(10);
      setTowers(ts);
  }

    if(!towers){
        return <div/>
    }

    return (
      <div className="experiment-page">
      <div className="experiment-container">
        <h1>tower of Hanoi</h1>
        <p>The <a href="https://en.wikipedia.org/wiki/Tower_of_Hanoi">Tower of Hanoi</a> is a mathematical puzzle which was introduced to the west by Édouard Lucas in 1883.</p><p> The rules of the game are quite simple: The puzzle begins with disks stacked on one rod in order of decreasing size, the smallest at the top. The objective of the puzzle is to move the entire stack to the last rod, obeying the following rules: </p>
            <ul>
                <li>Only one disk may be moved at a time.</li>
                <li>Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack or on an empty rod.</li>
                <li>No disk may be placed on top of a disk that is smaller than it.</li>
            </ul>

<p> There is an iterative as well as a recursive approach to the problem. Check out the <span className="demo-button" style={{padding:"5px 10px"}}>demo</span> which uses the recursive approach.</p>
        <h3>Tower of Hanoi API</h3>
        <ul>
          <li><b>towers</b> This is an array of three arrays, representing the disks on each tower. Initially, the first tower has the numbers [10, 9, ..., 2, 1], while the other two are empty. When you move a disk, it will be popped from the end of one tower and pushed onto the end of another.</li>
          <li><b>move(i, j)</b> This will move the disk at the top of tower i to the top of tower j. If this move is invalid (tower i has no disks, or the disk at the top of tower i is larger than the current top of tower j), this function will do nothing.</li>
        </ul>
        
    <div className="interface">
      <div className="flex-container">
        <EditorConsole id={EXPERIMENT_ID}/>
        <div className="engine-container">
        <HanoiEngine towers={towers} id={EXPERIMENT_ID}/>
        </div>
      </div>
      <Controls initialize={initializeTowers} id={EXPERIMENT_ID}/>
    </div>
    </div>
    </div>
    );
}