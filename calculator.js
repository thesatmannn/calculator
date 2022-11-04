const buttons = document.querySelectorAll('button');
const display = document.getElementById('display');
let displayValue = 0;

function operate(x, y, operator){
    if(operator == '+'){
        return add();
    }
    else if (operator == '-'){
        return subtract();
    }
    else if (operator == '*'){
        return multiply();
    }
    else {
        divide();
    }
}

function add(x, y){
    return x + y;
}

function subtract(x, y){
    return 
}

function multiply(x, y){
    return x * y;
}

function divide(x, y){
    return x / y;
}
