import React from 'react';
import {Link} from "react-router-dom";

export default function PageListing(props) {

    return(
        <li>
            <Link to={props.location}>
                <div className="card">
                    <img className="static" src={props.img} alt="Avatar" style={{width:"300px", height:"250px", objectFit:"cover"}}/>
                    <img src={props.anim} alt="Avatar" style={{width:"300px", height:"250px"}}/>
                    <div className="container">
                        <h4><b>{props.title}</b></h4>
                    </div>
                </div>
            </Link>
        </li>
    )
}