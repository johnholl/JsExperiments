export function processCode(code) {
    let internalCode = code.replaceAll("method1", "if (window.shouldStopCode) { throw new Error('CODE STOPPED')} await method1")
    .replaceAll("data", "dataRef.current")
    .replaceAll(/console\.log\(([^)]+)\)/g, "x=x + $1 + \"\\n\"; setConsoleMessage\(x\);")
    internalCode = "try{" + internalCode + "} catch(error){setConsoleMessage(error.message)}";
    internalCode = "(async () =>{ var x = \"\";" + internalCode + "})().then(()=>{});";
    return internalCode;
}