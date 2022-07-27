const firstNumScreen = document.querySelector("#firstNum"); 
const secondNumScreen = document.querySelector("#secondNum"); 
const numKeys = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const pointKey = document.querySelector("#pointBtn");
const equalBtn = document.querySelector("#equalBtn");
const clearBtn = document.querySelector("#clearBtn"); 
const deleteBtn = document.querySelector("#deleteBtn"); 

let firstNum = ''; 
let secondNum = '';
let operation = null; 
let reset = false; 

numKeys.forEach((key) => {
    key.addEventListener('click', () => {
        if(firstNumScreen.textContent === "0" || reset)
        resetScreen(); 
        firstNumScreen.textContent += key.textContent;
    })
}); 

operatorButtons.forEach((button)=> {
    button.addEventListener('click', () => {
        firstNum = firstNumScreen.textContent; 
        operation = button.textContent; 
        secondNumScreen.textContent = `${firstNum} ${operation}`;
        reset = true;
    })
} )

equalBtn.addEventListener('click', () => {
    if(operation === null || reset) return
    secondNum = firstNumScreen.textContent; 
    firstNumScreen.textContent =  roundResult(
        operate(operation, firstNum, secondNum));
    secondNumScreen.textContent = `${firstNum} ${operation} ${secondNum} =`; 
    operation = null; 
}); 

clearBtn.addEventListener('click', () => {
    firstNumScreen.textContent = "0"; 
    secondNumScreen.textContent ="";
    firstNum = ''; 
    secondNum = '';  
    operation = null; 
})

deleteBtn.addEventListener('click', () => {
    firstNumScreen.textContent = firstNumScreen.textContent.toString().slice(0,-1);
})

pointKey.addEventListener('click', () => {
    if(reset) resetScreen(); 
    if (firstNumScreen.textContent === '')
    firstNumScreen.textContent = '0'
    if (firstNumScreen.textContent.includes('.')) return
    firstNumScreen.textContent += '.'
})

function resetScreen(){
    firstNumScreen.textContent= ''; 
    reset = false; 
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
  }
  


function add(a, b){
    return a+b; 
}

function subtract(a,b){
    return a-b; 
}

function multiply(a,b){
    return a*b; 
}
function divide(a,b){
    return a/b;
} 

function operate (operator, a, b){
    a = Number(a)
    b = Number(b)
    switch (operator) {
      case '+':
        return add(a, b)
      case '-':
        return subtract(a, b)
      case 'x':
        return multiply(a, b)
      case '/':
        if (b === 0) return null
        else return divide(a, b)
      default:
        return null
    }
}
