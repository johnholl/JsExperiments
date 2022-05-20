


export default class MazeEntity {

    constructor(x, y, type, facing, env){
        this.x = x;
        this.y = y;
        this.type = type;
        this.facing = facing;
        this.env = env;
    }

    move() {
        switch(this.facing){
            case 'left': !this.env[this.y][this.x-1] && this.x--; break;
            case 'right': !this.env[this.y][this.x+1] && this.x++; break;
            case 'up': !this.env[this.y-1][this.x] && this.y--; break;
            case 'down': !this.env[this.y+1][this.x] && this.y++; break;
        }
        return;
    }

    turn() {
        switch(this.facing){
            case 'left': this.facing='down'; break;
            case 'down': this.facing='right'; break;
            case 'right': this.facing='up'; break;
            case 'up': this.facing='left'; break;
        }
        return;
    }

    wait() {
        return;
    }

    runCode(code) {
        try{
            eval(code);
            return this;
        }
        catch(err){
        }
    }

    run(command) {
        eval(command);
    }

}