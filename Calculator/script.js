const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

const errorMessage = document.querySelector(".error-message");

const calculate = (btnValue) => {
  display.focus();
  if (btnValue === "=" && output !== "") {
    try {
      output = eval(output);
      errorMessage.textContent = "";
    } catch (error) {
      errorMessage.textContent = "Error";
    }
  } else if (btnValue === "AC") {
    output = "";
    errorMessage.textContent = "";
  } else if (btnValue === "DEL") {
    output = output.toString().slice(0, -1);
    errorMessage.textContent = "";
  } else {
    if (output === "" && specialChars.includes(btnValue)) return;
    output += btnValue;
  }
  // Display the result back to the user
  display.value = output;
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    calculate(e.target.dataset.value);
    button.classList.add("active");
    setTimeout(() => {
      button.classList.remove("active");
    }, 100);
  });
});

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (/[0-9/*-+=.%]/.test(key)) {
    calculate(key);
  }
  if (key === "Enter") {
    calculate("=");
  }
});
