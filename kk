document.getElementById("createAlternativeBtn").addEventListener("click", function () {
    const alternative =
        "Strong@" +
        Math.floor(Math.random() * 10000) +
        "Xy!";

    document.getElementById("strongerAlternative").value = alternative;
});