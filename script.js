let displayValue = "0";
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = 0;

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
    }
}