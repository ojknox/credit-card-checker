// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:
const validateCred = array => {
    //return true when array contains digits of a valid credit card and false when it is invalid
    let finalArray = [];
    let counter = 0;
    for(let i = array.length - 1; i >= 0; i--){
        if(counter % 2 === 0){
            finalArray.unshift(array[i]);
        } else {
            let value = array[i] * 2;
            if(value > 9 ){
                value = value - 9;
            }
            finalArray.unshift(value);
        }
        counter++;
    }
    const sum = finalArray.reduce((total, number) => total + number);
    if(sum % 10 === 0){
        return true;
    } else {
        return false;
    }
}

//check function works
// console.log(validateCred(valid1), validateCred(valid2), validateCred(valid3), validateCred(valid4), validateCred(valid5));
// console.log(validateCred(invalid1), validateCred(invalid2), validateCred(invalid3), validateCred(invalid4), validateCred(invalid5));

//check for invalid cards
const findInvalidCards = arrays => {
    let invalidCards = [];
    for(const array of arrays){
        if(validateCred(array) === false){
            invalidCards.push(array);
        }
    }
    return invalidCards;
}

const invalidCards = findInvalidCards(batch);

//identify credit card companies that issued the faulty numbers
const idInvalidCardCompanies = arrays => {
    let invalidCardCompanies = [];
    //loop through invalid arrays 
    for(const array of arrays){
        if(array[0] === 3 && !invalidCardCompanies.includes('Amex')){
            invalidCardCompanies.push('Amex');
        } else if(array[0] === 4 && !invalidCardCompanies.includes('Visa')){
            invalidCardCompanies.push('Visa');
        } else if(array[0] === 5 && !invalidCardCompanies.includes('Mastercard')){
            invalidCardCompanies.push('Mastercard');
        } else if(array[0] === 6 && !invalidCardCompanies.includes('Discover')){
            invalidCardCompanies.push('Discover');
        } else if(array[0] < 3 && array[0] > 6){
            console.log('Company not found');
        }
    }
    return invalidCardCompanies;
}

console.log(idInvalidCardCompanies(invalidCards));
console.log(idInvalidCardCompanies([invalid1])); // Should print['visa']
console.log(idInvalidCardCompanies([invalid2])); // Should print ['mastercard']
console.log(idInvalidCardCompanies(batch)); // Find out which companies have mailed out invalid cards

