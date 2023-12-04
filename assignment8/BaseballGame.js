class BaseballGame {
    constructor() {
        this.secretKey = this.generateSecretKey();
        this.guesses = [];
    }

    getRandomDigit()
    {
        let digit = Math.floor(Math.random() * 10);
        return digit;
    }
    
    generateSecretKey() {
        const n1 = this.getRandomDigit();

        let n2;
        do {
            n2 = this.getRandomDigit();
        } while (n2 === n1);

        let n3;
        do {
            n3 = this.getRandomDigit();
        } while (n3 === n1 || n3 === n2);

        let digits =  [n1, n2, n3];

        return  digits.join(',');
    }

    checkGuess(guess) {
        let strikes = 0;
        let balls = 0;
        let guessDigits = guess.split(',');
        let secretDigits = this.secretKey.split(',');

        for (let i = 0; i < guessDigits.length; i++) {
            if (guessDigits[i] === secretDigits[i]) {
                strikes++;
            } else if (secretDigits.includes(guessDigits[i])) {
                balls++;
            }
        }
        this.guesses.push({ guess, balls, strikes });
        return { balls, strikes };
    }

    resetGame() {
        this.secretKey = this.generateSecretKey();
        localStorage.setItem('secretKey', this.secretKey); // Store new secret key
        this.guesses = [];
    }
}
