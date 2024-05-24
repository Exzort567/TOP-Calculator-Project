document.addEventListener('DOMContentLoaded', () => {
    const topScreen = document.querySelector('.top-screen');
    const bottomScreen = document.querySelector('.bottom-screen');
    const clearBtn = document.querySelector('.clear-btn');
    const backspaceBtn = document.querySelector('.backspace-btn');
    const numberButtons = document.querySelectorAll('.number-btn');
    const operatorButtons = document.querySelectorAll('.op-btn');
    const equalBtn = document.getElementById('equal-btn');

    let currentInput = '0';
    let prevInput = '';
    let operator = null;

    function updateBottomScreen() {
        bottomScreen.textContent = currentInput;
    }

    function updateTopScreen() {
        topScreen.textContent = prevInput + ' ' + (operator || '');
    }

    function clear() {
        currentInput = '0';
        prevInput = ''
        operator = null;
        updateBottomScreen();
        updateTopScreen();
    }

    function backspace() {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = '0';
        }

        updateBottomScreen();
    }

    function appendNumber(number) {
        if (currentInput === '0') {
            currentInput = number;
        } else {
            currentInput += number;
        }
        updateBottomScreen();
    }

    function toggleSign() {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateBottomScreen();
    }

    function chooseOperator(selectedOperator) {
        if (operator !== null) {
            calculate();
        } 
        operator = selectedOperator;
        prevInput = currentInput;
        currentInput = '0'
        updateTopScreen();
    }

    function calculate() {
        let result;
        const current = parseFloat(currentInput);
        const prev = parseFloat(prevInput);

        switch (operator) {
            case 'add':
                result = prev + current;
                break;
            case 'subtract': 
                result = prev - current;
                break;
            case 'multiply':
                result = prev * current;
                break;
            case 'divide': 
                result = prev / current;
                break
            default:
                break;
        }
        currentInput = result.toString();
        operator = null;
        prevInput = '';
        updateBottomScreen();
        updateTopScreen();

    }

    clearBtn.addEventListener('click', clear);
    backspaceBtn.addEventListener('click', backspace);
    equalBtn.addEventListener('click', calculate);

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.value === '+/-') {
                toggleSign();
            } else {
                appendNumber(button.value)
            }
        });
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            chooseOperator(button.value)
        });
    });

    clear();
});