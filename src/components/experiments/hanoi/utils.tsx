export function processCode(code: String) {
    let internalCode = code.replaceAll("move", "if (window.shouldStopCode) { throw new Error('CODE STOPPED')} await move")
    .replaceAll("towers", "towerRef.current")
    .replaceAll(/console\.log\(([^)]+)\)/g, "x=x + $1 + \"\\n\"; setConsoleMessage\(x\);")
    internalCode = "try{" + internalCode + "} catch(error){setConsoleMessage(error.message)}";
    internalCode = "(async () =>{ var x = \"\";" + internalCode + "})().then(()=>{});";
    return internalCode;
}

export function newGame(n : number) : number[][]{
    const t1 = []
    for(let i = n; i>0; i--){
        t1.push(i);
    }
    return [t1, [], []]
}