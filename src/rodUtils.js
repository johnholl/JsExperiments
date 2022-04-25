

export const newRod = (n, mn, mx) => {
    let r = new Array();
    for(let i=0; i<n; i++){
        r.push(Math.floor(Math.random()*(mx-mn) + mn));
    }
    const er = eqRod(r, 10000);
    console.log(r);
    console.log(er);
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

