import React from 'react';
import {Link} from "react-router-dom";


export default function MainPage() {

    return (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', paddingTop:50}}>
            <div style={{width: 1200, minHeight:"100vh", borderStyle:"solid", borderColor:"black", borderRadius:"10px", padding:"10px", backgroundColor:"#CBD7E9", fontSize:"1.5rem", fontFamily:"Andale Mono, monospace"}}>
                <h1>experiments</h1>
                <ul class="nav" style={{listStyleType:"none"}}>
                    <li>
                    <Link to="/sorting">
                        <div class="card">
                            <img class="static" src="static_sorting.png" alt="Avatar" style={{width:"300px", height:"250px", objectFit:"cover"}}/>
                            <img src="sorting.gif" alt="Avatar" style={{width:"300px", height:"250px"}}/>
                            <div class="container">
                                <h4><b>list sorting</b></h4>
                            </div>
                        </div>
                    </Link>
                    </li>
                    <li>
                    <Link to="/maze">
                        <div class="card">
                            <img class="static" src="maze_static.png" alt="Avatar" style={{width:"300px", height:"250px", objectFit:"cover"}}/>
                            <img src="maze.gif" alt="Avatar" style={{width:"300px", height:"250px"}}/>
                            <div class="container">
                                <h4><b>maze navigation</b></h4>
                            </div>
                        </div>
                    </Link>
                    </li>
                    <li>
                    <Link to="/graph">
                        <div class="card">
                                <img class="static" src="graph_static.png" alt="Avatar" style={{width:"300px", height:"250px", objectFit:"cover"}}/>
                                <img src="graph.gif" alt="Avatar" 
                                style={{width:"300px", height:"250px"}}/>
                            <div class="container">
                                <h4><b>graph viz</b></h4>
                            </div>
                        </div>
                    </Link>
                    </li>
                    <li>
                    <Link to="/colorpuzzle">
                        <div class="card">
                            <img class="static" src="colorpuzzle_static.png" alt="Avatar" style={{width:"300px", height:"250px", objectFit:"cover"}}/>
                            <img src="colorpuzzle.gif" alt="Avatar" style={{width:"300px", height:"250px"}}/>
                            <div class="container">
                                <h4><b>color puzzle</b></h4>
                            </div>
                        </div>
                    </Link>
                    </li>
                    <li>
                    <Link to="/heatrod">
                        <div class="card">
                            <img class="static" src="rod.png" alt="Avatar" style={{width:"300px", height:"250px", objectFit:"cover"}}/>
                            <img src="rod.gif" alt="Avatar" style={{width:"300px", height:"250px"}}/>
                            <div class="container">
                                <h4><b>rod heating</b></h4>
                            </div>
                        </div>
                    </Link>
                    </li>
                    <li>
                        <Link to="/three">three</Link>
                    </li>
                </ul>

            </div>
        </div>
    );
}