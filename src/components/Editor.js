import AceEditor from "react-ace";
import React from 'react';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-dracula";

export default function Editor(props) {
    
    return (
      <AceEditor
        style={{width: 500, height:350}}
        value={props.code}
        mode="javascript"
        theme="dracula"
        onChange={(newValue) => props.setVal(newValue)}
        name="maze editor"
        editorProps={{ $blockScrolling: true }}
        fontSize={14}
      />
    )
}
