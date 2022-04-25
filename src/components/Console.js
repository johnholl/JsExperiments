import React from 'react';

export default function Console(props){
    return(
        <div style={{width:500, height:150, backgroundColor: "lightgray", backgroundClip: "content-box", overflow:"auto"}}>
            <text style={{fontWeight:700, fontSize:"16px"}}>console</text>
            {props.message.split('\n').map(function(str, j){
                return <p key={j} style={{marginBottom:0, margin:0, paddingTop:0, fontSize:"14px", fontFamily:"Andale Mono, monospace"}}>{str}</p>
                })}
        </div>
    )
}