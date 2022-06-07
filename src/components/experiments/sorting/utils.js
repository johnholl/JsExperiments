export function processCode(code) {
    let internalCode = code.replaceAll("swap", "if (window.shouldStopCode) { throw new Error('CODE STOPPED')} await swap")
    .replaceAll("arr", "lref.current")
    .replaceAll(/console\.log\(([^)]+)\)/g, "x=x + $1 + \"\\n\"; setConsoleMessage\(x\);")
    internalCode = "try{" + internalCode + "} catch(error){setConsoleMessage(error.message)}";
    internalCode = "(async () =>{ var x = \"\";" + internalCode + "})().then(()=>{});";
    return internalCode;
}

export function newList(n) {
    var sortedList = Array();
    for(var i=0; i<n; i++){
        sortedList.push(Math.floor(Math.random()*100) + 1)
    }

    var list = [...sortedList];
    sortedList.sort(function(a, b) { return a > b ? 1 : -1});
    return {list, sortedList};
}