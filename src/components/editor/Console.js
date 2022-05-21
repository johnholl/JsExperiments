import React from 'react';

export default function Console(props){
    return(
        <div className="console">
            <span style={{fontWeight:700}}>console</span>
            {props.message.split('\n').map(function(str, j){
                return <p key={j} style={{marginBottom:0, margin:0, paddingTop:0, fontSize:"14px", fontFamily:"Andale Mono, monospace"}}>{str}</p>
                })}
        </div>
    )
}