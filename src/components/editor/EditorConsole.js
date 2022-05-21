import Editor from "./Editor";
import Console from "./Console";

export default function EditorConsole(props) {

    return(
        <div className="editor-console">
        <Editor setVal={props.setVal}/>
        <Console message={props.message}/>
        </div>
    )


}