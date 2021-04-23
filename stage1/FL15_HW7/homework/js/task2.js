const two = 2,
      three = 3,
      enlargementRatio = 4,
      startValue = 8;

let maxValue = 8,
    minValue = 0,
    firstPrize = 100,
    secondPrize = 50,
    thirdPrize = 25,
    totalPrize = 0,
    numberOfTryes = 3;

const possibleRewards = () => {
    if(numberOfTryes === three) {
        return firstPrize;
    }
    if(numberOfTryes === two) {
        return secondPrize;
    }
    if(numberOfTryes === 1) {
        return thirdPrize;
    }
    return
  }

function messageGenerator () {
 const message = parseInt(prompt(`Choose a roulette pocket number from ${minValue} to ${maxValue}
    Attempts left: ${numberOfTryes}
    Total prize: ${totalPrize}
    Possible prize of current attempt: ${possibleRewards()}`))
    return message;
}

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
let currentNumber = randomNumber(minValue, maxValue)



const resumeGameHandler = () => {
    firstPrize *= two;
    secondPrize *= two;
    thirdPrize *= two;
    numberOfTryes = three;
    maxValue += enlargementRatio;
    currentNumber = randomNumber(minValue, maxValue);
    casino(messageGenerator())
}

const casino = (num) => {
    if (isNaN(num)) {
        alert(`You entered wrong value(only numbers), you win ${totalPrize}`);
        runGame()
        return;
    }

    if (num !== currentNumber) {
    numberOfTryes -= 1;

        if (numberOfTryes === 0) {
            alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
            runGame();
            return;
        }
        possibleRewards()
        casino(messageGenerator())
    }
    if (num === currentNumber) {
        totalPrize += possibleRewards();
        const resumeGame = confirm(`Congratulation, you won! Your prize is: ${totalPrize}$. Do you want to continue?`)
        if (!resumeGame) {
          alert(`Thank you for your participation. Your prize is: ${totalPrize}$`)
          const resumeGame = confirm(`Congratulation, you won! Your prize is: ${totalPrize}$. Do you want to continue?`)
            if (resumeGame) {
                resumeGameHandler()
            }
            return;
        }
        resumeGameHandler()
    }
}
const runGame = () => {
const startGame = confirm('Do you want to play a game?');
    if (!startGame) {
        alert('You did not become a billionaire, but can.')
        return;
    } 
    numberOfTryes = three;
    totalPrize = 0;
    maxValue = startValue;
    casino(messageGenerator())
}
runGame()