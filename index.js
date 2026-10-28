//input format for numbers



export const formatCents = function(input){
    let numI = Number(input)
    if(Number.isNaN(numI))
        return null;
    else if(numI < 0)
        return null;
    else 
        return numI.toFixed(2);
    
}

//input format for strings
export const formatString = function(input){
    let trimString = input.trim();
    
    if(trimString.length == 0)
        return null;
    return trimString;
}


