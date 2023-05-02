const wordsEncrypted = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
}

const message = document.querySelector(".message__text");
const btnEncrypt = document.querySelector(".button__encrypt");
const btnDecrypt = document.querySelector(".button__decrypt");
const resultado = document.querySelector(".result__text");
const paragraph = document.querySelector(".result__paragraph");
const resultContainer = document.querySelector(".result");
const resultText = document.querySelector(".result__text");
const resultParagraph = document.querySelector(".result__paragraph");
const btnCopy = document.querySelector(".result__copy");
const btnDarkMode = document.querySelector(".dark__mode");
let isDarkMode = false;

btnEncrypt.addEventListener("click", () => encrypt(message.value));
btnDecrypt.addEventListener("click", () => decrypt(message.value));
btnCopy.addEventListener("click", () => copyText());
btnDarkMode.addEventListener("click", () => {
    isDarkMode = !isDarkMode; 
    darkMode(); 
  });


function encrypt(message) {
    let messageEncrypted = "";
    if(message.length === 0) {
       return validate();
    }
    for (let i = 0; i < message.length; i++) {
        messageEncrypted += wordsEncrypted[message[i]] || message[i];
    }
    showResult(messageEncrypted);
}

function decrypt(message) {
    const wordsEncryptedKeys = Object.keys(wordsEncrypted);
    const wordsEncryptedValues = Object.values(wordsEncrypted);

    if(message.length === 0) {
        return validate();
    }

    for(let i = 0; i < wordsEncryptedValues.length; i++) {
        message = message.replace(
            new RegExp(wordsEncryptedValues[i], "g"), wordsEncryptedKeys[i]
        );
    }
    showResult(message);
}

function showResult(message) {
    const img = document.querySelector(".result__img");
    img.style.display = "none";
    resultText.innerHTML = " ";

    resultContainer.style.display = "flex";
    btnCopy.style.display = "block";
    resultParagraph.innerHTML = message;
}

function validate() {
    resultContainer.style.display = "flex";
    btnCopy.style.display = "none";
    resultText.innerHTML = "Ningún mensaje fue encontrado";
    resultParagraph.innerHTML = "Ingresa el texto que desees encriptar o desencriptar.";
}

function copyText() {
    const text = resultParagraph.innerHTML;
    navigator.clipboard.writeText(text);
    btnCopy.innerHTML = "Copiado!";
    btnCopy.style.backgroundColor = "#2ecc71";
    setTimeout(() => {
        btnCopy.innerHTML = "Copiar";
        btnCopy.style.backgroundColor = "#E5E5E5";
    }, 2000);

}

function darkMode() {
    if (isDarkMode) {
        btnDarkMode.classList.add("dark__mode--active");
        btnDarkMode.classList.remove("fa-sun");
        btnDarkMode.classList.add("fa-moon");
        btnDarkMode.classList.add("dark__mode--icon");
        document.documentElement.style.setProperty('--primary-color', "#000000");
        document.documentElement.style.setProperty('--secundary-color', "#ffffff");
        btnDarkMode.style.color = "#000000";
    } else {
        btnDarkMode.classList.remove("dark__mode--active");
        btnDarkMode.classList.add("fa-sun");
        btnDarkMode.classList.remove("fa-moon");
        btnDarkMode.classList.remove("dark__mode--icon");
        document.documentElement.style.setProperty('--primary-color', "#E5E5E5");
        document.documentElement.style.setProperty('--secundary-color', "#0A3871");
        btnDarkMode.style.color = "#94940d";
    }
  }