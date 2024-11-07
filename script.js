// light/dark theme
const toggleElement = document.querySelector(".themes__toggle");

const toggleDarkTheme = () =>
  toggleElement.classList.toggle("themes__toggle--isActive");

const toggleDarkThemeWithEnter = (event) =>
  event.key === "Enter" && toggleDarkTheme();

toggleElement.addEventListener("keydown", toggleDarkThemeWithEnter);
toggleElement.addEventListener("click", toggleDarkTheme);

// logic for calculator

let storedNumber = "";
let currentNumber = "";
let operation = "";

let resultElement = document.querySelector(".calc__result");
const keyElement = document.querySelectorAll("[data-type]");

const updateScreen = (value) => {
  resultElement.innerText = !value ? "0" : value;
};

const resetButtonHandler = () => {
  storedNumber = "";
  currentNumber = "";
  operation = "";
  updateScreen(currentNumber);
};

const deleteButtonHandler = () => {
  if (!currentNumber && currentNumber === "0") return;
  if (currentNumber.length === 1) {
    currentNumber = "";
  }
  currentNumber = currentNumber.slice(0, -1);
  updateScreen(currentNumber);
};

const numberButtonHandler = (value) => {
  if (value === "." && currentNumber.includes(".")) return;
  if (value === "0" && !currentNumber) return;
  currentNumber += value;
  updateScreen(currentNumber);
};

const executeOperation = () => {
  if (currentNumber && storedNumber && operation) {
    switch (operation) {
      case "+":
        storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
        break;
      case "-":
        storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
        break;
      case "/":
        storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
        break;
      case "*":
        storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
        break;
    }
    currentNumber = "";
    updateScreen(storedNumber);
  }
};

const operationButtonHandler = (operationValue) => {
  if (!currentNumber && !storedNumber) return;
  if (currentNumber && !storedNumber) {
    storedNumber = currentNumber;
    currentNumber = "";
    operation = operationValue;
  } else if (storedNumber) {
    operation = operationValue;
  }
  if (currentNumber) executeOperation();
  console.log({ currentNumber });
  console.log({ storedNumber });
  console.log({ operation });
};

const keyElementsHandler = (element) => {
  element.addEventListener("click", () => {
    if (element.dataset.type === "number") {
      numberButtonHandler(element.dataset.value);
    }
    if (element.dataset.type === "operation") {
      switch (element.dataset.value) {
        case "c":
          resetButtonHandler();
          break;
        case "Backspace":
          deleteButtonHandler();
          break;
        case "Enter":
          executeOperation();
          break;
        default:
          operationButtonHandler(element.dataset.value);
      }
    }
  });
};
keyElement.forEach(keyElementsHandler);

// use keyboard as input source
const availableNumbers = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
];
const availableOperations = ["+", "-", "*", "/"];

window.addEventListener("keydown", (event) => {
  keyboardWithoutHover(event.key);
});

const keyboardWithoutHover = (key) => {
  if (availableNumbers.includes(key)) {
    numberButtonHandler(key);
  } else if (availableOperations.includes(key)) {
    operationButtonHandler(key);
  } else if (key === "Backspace") {
    deleteButtonHandler();
  } else if (key === "Enter") {
    executeOperation();
  }
};