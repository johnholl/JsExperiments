import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import Controls from '../../controls/Controls';
import RodEngine from './RodEngine';
import { newRod } from './utils';

import "../styles.css";
import EditorConsole from '../../editor/EditorConsole';
import {setRun} from '../../reducers/runReducers';


window.shouldStopCode = false;
const EXPERIMENT_ID = "rodheat";

export default function RodExperiment(props) {
    const dispatch = useDispatch();

    // list state
    const [rod, setRod] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    const [eqRod, setEqRod] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);

    useEffect(() => {
      initializeRod();
      return () => {
        window.shouldStopCode = true;
        setTimeout(() => {window.shouldStopCode = false; dispatch(setRun({id: EXPERIMENT_ID, value: false}))}, 1300);
      }
    }, [])

    const initializeRod = () => {
      var {r, er} = newRod(100, 0, 100);
      setRod(r);
      setEqRod(er);
  }


    return (
      <div className="experiment-page">
      <div className="experiment-container">
        <h1>rod heating</h1>
        <p>The <a href="https://en.wikipedia.org/wiki/Heat_equation">Heat equation</a> is a well-studied partial differential equation (PDE). One simple physical system whose heat equation can be readily solved is that of a one-dimensional rod.</p><p>Even in situations where the evolution of heat in a system cannot be solved exactly, it can be effectively simulated using local interactions. In this experiment, you are given a <em>discretized</em> one dimensional rod, represented as an array of 100 temperature values with the values at the ends (at index 0 and index 99) held fixed.</p><p> Your task is to simulate the evolution of temperatures at each point in the rod, until the temperatures approach a steady state. Check out the  <span className="demo-button" style={{padding:"5px 10px"}}>demo</span> which uses a simple version of the <a href="https://en.wikipedia.org/wiki/Gauss%E2%80%93Seidel_method">Gauss-Seidel Method</a>.</p>
        <h3>Rod API</h3>
        <ul>
          <li><b>rod</b> An array of temperatures.</li>
          <li><b>animate()</b> Call this method to update the display after making changes to <b>rod</b>.</li>
        </ul>

    <div className="interface">
      <div className="flex-container">
        <EditorConsole id={EXPERIMENT_ID}/>
        <div className="engine-container">
        <RodEngine cellSize={30} cells={20} rod={rod} setRod={setRod} eqRod={eqRod} id={EXPERIMENT_ID}/>
        </div>
      </div>
      <Controls initialize={initializeRod} id={EXPERIMENT_ID}/>
    </div>
    </div>
    </div>
    );
}