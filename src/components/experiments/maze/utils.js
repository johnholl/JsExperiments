export function processCode(code) {
    let internalCode = code.replaceAll("move()", "if (window.shouldStopCode) { throw new Error('CODE STOPPED')} await move();")
    .replaceAll("turnLeft()", "if (window.shouldStopCode) { throw new Error('CODE STOPPED')} await turnLeft()")
    .replaceAll("turnRight()", "if (window.shouldStopCode) { throw new Error('CODE STOPPED')} await turnRight()")
    .replaceAll("swap", "if (window.shouldStopCode) { throw new Error('CODE STOPPED')} await swap")
    .replaceAll("arr", "lref.current")
    .replaceAll(/console\.log\(([^)]+)\)/g, "x=x + $1 + \"\\n\"; setConsoleMessage\(x\);")
    internalCode = "try{" + internalCode + "} catch(error){setConsoleMessage((msg) =>msg + error.message)}";
    internalCode = "(async () =>{ var x = \"\";" + internalCode + "})().then(()=>{});";
    return internalCode;
}

export function newMaze(x, y) {
    // Establish variables and starting grid
    var start;
    var end;
    var totalCells = x*y;
    var cells = new Array();
    var unvis = new Array();
    for (var i = 0; i < y; i++) {
        cells[i] = new Array();
        unvis[i] = new Array();
        for (var j = 0; j < x; j++) {
            cells[i][j] = [0,0,0,0];
            unvis[i][j] = true;
        }
    }
    
    // Set a random position to start from
    var currentCell = [Math.floor(Math.random()*y), Math.floor(Math.random()*x)];
    start = [2*currentCell[0] + 1, 2*currentCell[1]+1];
    var path = [currentCell];
    unvis[currentCell[0]][currentCell[1]] = false;
    var visited = 1;
    
    // Loop through all available cell positions
    while (visited < totalCells) {
        // Determine neighboring cells
        var pot = [[currentCell[0]-1, currentCell[1], 0, 2],
                [currentCell[0], currentCell[1]+1, 1, 3],
                [currentCell[0]+1, currentCell[1], 2, 0],
                [currentCell[0], currentCell[1]-1, 3, 1]];
        var neighbors = new Array();
        
        // Determine if each neighboring cell is in game grid, and whether it has already been checked
        for (var l = 0; l < 4; l++) {
            if (pot[l][0] > -1 && pot[l][0] < y && pot[l][1] > -1 && pot[l][1] < x && unvis[pot[l][0]][pot[l][1]]) { neighbors.push(pot[l]); }
        }
        
        // If at least one active neighboring cell has been found
        if (neighbors.length) {
            // Choose one of the neighbors at random
            let next = neighbors[Math.floor(Math.random()*neighbors.length)];
            
            // Remove the wall between the current cell and the chosen neighboring cell
            cells[currentCell[0]][currentCell[1]][next[2]] = 1;
            cells[next[0]][next[1]][next[3]] = 1;
            
            // Mark the neighbor as visited, and set it as the current cell
            unvis[next[0]][next[1]] = false;
            visited++;
            currentCell = [next[0], next[1]];
            path.push(currentCell);
        }
        // Otherwise go back up a step and keep going
        else {
            currentCell = path.pop();
        }
    }
    end = [2*currentCell[0] + 1, 2*currentCell[1]+1];
    var ans = Array();
    for (var i = 0; i < 2*y + 2; i++) {
        ans[i] = new Array();
        for (var j = 0; j < 2*x + 3; j++) {
                ans[i][j] = true;
            }
        }
    for (var i = 0; i < y; i++) {
        for (var j = 0; j < x; j++) {
            ans[2*i+1][2*j+1] = false;
            ans[2*i][2*j+1] = cells[i][j][0] == 1 ? false : true
            ans[2*i+1][2*j+2] = cells[i][j][1] == 1 ? false : true
        }
    }

    return {ans, start, end};
}

export const startingMaze = [
    [true,  true,  true,  true,  true,  true,  true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true,  false, false, true,  true,  false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true,  false, false, false, true,  false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true,  false, true,  false, true,  false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true,  false, true,  false, true,  false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true,  false, true,  false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true,  true,  true,  true,  true,  true,  true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true,  true,  true,  true,  true,  true,  true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true,  true,  true,  true,  true,  true,  true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true,  true,  true,  true,  true,  true,  true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true,  true,  true,  true,  true,  true,  true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true,  true,  true,  true,  true,  true,  true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true,  true,  true,  true,  true,  true,  true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true,  true,  true,  true,  true,  true,  true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true,  true,  true,  true,  true,  true,  true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true,  true,  true,  true,  true,  true,  true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true,  true,  true,  true,  true,  true,  true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true,  true,  true,  true,  true,  true,  true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true,  true,  true,  true,  true,  true,  true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true,  true,  true,  true,  true,  true,  true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true,  true,  true,  true,  true,  true,  true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],]