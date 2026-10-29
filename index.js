//formatting functions
const formatCents = function(input){
    let numI = Number(input)
    if(Number.isNaN(numI))
        return null;
    else if(numI < 0)
        return null;
    else 
        return numI.toFixed(2);
    
}

const formatString = function(input){
    let trimString = input.trim();
    
    if(trimString.length == 0)
        return null;
    return trimString.toLowerCase();
}




let itemList = new Map();
let splitCostList = new Map();


const addItem = function(itemName, price){
    itemList.set(itemName, {itemPrice: price, sharedBy: [] });
}

const toggleItem = function(itemName, personSelect){
    const item  = itemList.get(itemName);
    if(item.sharedBy.includes(personSelect))
        item.sharedBy = item.sharedBy.filter((current) => current != personSelect);
    else{
        let shared = itemList.get(itemName).sharedBy;
        return shared.push(personSelect);
    }
    
}

//split function
const splitCost = function(allItems){
    for (const [item, value] of allItems){
        let splitCost = value.itemPrice/value.sharedBy.length;
        return splitCostList.set(item, value.itemPrice = splitCost);
    }
}



addItem("Milk", 4.5);
toggleItem("Milk",3);
toggleItem("Milk",5 );
console.dir(itemList);
splitCost(itemList);
console.log(splitCostList);




