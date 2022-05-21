import React, { useState, useEffect } from 'react';
import GraphEngine from './GraphEngine';
import { newGraph } from './utils';
import Controls from '../../controls/Controls';

import "../styles.css";
import EditorConsole from '../../editor/EditorConsole';

window.shouldStopCode = false;

export default function GraphExperiment(props) {
    const [editorVal, setEditorVal] = useState('');
    // temporary holder for code as it's being written
    const [code, setCode] = useState('');
    // boolean whether experiment has been ran. Reset sets back to false
    const [running, setRunning] = useState(false);
    // whether experiment succeeded
    const [speed, setSpeed] = useState(1);
    const [consoleMessage, setConsoleMessage] = useState("");

    // graph state
    const [graph, setGraph] = useState(null);
    const [nodes, setNodes] = useState(null);
    const [locations, setLocations] = useState(null);

    useEffect(() => {
      initializeGraph();
    }, [])

    const initializeGraph = () => {
      var {nds, edgeList, locations} = newGraph(20);
      setGraph(edgeList);
      setNodes(nds);
      setLocations(locations);
  }

    if(!nodes || !graph || !locations){
      return <div/>
    }

    return (
      <div className="experiment-page">
      <div className="experiment-container">
        <h1>graph visualization</h1>
        <p>Graphs are powerful modelling tools that can be used to describe all kinds of phenomena including information networks, food webs, weather patterns, and roads.</p><p>Graph visualization in two dimensions is a useful tool for cursory analysis of a graph's structure. In this experiment you will have the ability to move the nodes of a graph around, with the goal of separating the graph and making easy to understand.</p><p> Check out the <span className="demo-button" style={{padding:"5px 10px"}}>demo</span>, which uses a <b>force-directed</b> algorithm.</p>
        <h3>Graph API</h3>
        <ul>
          <li><b>edgeList</b> Any array of length two arrays consisting of the edges of the graph</li>
          <li><b>nodes</b> A list of nodes 0,...,n </li>
          <li><b>locations</b> An array of length two arrays where entry i is the [x, y] coordinates of node i. These correspond to the locations of the black squares shown below (appropriately scaled and centered). Initially all coordinates are randomly selected between 0 and 5.</li>
          <li><b>setLocations(newLocations)</b> A method that changes the locations array to <b>newLocations</b>. This way of updating the locations array will animate the display. If you call <b>setLocations</b> inside a loop, your algorithm will be animated in the display. If you only call it at the end of your location calculating algorithm, the graph will instantly jump to the final node locations.</li>
        </ul>
        <p>Write a method that modifies location that makes the graph look nice :)</p>
    <div className="interface">
      <div className="flex-container">
        <EditorConsole setVal={setEditorVal} message={consoleMessage}/>
        <div className="engine-container">
        <GraphEngine code={editorVal} running={running} speed={1000/speed} setConsoleMessage={setConsoleMessage} consoleMessage={consoleMessage} graph={graph} nodes={nodes} locations={locations}/>
        </div>
      </div>
      <Controls val={editorVal} setCode={setCode} running={running} setRunning={setRunning} speed={speed} changeSpeed={setSpeed} initialize={initializeGraph}/>
    </div>
    </div>
    <div style={{paddingTop:50}}/>
    </div>
    );
}