import React from 'react';
import PageListing from './PageListing';
import {Link} from "react-router-dom";


export default function MainPage() {

    return (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', paddingTop:50}}>
            <div style={{width: 1200, minHeight:"100vh", borderStyle:"solid", borderColor:"black", borderRadius:"10px", padding:"10px", backgroundColor:"#CBD7E9", fontSize:"1.5rem", fontFamily:"Andale Mono, monospace"}}>
                <h1>experiments</h1>
                <ul className="nav" style={{listStyleType:"none"}}>
                    <PageListing title="list sorting" location="/sorting" img="static_sorting.png" anim="sorting.gif"/>
                    <PageListing title="maze navigation" location="/maze" img="maze_static.png" anim="maze.gif"/>
                    <PageListing title="graph visual" location="/graph" img="graph_static.png" anim="graph.gif"/>
                    <PageListing title="match tiles" location="/colorpuzzle" img="colorpuzzle_static.png" anim="colorpuzzle.gif"/>
                    <PageListing title="heat simulation" location="/heatrod" img="rod.png" anim="rod.gif"/>
                </ul>

            </div>
        </div>
    );
}