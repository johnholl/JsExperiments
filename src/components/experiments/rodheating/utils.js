export function processCode(code) {
    let internalCode = code.replaceAll(/rod\[([0-9])+\]\s*\=/g, "if (window.shouldStopCode) { throw new Error('CODE STOPPED')} ; draw(); await sleepA(speed); rod[$1]=")
    .replaceAll("rod", "rRef.current")
    .replaceAll("rod = ", "if (window.shouldStopCode) { throw new Error('CODE STOPPED')} ; draw(); await sleepA(speed) ; rod = ")
    .replaceAll(/console\.log\(([^)]+)\)/g, "x=x + $1 + \"\\n\"; setConsoleMessage\(x\);");
    internalCode = "try{" + internalCode + "draw();} catch(error){setConsoleMessage((msg) =>msg + error.message)}";
    internalCode = "(async () =>{ var x = \"\";" + internalCode + "})().then(()=>{});";
    return internalCode;
}

export const newRod = (n, mn, mx) => {
    let r = new Array();
    for(let i=0; i<n; i++){
        r.push(Math.floor(Math.random()*(mx-mn) + mn));
    }
    const er = eqRod(r, 10000);
    return {r, er};
}


const eqRod = (rod, cycles) => {
    let nextVals = [...rod]
    for(let i=0; i<cycles; i++){
        for(let j=1; j<rod.length-1; j++){
            nextVals[j] = 0.33*rod[j-1] + 0.33*rod[j+1] + 0.34*rod[j];
        }
        rod = [...nextVals];
    }
    return rod;
}

