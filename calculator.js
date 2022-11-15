const buttons = document.querySelectorAll('button');
const display = document.getElementById('display');
let displayValue = "0";
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let total = null;


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
    return x - y;
}

function multiply(x, y){
    return x * y;
}

function divide(x, y){
    return x / y;
}

function getDisplayValue() {
  display.innerText = displayValue;
  if (displayValue.length > 9) {
    display.innerText = displayValue.substring(0, 9);
  }
}
getDisplayValue();

function buttonClick() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function(e){
            if(buttons[i].classList.contains('operand')) {
                inputOperand(buttons[i].value);
                getDisplayValue();
            } else if(buttons[i].classList.contains('operator')) {
                inputOperator(buttons[i].value);
            } else if(buttons[i].classList.contains('equals')) {
                inputEquals();
                getDisplayValue();
            } else if(buttons[i].classList.contains('decimal')) {
                inputDecimal(buttons[i].value);
                getDisplayValue();
            } else if(buttons[i].classList.contains('percent')) {
                inputPercent(displayValue);
                getDisplayValue();
            } else if(buttons[i].classList.contains('sign')) {
                inputSign(displayValue);
                getDisplayValue();
            } else if(buttons[i].classList.contains('clear'))
                clearDisplay();
                getDisplayValue();
            }
            
        )}
    }

buttonClick();

function inputOperand(operand) {
    if(firstOperator === null) {
        if(displayValue === '0' || displayValue === 0) {
            displayValue = operand;
        } else if(displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    } else {
        if(displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }
}

function inputEquals() {
    if(firstOperator === null) {
        displayValue = displayValue;
    } else if(secondOperator != null) {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        if(result === 'lmao') {
            displayValue = 'lmao';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        if(result === 'ERROR 404') {
            displayValue = "ERROR 404";
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}

function inputDecimal(dot) {
    if(displayValue === firstOperand || displayValue === secondOperand) {
        displayValue = '0';
        displayValue += dot;
    } else if(!displayValue.includes(dot)) {
        displayValue += dot;
    } 
}

function inputPercent(num) {
    displayValue = (num/100).toString();
}