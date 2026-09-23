const randomValues = new Uint32Array(16);
crypto.getRandomValues(randomValues);

for (let i = 0; i < 16; i++) {
    password += characters[randomValues[i] % characters.length];
}