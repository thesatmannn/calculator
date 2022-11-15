let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let total = null;
const buttons = document.querySelectorAll('button');

function operate(x, y, operator) {
    if(operator === '+') {
        return x + y;
    } 
    else if(operator === '-') {
        return x - y;
    } 
    else if(operator === '*') {
        return x * y;
    } 
    else if(operator === '/') {
        if(y === 0) {
            return 'ERROR 404';
        } 
        else {
        return x / y;
        }
    }
}

function getDisplay() {
    const display = document.getElementById('display');
    display.innerText = displayValue;
    if(displayValue.length > 9) {
        display.innerText = displayValue.substring(0, 9);
    }
}
  
getDisplay();

function clickButton() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            if(buttons[i].classList.contains('operand')) {
                addOperand(buttons[i].value);
                getDisplay();
            } 
            else if(buttons[i].classList.contains('operator')) {
                addOperator(buttons[i].value);
            } 
            else if(buttons[i].classList.contains('equals')) {
                addEquals();
                getDisplay();
            } 
            else if(buttons[i].classList.contains('decimal')) {
                addDecimal(buttons[i].value);
                getDisplay();
            } 
            else if(buttons[i].classList.contains('percent')) {
                addPercent(displayValue);
                getDisplay();
            } 
            else if(buttons[i].classList.contains('sign')) {
                addSign(displayValue);
                getDisplay();
            } 
            else if(buttons[i].classList.contains('clear'))
                clearDisplay();
                getDisplay();
        }
    )}
}

clickButton();

function addOperand(operand) {
    if(firstOperator === null) {
        if(displayValue === '0' || displayValue === 0) {
           
            displayValue = operand;
        } 
        else if(displayValue === firstOperand) {
            
            displayValue = operand;
        } 
        else {
            displayValue += operand;
        }
    } 
    else {
        if(displayValue === firstOperand) {
            displayValue = operand;
        } 
        else {
            displayValue += operand;
        }
    }
}

function addOperator(operator) {
    if(firstOperator != null && secondOperator === null) {
        secondOperator = operator;
        secondOperand = displayValue;
        total = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = round(total, 15).toString();
        firstOperand = displayValue;
        total = null;
    } 
    else if(firstOperator != null && secondOperator != null) {
        secondOperand = displayValue;
        total = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        secondOperator = operator;
        displayValue = round(total, 15).toString();
        firstOperand = displayValue;
        total = null;
    } 
    else { 
        firstOperator = operator;
        firstOperand = displayValue;
    }
}


function addDecimal(point) {
    if(displayValue === firstOperand || displayValue === secondOperand) {
        displayValue = '0';
        displayValue += point;
    } 
    else if(!displayValue.includes(point)) {
        displayValue += point;
    } 
}

function addPercent(num) {
    displayValue = (num/100).toString();
}

function addSign(num) {
    displayValue = (num * -1).toString();
}

function addEquals() {
    if(firstOperator === null) {
        displayValue = displayValue;
    } else if(secondOperator != null) {

        secondOperand = displayValue;
        total = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        if(total === 'ERROR 404') {
            displayValue = 'ERROR 404';
        } 
        else {
            displayValue = round(total, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            total = null;
        }
    } 
    else {
        secondOperand = displayValue;
        total = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        if(total === 'ERROR 404') {
            displayValue = 'ERROR 404';
        } 
        else {
            displayValue = round(total, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            total = null;
        }
    }
}


function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    total = null;
}

function addBackspace() {
    if(firstOperand != null) {
        firstOperand = null;
        getDisplay();
    }
}



function round(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}