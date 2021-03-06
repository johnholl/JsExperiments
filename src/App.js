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
import NimExperiment from './components/experiments/nim/NimExperiment';
import HanoiExperiment from './components/experiments/hanoi/HanoiExperiment';
import store from './store';
import { Provider } from 'react-redux';


export default function App() {

    return (
      <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="sorting" element={<ListExperiment/>} />
        <Route path="maze" element={<MazeExperiment/>} />
        <Route path="graph" element={<GraphExperiment/>}/>
        <Route path="colorpuzzle" element={<ColorPuzzleExperiment/>}/>
        <Route path="heatrod" element={<RodExperiment/>}/>
        <Route path="three" element={<ThreePage/>}/>
        <Route path="nim" element={<NimExperiment/>}/>
        <Route path="hanoi" element={<HanoiExperiment/>}/>
      </Routes>
      </BrowserRouter>
      </Provider>
    );
}