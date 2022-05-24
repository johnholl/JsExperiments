import Editor from "./Editor";
import Console from "./Console";

export default function EditorConsole(props) {

    return(
        <div className="editor-console">
        <Editor id={props.id}/>
        <Console id={props.id}/>
        </div>
    )


}