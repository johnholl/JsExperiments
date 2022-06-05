export function processCode(code) {
    let internalCode = code
    .replaceAll("take", "if (window.shouldStopCode) { throw new Error('CODE STOPPED')} await take")
    .replaceAll("piles", "pref.current")
    .replaceAll(/console\.log\(([^)]+)\)/g, "x=x + $1 + \"\\n\"; setConsoleMessage\(x\);")
    internalCode = "try{" + internalCode + "} catch(error){setConsoleMessage(error.message)}";
    internalCode = "(async () =>{ var x = \"\";" + internalCode + "})().then(()=>{});";
    return internalCode;
}

export function newPiles(n) {
    var piles = Array();
    for(var i=0; i<n; i++){
        piles.push(Math.floor(Math.random()*8) + 1)
    }
    return piles
}

export function nimScore(piles) {
    let score = 0;
    piles.forEach((num) => {
        score ^= num;
    })
    return score;
}


export function nimSum(score, pile) {
    return score^pile;
}