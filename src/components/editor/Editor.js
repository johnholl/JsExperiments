import AceEditor from "react-ace";
import React from 'react';

import 'ace-builds/webpack-resolver';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-dracula";
import "./styles.css"
import { useSelector, useDispatch } from 'react-redux'
import { update } from '../reducers/codeReducers'

export default function Editor(props) {
  const code = useSelector((state) => state.code.value[props.id])
  const dispatch = useDispatch()
    
    return (
      <div className="editor">
      <AceEditor
        style={{width:"100%", height:"100%"}}
        value={code}
        mode="javascript"
        theme="dracula"
        onChange={(newValue) => dispatch(update({id: props.id, text: newValue}))}
        name="maze editor"
        editorProps={{ $blockScrolling: true }}
        fontSize={14}
      />
      </div>

    )
}
