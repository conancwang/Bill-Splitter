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
let peopleList = new Map();
    
    
//add items
const addItem = function(itemName, price){
    itemList.set(itemName, {itemPrice: price, sharedBy: [] });
}

//remove item
const removeItem = function(itemToRemove){
    itemList.delete(itemToRemove);
}

//check/uncheck items
const toggleItem = function(itemName, personSelect){
    const item  = itemList.get(itemName);
    if(item.sharedBy.includes(personSelect))
        item.sharedBy = item.sharedBy.filter((current) => current != personSelect);
    else{
        let shared = itemList.get(itemName).sharedBy;
        return shared.push(personSelect);
    }
    
}

//splitting the cost
const splitCost = function(allItems){
    for (const [item, value] of allItems){
        let splitCost = value.itemPrice/value.sharedBy.length;
        splitCostList.set(item, splitCost);
    }
     
}
//get subtotal
const getSubTotal = function(itemList){
    let subTotal = 0;
    for (const [item, value] of itemList){
        subTotal += value.itemPrice;
    }
    return subTotal;
}
//set tax
const afterTax = function(taxInput){
    let taxNum = Number(taxInput);
    let taxMultiplier = (taxNum+100)/100;
    return taxMultiplier;
} 

const tip = 0;
//get total
const getTotal = function(allItems, taxPercent, tip){
    const total = getSubTotal(allItems) * afterTax(taxPercent)+ tip;
    return total;
}

//add Person
const setPerson = function(name){
    peopleList.set(name, splitCost);
}








addItem("Milk", 4.5);
toggleItem("Milk",3);
toggleItem("Milk",5 );
console.dir(itemList);
splitCost(itemList);
console.log(splitCostList);




