export function processCode(code) {
    let internalCode = code.replaceAll("animate", "if (window.shouldStopCode) { throw new Error('CODE STOPPED')} await animate")
    .replaceAll("locations", "locations.current")
    .replaceAll(/console\.log\(([^)]+)\)/g, "x=x + $1 + \"\\n\"; setConsoleMessage\(x\);");
    internalCode = "try{" + internalCode + "} catch(error){setConsoleMessage((msg) =>msg + error.message)}";
    internalCode = "(async () =>{ var x = \"\";" + internalCode + "})().then(()=>{});";
    return internalCode;
}

export const forceCoulomb = (x1, y1, x2, y2, clip) => {
    const a = 0.003;
    const r = distance(x1, y1, x2, y2);
    if(r<Math.sqrt(clip)){
        return [a*clip*(x1-x2), a*clip*(y1-y2)]
    } else{
        return [(a/r**3)*(x1-x2), (a/r**3)*(y1-y2)];
    }
}

export const forceHooke = (x1, y1, x2, y2, clip) => {
    const b = 0.01;
    const r = distance(x1, y1, x2, y2);
    if(r>clip){
        return [b*clip*(x2-x1), b*clip*(y2-y1)];
    } else{
        return [b*r*(x2-x1), b*r*(y2-y1)];
    }
}

export const distance = (x1, y1, x2, y2) => {
    return Math.sqrt((x2-x1)**2 + (y2-y1)**2)
}

export function newGraph(n) {

    // first, generate a Pruefer sequence
    var pSeq = [];
    for(var i=1; i<n-1; i++){
        pSeq.push(Math.floor(Math.random()*n))
    }
  
    var edgeList = [];
    var deg = Array(n).fill(1);
  
    pSeq.map(val => deg[val]++);
  
    for(var i=0; i<pSeq.length; i++){
        for(var j=0; j<n; j++){
            if(deg[j]===1){
                deg[j]--;
                deg[pSeq[i]]--;
                edgeList.push([pSeq[i],j]);
                break
            }
        }
    }
    var deg1 = [];
    deg.map((d, i) => {if(d===1){deg1.push(i)} return 0});
    edgeList.push([deg1[0],deg1[1]]);
    var nds = Array.from(Array(n).keys())

    var locations = [];
    for(var i=0; i<n; i++){
        locations.push([Math.random()*5-2.5, Math.random()*5-2.5])
    }

    return {nds, edgeList, locations};
  }