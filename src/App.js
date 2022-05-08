import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css';
import ListExperiment from './components/sorting/ListExperiment';
import MazeExperiment from './components/maze/MazeExperiment';
import MainPage from './components/MainPage'
import GraphExperiment from './components/graph/GraphExperiment';
import ColorPuzzleExperiment from './components/colorpuzzle/ColorPuzzleExperiment';
import RodExperiment from './components/rodheating/RodExperiment';
import ThreePage from './components/ThreePage';

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