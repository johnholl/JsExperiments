import React from 'react';
import PageListing from './PageListing';
import './styles.css';

export default function MainPage() {
    return (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
            <div className="listing-container">
                <h2>experimentJS</h2>
                <p>Learn new algorithms through visual programming.</p>
                <ul className="nav" style={{listStyleType:"none"}}>
                    <PageListing title="list sorting" location="/sorting" img="static_sorting.png" anim="sorting.gif"/>
                    <PageListing title="maze navigation" location="/maze" img="maze_static.png" anim="maze.gif"/>
                    <PageListing title="graph moving" location="/graph" img="graph_static.png" anim="graph.gif"/>
                    <PageListing title="match tiles" location="/colorpuzzle" img="colorpuzzle_static.png" anim="colorpuzzle.gif"/>
                    <PageListing title="heat simulation" location="/heatrod" img="rod.png" anim="rod.gif"/>
                </ul>

            </div>
        </div>
    );
}