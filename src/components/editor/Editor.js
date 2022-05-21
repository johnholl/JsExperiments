import AceEditor from "react-ace";
import React from 'react';

import 'ace-builds/webpack-resolver';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-dracula";

import "./styles.css"

export default function Editor(props) {
    
    return (
      <div className="editor">
      <AceEditor
        style={{width:"100%", height:"100%"}}
        value={props.code}
        mode="javascript"
        theme="dracula"
        onChange={(newValue) => props.setVal(newValue)}
        name="maze editor"
        editorProps={{ $blockScrolling: true }}
        fontSize={14}
      />
      </div>

    )
}
