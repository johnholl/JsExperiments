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