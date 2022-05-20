import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css';
import ListExperiment from './components/experiments/sorting/ListExperiment';
import MazeExperiment from './components/experiments/maze/MazeExperiment';
import MainPage from './components/mainpage/MainPage'
import GraphExperiment from './components/experiments/graph/GraphExperiment';
import ColorPuzzleExperiment from './components/experiments/colorpuzzle/ColorPuzzleExperiment';
import RodExperiment from './components/experiments/rodheating/RodExperiment';
import ThreePage from './components/experiments/three/ThreePage';

export default function App() {

    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="sorting" element={<ListExperiment/>} />
        <Route path="maze" element={<MazeExperiment/>} />
        <Route path="graph" element={<GraphExperiment/>}/>
        <Route path="colorpuzzle" element={<ColorPuzzleExperiment/>}/>
        <Route path="heatrod" element={<RodExperiment/>}/>
        <Route path="three" element={<ThreePage/>}/>
      </Routes>
    </BrowserRouter>
    );
}