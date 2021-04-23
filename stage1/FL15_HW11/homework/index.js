const isEquals = (a,b) => a === b;

const isBigger = (a,b) => a > b;

const storeNames = function () {
   return [...arguments]
};

const getDifference = (a, b) => {
    const result = a > b ? a - b: b - a;
    return result
}

const negativeCount = function (arr) {
    const negativeArr = arr.filter(item => item < 0)
    return negativeArr.length
}

const letterCount = function (str1, str2) {
    const transfomStr = str1.split('')
    const filtredArr = transfomStr.filter(item => item.toLowerCase() === str2.toLowerCase())
    return filtredArr.length
}

const countPoints = function (arr) {
    let points = 0;
    const pointsPerWin = 3;
    arr.forEach(item => {
        let gameScore = item.split(':');
        if (Number(gameScore[0]) > Number(gameScore[1])) {
            points += pointsPerWin; 
         }
         if (Number(gameScore[0])=== Number(gameScore[1])) {
             points +=1
         }
    });
    return points
}