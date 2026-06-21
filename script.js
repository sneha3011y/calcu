// Simple calculator logic (no eval). Supports keyboard input.
(() => {
  const previousOperandText = document.getElementById('previousOperand');
  const currentOperandText = document.getElementById('currentOperand');
  const numberButtons = document.querySelectorAll('.btn.number');
  const operatorButtons = document.querySelectorAll('.btn.operator');
  const clearButton = document.querySelector('[data-action="clear"]');
  const deleteButton = document.querySelector('[data-action="delete"]');
  const equalsButton = document.querySelector('[data-action="equals"]');

  let current = '';
  let previous = '';
  let operation = null;

  function updateDisplay() {
    currentOperandText.textContent = current === '' ? '0' : current;
    previousOperandText.textContent = previous === '' ? '' : `${previous} ${operation || ''}`;
  }

  function appendNumber(num) {
    if (num === '.' && current.includes('.')) return;
    if (num === '.' && current === '') current = '0.';
    else current += num;
  }

  function chooseOperator(op) {
    if (current === '' && previous === '') return;
    if (current === '' && previous !== '') {
      operation = op; // change operator
      updateDisplay();
      return;
    }
    if (previous !== '') {
      compute();
    }
    operation = op;
    previous = current;
    current = '';
  }

  function compute() {
    const prev = parseFloat(previous);
    const curr = parseFloat(current);
    if (isNaN(prev) || isNaN(curr)) return;
    let result;
    switch (operation) {
      case '+': result = prev + curr; break;
      case '-': result = prev - curr; break;
      case '*': result = prev * curr; break;
      case '/':
        if (curr === 0) { result = 'Error'; break; }
        result = prev / curr; break;
      default: return;
    }
    // Trim long floats
    if (typeof result === 'number') {
      result = Math.round((result + Number.EPSILON) * 1e12) / 1e12;
      result = result.toString();
    } else {
      result = result.toString();
    }
    current = result;
    previous = '';
    operation = null;
  }

  function clearAll() {
    current = '';
    previous = '';
    operation = null;
  }

  function deleteLast() {
    if (current !== '') {
      current = current.slice(0, -1);
    }
  }

  // Button events
  numberButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      appendNumber(btn.dataset.value);
      updateDisplay();
    });
  });

  operatorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      chooseOperator(btn.dataset.value);
      updateDisplay();
    });
  });

  clearButton.addEventListener('click', () => {
    clearAll();
    updateDisplay();
  });

  deleteButton.addEventListener('click', () => {
    deleteLast();
    updateDisplay();
  });

  equalsButton.addEventListener('click', () => {
    if (previous === '' || current === '' || operation === null) return;
    compute();
    updateDisplay();
  });

  // Keyboard support
  window.addEventListener('keydown', (e) => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
      appendNumber(e.key);
      updateDisplay();
    } else if (['+', '-', '*', '/'].includes(e.key)) {
      chooseOperator(e.key);
      updateDisplay();
    } else if (e.key === 'Enter' || e.key === '=') {
      if (previous !== '' && current !== '' && operation !== null) {
        compute();
        updateDisplay();
      }
    } else if (e.key === 'Backspace') {
      deleteLast();
      updateDisplay();
    } else if (e.key === 'Escape') {
      clearAll();
      updateDisplay();
    }
  });

  // Initialize
  updateDisplay();
})();