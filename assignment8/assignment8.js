document.addEventListener("DOMContentLoaded", () => {
    const game = new BaseballGame();
    let currentGuess = '';

    const updateGuessDisplay = () => {
        document.getElementById('guess').textContent = currentGuess.split(',').join(',');
    };

    const disableButtons = (disable) => {
        document.querySelectorAll('.digit').forEach(button => {
            button.disabled = disable;
        });
    };

    const enableAllButtons = () => {
        disableButtons(false);
    };

    const disableUsedButtons = () => {
        currentGuess.split(',').forEach(digit => {
            document.querySelectorAll('.digit').forEach(button => {
                if (button.textContent === digit) {
                    button.disabled = true;
                }
            });
        });
    };

    const addGuessToTable = (balls, strikes) => {
        let row = document.createElement('tr');
        row.innerHTML = `<td>${currentGuess.split(',').join(' ')}</td><td>${balls}</td><td>${strikes}</td>`;
        document.getElementById('tbody-stat').appendChild(row);
    };

    const submitGuess = () => {
        if (currentGuess.split(',').length === 3) {
            let { balls, strikes } = game.checkGuess(currentGuess);
            addGuessToTable(balls, strikes);

            if (strikes === 3) {
                alert("Strike out --- \n" +
                'The key was ' +game.secretKey+ '\n' +
                "<New> to play again");
                game.resetGame();
                currentGuess = '';
                updateGuessDisplay();
                document.getElementById('key').textContent = 'Press NEW';
                disableButtons(true);
            } else {
                currentGuess = '';
                updateGuessDisplay();
                enableAllButtons();
            }
        }
    };

    document.querySelectorAll('.digit').forEach(button => {
        button.addEventListener('click', () => {
            if (currentGuess.split(',').length < 3) {
                currentGuess += (currentGuess ? ',' : '') + button.textContent;
                updateGuessDisplay();
                disableUsedButtons();

                if (currentGuess.split(',').length === 3) {
                    submitGuess();
                }
            }
        });
    });

    document.getElementById('new').addEventListener('click', () => {
        game.resetGame();
        currentGuess = '';
        updateGuessDisplay();
        document.getElementById('key').textContent = game.secretKey;
        document.getElementById('tbody-stat').innerHTML = '';
        enableAllButtons();
    });

    // Show secret key on load
    document.getElementById('key').textContent = game.secretKey;
});
