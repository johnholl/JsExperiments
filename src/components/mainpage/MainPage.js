import React from 'react';
import PageListing from './PageListing';
import './styles.css';

export default function MainPage() {
    return (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
            <div className="listing-container">
                <h2>experimentJS</h2>
                <h3>Javascript sandbox with visual feedback.</h3>
                <p>See the source code on <a href="https://github.com/johnholl/JsExperiments">github</a>.</p>
                <div className="flex-container">
                    <PageListing title="sort list" location="/sorting" img="static_sorting.png" anim="sorting.gif" />
                    <PageListing title="navigate maze" location="/maze" img="maze_static.png" anim="maze.gif"/>
                    <PageListing title="move graph" location="/graph" img="graph_static.png" anim="graph.gif"/>
                    <PageListing title="match tiles" location="/colorpuzzle" img="colorpuzzle_static.png" anim="colorpuzzle.gif"/>
                    <PageListing title="simulate heat" location="/heatrod" img="rod.png" anim="rod.gif"/>
                </div>
            </div>
        </div>
    );
}