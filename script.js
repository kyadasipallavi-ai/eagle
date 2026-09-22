const passwordInput = document.getElementById("password");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const lengthCheck = document.getElementById("length");
const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numberCheck = document.getElementById("number");
const specialCheck = document.getElementById("special");
const uniqueCheck = document.getElementById("unique");

const suggestion = document.getElementById("suggestion");

passwordInput.addEventListener("input", analyzePassword);

document.getElementById("togglePassword").addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        this.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        this.textContent = "Show";
    }
});

function analyzePassword() {

    const password = passwordInput.value;

    if (password.length === 0) {
        resetAnalyzer();
        return;
    }

    let score = 0;
    let suggestions = [];

    if (password.length >= 8) {
        score++;
        lengthCheck.textContent = "✅ At least 8 characters";
    } else {
        lengthCheck.textContent = "❌ At least 8 characters";
        suggestions.push("Use at least 8 characters.");
    }

    if (/[A-Z]/.test(password)) {
        score++;
        uppercaseCheck.textContent = "✅ Contains uppercase letter";
    } else {
        uppercaseCheck.textContent = "❌ Contains uppercase letter";
        suggestions.push("Add an uppercase letter.");
    }

    if (/[a-z]/.test(password)) {
        score++;
        lowercaseCheck.textContent = "✅ Contains lowercase letter";
    } else {
        lowercaseCheck.textContent = "❌ Contains lowercase letter";
        suggestions.push("Add a lowercase letter.");
    }

    if (/[0-9]/.test(password)) {
        score++;
        numberCheck.textContent = "✅ Contains a number";
    } else {
        numberCheck.textContent = "❌ Contains a number";
        suggestions.push("Add a number.");
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
        specialCheck.textContent = "✅ Contains special character";
    } else {
        specialCheck.textContent = "❌ Contains special character";
        suggestions.push("Add a special character.");
    }

    const repeated = /(.)\1\1/.test(password);

    if (!repeated) {
        score++;
        uniqueCheck.textContent = "✅ No obvious repeated characters";
    } else {
        uniqueCheck.textContent = "❌ Contains repeated characters";
        suggestions.push("Avoid repeated characters.");
    }

    if (score <= 2) {
        strengthText.textContent = "Very Weak";
        strengthBar.style.width = "20%";
    } else if (score === 3) {
        strengthText.textContent = "Weak";
        strengthBar.style.width = "40%";
    } else if (score === 4) {
        strengthText.textContent = "Medium";
        strengthBar.style.width = "60%";
    } else if (score === 5) {
        strengthText.textContent = "Strong";
        strengthBar.style.width = "80%";
    } else {
        strengthText.textContent = "Very Strong";
        strengthBar.style.width = "100%";
    }

    if (suggestions.length === 0) {
        suggestion.textContent =
            "Good password! Avoid reusing it on other websites.";
    } else {
        suggestion.textContent = suggestions.join(" ");
    }
}

function resetAnalyzer() {

    strengthText.textContent = "Enter a password";
    strengthBar.style.width = "0%";

    lengthCheck.textContent = "❌ At least 8 characters";
    uppercaseCheck.textContent = "❌ Contains uppercase letter";
    lowercaseCheck.textContent = "❌ Contains lowercase letter";
    numberCheck.textContent = "❌ Contains a number";
    specialCheck.textContent = "❌ Contains special character";
    uniqueCheck.textContent = "❌ Not a common/repeated password";

    suggestion.textContent =
        "Enter a password to get suggestions.";
}

document.getElementById("generateBtn").addEventListener("click", function () {

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz" +
        "0123456789" +
        "!@#$%^&*";

    let password = "";

    for (let i = 0; i < 16; i++) {

        const randomIndex =
            Math.floor(Math.random() * characters.length);

        password += characters[randomIndex];
    }

    document.getElementById("generatedPassword").value = password;

});

document.getElementById("copyBtn").addEventListener("click", function () {

    const generated =
        document.getElementById("generatedPassword");

    if (generated.value) {

        navigator.clipboard.writeText(generated.value);

        this.textContent = "Copied!";

        setTimeout(() => {
            this.textContent = "Copy";
        }, 1500);
    }

});