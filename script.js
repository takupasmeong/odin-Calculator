let displayValue = "0";
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;

const button = document.querySelectorAll("button");

function updateDisplay() {
    const display = document.querySelector(".display");
    display.textContent = displayValue;
}

updateDisplay();

button.forEach((item) => {
    item.addEventListener("click", () => {
        if (item.classList.contains("operand")) {
            inputOperand(item.value);
            updateDisplay();
        } else if (item.classList.contains("operator")) {
            inputOperator(item.value);
            updateDisplay();
        } else if (item.classList.contains("equals")) {
            inputEquals();
            updateDisplay();
        } else if (item.classList.contains("clear")) {
            clearDisplay();
            updateDisplay();
        } else if (item.classList.contains("percent")) {
            inputPercent(displayValue);
            updateDisplay();
        } else if (item.classList.contains("sign")) {
            inputSign(displayValue);
            updateDisplay();
        } else if (item.classList.contains("decimal")) {
            inputDecimal(item.value);
            updateDisplay();
        }
    });
});


function inputOperand(operand) {
    if (firstOperator === null) {
        if (displayValue === '0' || displayValue === 0) {
            displayValue = operand;
        } else if (displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    } else {
        displayValue = (displayValue === firstOperand) ? operand : displayValue + operand;
    }
}

function inputOperator(operator) {
    if (firstOperator !== null && secondOperator === null) {
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = rounded(result).toString();
        firstOperand = displayValue;
        result = null;
    } else if (firstOperator !== null && secondOperator !== null) {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator)
        secondOperator = operator;
        displayValue = rounded(result).toString();
        firstOperand = displayValue;
        result = null;
    } else {
        firstOperator = operator;
        firstOperand = displayValue;
    }
}

function inputEquals() {
    if (firstOperator === null) {
        displayValue = firstOperand;
    } else if (secondOperator !== null) {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        if (result === "Error") {
            displayValue = result;
        } else {
            displayValue = rounded(result).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        if (result === "Error") {
            displayValue = result;
        } else {
            displayValue = rounded(result).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}

function inputDecimal(dot) {
    if (displayValue === firstOperand || displayValue === secondOperand) {
    displayValue = "0";
    displayValue += dot;
    }
    else if (!displayValue.includes(dot)) {
        displayValue += dot;
    }
}

function rounded (num) {
    return Math.round(num * 100) / 100;
}

function inputPercent(num) {
    displayValue = (num / 100).toString();
}

function inputSign(num) {
    displayValue = (num * -1).toString();
}

function clearDisplay() {
    displayValue = "0";
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

function operate(a, b, operator) {
    switch (operator) {
        case "+":
            return a + b;
            break;
        case "-":
            return a - b;
            break;
        case "*":
            return a * b;
            break;
        case "/":
            return (b === 0) ? "Error" : a / b;
            break;
        default:
            break;
    }
}