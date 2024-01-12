// THEME SWITCHER
var toggleButton1 = document.getElementById("toggle-button1");
toggleButton1.classList.add("active");

var toggleSwitch = document.querySelectorAll(".toggle-switch");
toggleSwitch.forEach(function (button) {
  button.addEventListener("click", function () {
    toggleSwitch.forEach(function (btn) {
      btn.classList.remove("active");
    });

    var id = button.id;
    var themeId = button.getAttribute("data-id");
    document.getElementById(id).classList.add("active");

    const root = document.documentElement;
    const activeTheme = root.getAttribute("data-selected-theme") || "light";
    if (themeId == 1) {
      root.setAttribute("data-selected-theme", "light");
    } else if (themeId == 2) {
      root.setAttribute("data-selected-theme", "dark");
    } else if (themeId == 3) {
      root.setAttribute("data-selected-theme", "neon");
    }
  });
});

// CALCULATOR FUNCTION
function inputValue(value) {
  const windowElement = document.querySelector(".window");
  let currentValue = windowElement.textContent;

  currentValue === "0"
    ? (windowElement.textContent = value)
    : (windowElement.textContent += value);
}

function resetWindow() {
  const windowElement = document.querySelector(".window");
  windowElement.textContent = "0";
}

function deleteValue() {
  const windowElement = document.querySelector(".window");
  let currentValue = windowElement.textContent;
  windowElement.textContent = currentValue.slice(0, -1);
}

function calculate() {
  const windowElement = document.querySelector(".window");
  try {
    windowElement.textContent = evalInput(windowElement.textContent);
  } catch (error) {
    windowElement.textContent = "Error";
  }
}

function evalInput(expression) {
  const operators = ["+", "-", "*", "/"];
  const inputs = expression.split(/([\+\-\*\/])/);

  let numbers = [];
  let currentOperator = null;

  inputs.forEach((input) => {
    if (operators.includes(input)) {
      currentOperator = input;
    } else {
      const number = parseFloat(input);
      if (!isNaN(number)) {
        if (currentOperator) {
          if (currentOperator === "+") {
            numbers.push(number);
          } else if (currentOperator === "-") {
            numbers.push(-number);
          } else if (currentOperator === "*") {
            numbers.push(numbers.pop() * number);
          } else if (currentOperator === "/") {
            numbers.push(numbers.pop() / number);
          }
          currentOperator = null;
        } else {
          numbers.push(number);
        }
      }
    }
  });

  return numbers.reduce((total, num) => total + num, 0);
}
