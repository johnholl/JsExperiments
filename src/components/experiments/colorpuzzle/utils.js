
export function processCode(code) {
    let internalCode = code.replaceAll("setLocations", "if (window.shouldStopCode) { throw new Error('CODE STOPPED')} await setLocations")
    .replaceAll("swap", "await sleepA(speed); swap")
    .replaceAll(/console\.log\(([^)]+)\)/g, "x=x + $1 + \"\\n\"; setConsoleMessage\(x\);");
    internalCode = "try{" + internalCode + "} catch(error){setConsoleMessage(error.message)}";
    internalCode = "(async () =>{ var x = \"\";" + internalCode + "})().then(()=>{});";
    return internalCode;
}

const colors = ['red', 'blue', 'green', 'gold'];

export const newPuzzle = (x, y) => {
    const board = []
    for(let i=0; i<x; i++){
        const row = [];
        for(let j=0; j<y; j++){
            const samplecolors = [...colors]
            const i1 = Math.floor(Math.random()*4);
            const i2 = Math.floor(Math.random()*3);
            const i3 = Math.floor(Math.random()*2);
            const i4 = Math.floor(Math.random()*1);
            const c1 = samplecolors[i1];
            samplecolors.splice(i1, 1);
            const c2 = samplecolors[i2];
            samplecolors.splice(i2, 1);
            const c3 = samplecolors[i3];
            samplecolors.splice(i3, 1);
            const c4 = samplecolors[i4];
            samplecolors.splice(i4, 1);

            const tile = {
                top:colors[Math.floor(Math.random()*4)],
                left:colors[Math.floor(Math.random()*4)],
                bottom:colors[Math.floor(Math.random()*4)],
                right:colors[Math.floor(Math.random()*4)]
            }
            row.push(tile);
        }
        board.push(row);
    }

    const maxScore = 2*(x-1)*(y-1)+x-1+y-1
    const score = getScore(board);
    return {board, score, maxScore};
}

export const getScore = (board) => {
    const n = board.length;
    const m = board[0].length;
    let count = 0;
    for(let i=0; i<n-1; i++){
        for(let j=0; j<m-1; j++){
            if(board[i][j].bottom == board[i][j+1].top){ count++; }
            if(board[i][j].right == board[i+1][j].left){ count++; }
        }
    }
    for(let i=0; i<n-1; i++){
        if(board[i][m-1].right == board[i+1][m-1].left){ count++; }
    }

    for(let j=0; j<m-1; j++){
        if(board[n-1][j].bottom == board[n-1][j+1].top){ count++; }
    }

    return count;
}