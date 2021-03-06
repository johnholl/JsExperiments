import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import ListEngine from './ListEngine';
import { newList } from './utils';
import EditorConsole from '../../editor/EditorConsole';
import Controls from '../../controls/Controls';
import {setRun} from '../../reducers/runReducers';

import '../styles.css'

window.shouldStopCode = false;
const EXPERIMENT_ID = "sort"

export default function ListExperiment(props) {
    const dispatch = useDispatch();

    // list state
    const [list, setList] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    const [sortedList, setSortedList] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);

    useEffect(() => {
      initializeList();
      return () => {
        window.shouldStopCode = true;
        setTimeout(() => {window.shouldStopCode = false; dispatch(setRun({id: EXPERIMENT_ID, value: false}))}, 1300);
      }
    }, [])

    const initializeList = () => {
      var {list, sortedList} = newList(20);
      setList(list);
      setSortedList(sortedList);
  }

    return (
      <div className="experiment-page">
      <div className="experiment-container">
        <h1>list sorting</h1>
        <p>Sorting is a fundamental building block of many algorithms. It is an easy problem to state: given an unsorted list of numbers, rearrange them to be in increasing order. Despite this simple formulation there are many ways of solving this problem, and choosing which one to use can be subtle.</p><p> In this experiment you are given an array called <b>arr</b> containing 20 elements. Write an algorithm that sorts arr. This should be done <em>in place</em>, meaning your code should modify values in arr rather than create a new array with sorted values.</p><p>Consider reading about and attempting the following algorithms: <a href="https://en.wikipedia.org/wiki/Selection_sort">Selection sort</a>, <a href="https://en.wikipedia.org/wiki/Insertion_sort">Insertion sort</a>, <a href="https://en.wikipedia.org/wiki/Merge_sort">Merge sort</a>, and <a href="https://en.wikipedia.org/wiki/Quicksort">Quicksort</a>. Check out the <span className="demo-button" style={{padding:"5px 10px"}}>demo</span> which uses <b>Selection sort</b>.</p>
        <h3>Sorting API</h3>
        <ul>
          <li><b>arr</b> The array to sort. It consists of 20 elements with values between 0 and 100.</li>
          <li><b>swap(i, j)</b> This will swap the ith and jth elements in arr. <em style={{color:"red"}}>Do not call it on arr ie <b>arr.swap(1,3).</b></em></li>
        </ul>
        <p>When swap is called, the two swapping values will turn dark gray. As values are placed in their correct order, they will form the colors of the <span className="rainbow-text">rainbow</span>.</p>
        
    <div className="interface">
      <div className="flex-container">
        <EditorConsole id={EXPERIMENT_ID}/>
        <div className="engine-container">
        <ListEngine cellSize={14} cells={20} list={list} setList={setList} sortedList={sortedList} id={EXPERIMENT_ID}/>
        </div>
      </div>
      <Controls initialize={initializeList} id={EXPERIMENT_ID}/>
    </div>
    </div>
    </div>
    );
}