const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const number = button.getAttribute('data-number');
    const operatorValue = button.getAttribute('data-operator');

    if (number !== null) {
      handleNumber(number);
    } else if (operatorValue !== null) {
      handleOperator(operatorValue);
    } else if (button.id === 'equals') {
      handleEquals();
    } else if (button.id === 'clear') {
      handleClear();
    } else if (button.id === 'backspace') {
      handleBackspace();
    }

    updateDisplay();
  });
});

function handleNumber(number) {
  if (currentInput.includes('.') && number === '.') return;
  currentInput = currentInput.toString() + number.toString();
}

function handleOperator(op) {
  if (currentInput === '') return;
  if (previousInput !== '') {
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = '';
}

function handleEquals() {
  if (currentInput === '' || previousInput === '') return;
  calculate();
  operator = '';
}

function handleClear() {
  currentInput = '';
  previousInput = '';
  operator = '';
}

function handleBackspace() {
  currentInput = currentInput.slice(0, -1);
}

function calculate() {
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case '+':
      currentInput = prev + current;
      break;
    case '-':
      currentInput = prev - current;
      break;
    case '*':
      currentInput = prev * current;
      break;
    case '/':
      currentInput = prev / current;
      break;
    default:
      return;
  }

  previousInput = '';
}

function updateDisplay() {
  display.textContent = currentInput || previousInput || '0';
}
