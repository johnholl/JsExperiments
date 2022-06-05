import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import NimEngine from './NimEngine';
import { newPiles } from './utils';
import EditorConsole from '../../editor/EditorConsole';
import Controls from '../../controls/Controls';
import {setRun} from '../../reducers/runReducers';

import '../styles.css'

window.shouldStopCode = false;
const EXPERIMENT_ID = "nim"

// num piles between 3 and 10
// num objects in each pile between 1 and 8

export default function NimExperiment(props) {
    const dispatch = useDispatch();

    // list state
    const [piles, setPiles] = useState(null);

    useEffect(() => {
      initializePiles();
      return () => {
        window.shouldStopCode = true;
        setTimeout(() => {window.shouldStopCode = false; dispatch(setRun({id: EXPERIMENT_ID, value: false}))}, 1300);
      }
    }, [])

    const initializePiles = () => {
      const numPiles = Math.floor(Math.random()*8 + 3)
      var p = newPiles(numPiles);
      console.log(p);
      setPiles(p);
  }

    if(!piles){
        return <div/>
    }

    return (
      <div className="experiment-page">
      <div className="experiment-container">
        <h1>the game of nim</h1>
        <p>Nim is a type of two player game where players take turns removing objects from piles. On each turn a player must remove at least one object, and may remove as many objects as they like so long as the objects all come from the same pile. The goal of the game is to take the last object.</p><p> Nim is a <em>solved game</em>, meaning that there is an optimal strategy that can guarantee victory for player one or player two depending on the starting configuration. In this experiment, you will play as player 1, and will play rounds of Nim in which optimal play will lead to a player 1 victory. Your task is to write a bot that plays optimally. </p> <p> Your bot will be playing against a second bot that plays optimally. So, if your bot makes any strategic mistakes, it will lose the game.</p><p>You can read more about Nim <a href="https://en.wikipedia.org/wiki/Nim">here</a>. You can also check out the <span className="demo-button" style={{padding:"5px 10px"}}>demo</span> where an optimal bot plays against itself.</p>
        <h3>Nim API</h3>
        <ul>
          <li><b>take(i, j)</b> removes <em>j</em> objects from the <em>ith</em> pile.</li>
          <li><b>piles</b> a read-only array representing the number of objects in each pile. <em>piles</em> cannot be directly modified from your program.</li>
        </ul>
        <p>When take is called, the objects to be taken will light up in green (for player one) or red (for player two) briefly, before being removed from the display. When the game ends, the window will display the winner.</p>
        
    <div className="interface">
      <div className="flex-container">
        <EditorConsole id={EXPERIMENT_ID}/>
        <div className="engine-container">
        <NimEngine cellSize={14} cells={20} piles={piles} setPiles={setPiles} id={EXPERIMENT_ID}/>
        </div>
      </div>
      <Controls initialize={initializePiles} id={EXPERIMENT_ID}/>
    </div>
    </div>
    </div>
    );
}