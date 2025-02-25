let total = document.getElementById('total');
/**
 * Muestra el valor del botón presionado en la pantalla.
 *
 * @param {HTMLElement} button - El botón presionado.
 * @param {HTMLElement} total - El elemento que muestra la expresión.
 */
function showButton(button, total) {
    total.innerText += button.innerText;
}

/**
 * Calcula el resultado de la expresión contenida en 'total'.
 * Realiza las operaciones de multiplicación, división, suma y resta.
 *
 * @param {HTMLElement} total - El elemento que contiene la expresión matemática.
 * @returns {number} - El resultado de la operación.
 */
function calculateResult(total) {
    let expression = total.innerText;

    let result = resolveMultiplicationAndDivision(expression);

    result = resolveAdditionAndSubtraction(result);

    return result;
}

/**
 * Resuelve las operaciones de multiplicación y división en la expresión.
 *
 * @param {string} expression - La expresión matemática.
 * @returns {number} - El resultado después de resolver multiplicación y división.
 */
function resolveMultiplicationAndDivision(expression) {
    let parts = expression.split(/([x÷])/);
    let result = parseFloat(parts[0]);

    for (let i = 1; i < parts.length; i += 2) {
        const operator = parts[i];
        const value = parseFloat(parts[i + 1]);

        if (operator === 'x') {
            result *= value;
        } else if (operator === '÷') {
            result /= value;
        }
    }

    return result;
}

/**
 * Resuelve las operaciones de suma y resta en la expresión.
 *
 * @param {number} partialResult - El resultado parcial después de multiplicación y división.
 * @returns {number} - El resultado final después de resolver suma y resta.
 */
function resolveAdditionAndSubtraction(partialResult) {
    let result = partialResult;

    let parts = result.toString().split(/([+-])/);

    result = parseFloat(parts[0]);

    for (let i = 1; i < parts.length; i += 2) {
        const operator = parts[i];
        const value = parseFloat(parts[i + 1]);

        if (operator === '+') {
            result += value;
        } else if (operator === '-') {
            result -= value;
        }
    }

    return result;
}

/**
 * Manejador de clic para el botón igual (=) para calcular el resultado.
 */
function calculate() {
    let result = calculateResult(total);
    total.innerText = result;
}

/**
 * Manejador de clic para el botón de limpiar (C) para resetear la pantalla.
 */
function clearDisplay() {
    total.innerText = '';
}

let equalButton = document.getElementById('equal-button');
equalButton.onclick = calculate;

let clearButton = document.getElementById('clear-button');
clearButton.onclick = clearDisplay;

let buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    button.onclick = function() {
        showButton(button, total);
    };
});