import React from 'react';
import {Link} from "react-router-dom";

export default function PageListing(props) {

    return(
        <div style={{padding:"20px"}}>
            <Link to={props.location}>
                <div className="card">
                    <div style={{height:"300px", padding:"20px"}}>
                        <img className="static" src={props.img} alt="Avatar" style={{width:"250px", height:"230px", objectFit:"cover"}}/>
                        <img src={props.anim} alt="Avatar" style={{width:"250px", height:"230px"}}/>
                        <div className="container">
                            <h4><b>{props.title}</b></h4>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}