let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};
updateScore();
/*if (score === null) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    };
} */

let comp;
function computerMove() {
    const randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        comp = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        comp = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        comp = 'scissors';
    }
    return comp;
}

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(function () {
            const playerMove = computerMove();
            myMove(playerMove);
        }, 1000);
        isAutoPlaying = true;
    }
    else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
    myMove('rock');
});
document.querySelector('.js-paper-button').addEventListener('click', () => {
    myMove('paper');
});
document.querySelector('.js-scissors-button').addEventListener('click', () => {
    myMove('scissors');
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        myMove('rock');
    } else if (event.key === 'p') {
        myMove('paper');
    } else if (event.key === 's') {
        myMove('scissors');
    }
});

function myMove(move) {
    comp = computerMove();
    if (move === 'rock') {
        if (comp === 'rock') {
            result = 'Tie.'
        } else if (comp === 'paper') {
            result = 'You lose.'
        } else {
            result = 'You win.'
        }
    }
    else if (move === 'paper') {
        if (comp === 'rock') {
            result = 'You win.'
        } else if (comp === 'paper') {
            result = 'Tie.'
        } else {
            result = 'You lose.'
        }
    }
    else if (move === 'scissors') {
        if (comp === 'rock') {
            result = 'You lose.'
        } else if (comp === 'paper') {
            result = 'You win.'
        } else {
            result = 'Tie.'
        }
    }
    if (result === 'You win.') {
        score.wins++;
    } else if (result === 'You lose.') {
        score.losses++;
    } else if (result === 'Tie.') {
        score.ties++;
    }
    updateScore();
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML =
        `You
            <img src="emojis/${move}-emoji.png" alt="" class="move-icon">
            <img src="emojis/${comp}-emoji.png" alt="" class="move-icon">
            Computer`;
    localStorage.setItem('score', JSON.stringify(score));
}
function updateScore() {
    document.querySelector('.js-score').innerHTML = `Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`;
}