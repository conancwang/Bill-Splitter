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
 


//add person
const addPerson = function(name){
    peopleList.set(name);
}
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
const splitCostAll = function(allItems){
    for (const [item, value] of allItems){
        let splitCost = value.itemPrice/value.sharedBy.length;
        splitCostList.set(item, splitCost);
    }
     
}

const splitCost = function(item){
    let gotItem = itemList.get(item)
    let splitCost = gotItem.itemPrice/gotItem.sharedBy.length;
    return splitCost;
    
}
//get subtotal
const getBillSubTotal = function(itemList){
    let subTotal = 0;
    for (const [item, value] of itemList){
        subTotal += value.itemPrice;
    }
    return subTotal;
}
//set tax
const getTaxMultiplier = function(taxInput){
    let taxNum = Number(taxInput);
    let taxMultiplier = (taxNum+100)/100;
    return taxMultiplier;
} 

const tip = 5;
//get total
const getBillTotal = function(allItems, taxPercent, tip){
    const total = getBillSubTotal(allItems) * getTaxMultiplier(taxPercent)+ tip;
    return total;
}

const taxSplit = function(amount, taxPercent){
    const splitTax = (amount * taxPercent/100);
    return splitTax;
}

const tipSplit = function(tip, people){
    const splitTip = tip/people.size;
    return splitTip;
}


const getTotals = function(allItems){
    let totals = new Map();
    for(const [item, value] of allItems){
        if(value.sharedBy.length===0)
            continue;
        const share = splitCost(item);
        for(const person of value.sharedBy){
            if(totals.has(person)){
                totals.set(person, totals.get(person)+share);
            }else {
                totals.set(person, share);
            }
        }
    }
    return totals;
}

const getFinalTotals = function(totals, tip, taxPercent){
    const finalTotal = new Map();
    for(const [person, owes] of totals){
        finalTotal.set(person, owes+taxSplit(owes, taxPercent) + tipSplit(tip,totals));
    }
    return finalTotal;
}

addItem("Milk", 4.5,);
addItem("Cheese", 7,);
addItem("Chicken",12,);
addItem("Ground Beef", 15,);


addPerson("Tyreek");
addPerson("Tyrone");

toggleItem("Milk", "Tyreek");
toggleItem("Cheese", "Tyreek");
toggleItem("Ground Beef", "Tyrone");
toggleItem("Chicken", "Tyrone");


getBillSubTotal(itemList);
getBillTotal(itemList, 13 , 0);


console.log(getTotals(itemList));
console.log(getFinalTotals(getTotals(itemList), tip, 13));














