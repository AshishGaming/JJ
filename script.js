function checkPassword() {
    const password = document.getElementById("password").value;
    const correctPassword = "haarNaam123"; // <-- kies iets leuks

    if (password === correctPassword) {
        window.location.href = "birthday.html";
    } else {
        document.getElementById("error").innerText = "❌ Fout wachtwoord";
    }
}
