import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import ListEngine from './ListEngine';
import { newList } from './utils';
import EditorConsole from '../../editor/EditorConsole';
import Controls from '../../controls/Controls';
import {setRun} from '../../reducers/runReducers';

import '../styles.css'

window.shouldStopCode = false;
const EXPERIMENT_ID = "template"

export default function TemplateExperiment(props) {
    const dispatch = useDispatch();

    // list state
    const [data, setData] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);

    useEffect(() => {
      initializeData();
      return () => {
        window.shouldStopCode = true;
        setTimeout(() => {window.shouldStopCode = false; dispatch(setRun({id: EXPERIMENT_ID, value: false}))}, 1300);
      }
    }, [])

    const initializeData = () => {
      var d = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      setData(d);
  }

    return (
      <div className="experiment-page">
      <div className="experiment-container">
        <h1>Experiment Template</h1>
        <p>This file, along with the TemplateEngine, should get you started towards writing an experiment. This is the place where you would outline a description of the problem.</p><p>You might then include some information like <a href="https://en.wikipedia.org/wiki/Selection_sort">useful links</a> to <a href="https://en.wikipedia.org/wiki/Insertion_sort">other stuff</a>. Hopefully the contents of both files are self-explanatory, and you can look at real examples in other folders for more ideas on structure. I'll point out a couple of specific things.</p>
        <ul>
            <li>You should change the <b>EXPERIMENT_ID</b> to a unique identifier for your experiment. This allows the program and console data from your experiment to have a unique place inside the redux store.</li>
            <li>Depending on your experiment, you may need to initialize different kinds of data e.g. a 2D array for a maze, an edge list for a graph, or some other data structure. And, this data might need to be stored in multiple variables. You should create state variables for these, and write an initialize function that contains the logic for creating data for a new experiment</li>
            <li>That data should be passed to the engine</li>
            <li>The JSX for the EditorConsole and Controls shouldn't need to be changed</li>
            <li>Inside the engine you should set your data to refs. You will see that in TemplateEngine, or any other already written experiment.</li>
            <li>In addition, the engine should contain all of the methods available to the user and described in the API</li>
            <li>You should also write a utils file that contains a method for processing user code. This will wrap the code in an async call, prepend awaits to API calls, and change variable names. See the utils file for an example.</li>
        </ul>
        <p>Finally, you can say something about the algorithm that your <span className="demo-button" style={{padding:"5px 10px"}}>demo</span>  uses. Happy hacking!</p>
        <h3>Template API</h3>
        <ul>
          <li><b>variable1</b> Some data you make available to the user</li>
          <li><b>method1(x, y)</b> A method you write into the engine</li>
        </ul>
        <p>Some last bits of information could go after the API.</p>
        
    <div className="interface">
      <div className="flex-container">
        <EditorConsole id={EXPERIMENT_ID}/>
        <div className="engine-container">
        <ListEngine data={data} id={EXPERIMENT_ID}/>
        </div>
      </div>
      <Controls initialize={initializeData} id={EXPERIMENT_ID}/>
    </div>
    </div>
    </div>
    );
}