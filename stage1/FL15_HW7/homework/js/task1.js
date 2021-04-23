let deposit =Number(prompt('Enter initial deposit value (initial amount can’t be less than 1000)', 0));
let durationOfDeposit =Math.round(
    Number(prompt('Enter term of deposit number of years can’t be less than 1, can be only integers.', 0)));
let percent = Number(prompt('Enter percent value', 0));




const amountCalculator = (deposit, duration,percent) => {
    const isDepositNan = isNaN(Number(deposit)),
          isDurationNan = isNaN(Number(duration)),
          isPercentNan = isNaN(Number(percent)),
          minValueOfDeposit = 1000,
          minDuration = 1,
          maxPercent = 100,
          numberOfDigitsToRound = 2;
    let balance = deposit,
        totalProfit = 0,
        result;
    
    if (isDepositNan || isDurationNan || isPercentNan
        || deposit < minValueOfDeposit 
        || durationOfDeposit < minDuration 
        || percent > maxPercent) {
          alert('Your input not valid'); 
         return;
        }
        for (let i =0; i<durationOfDeposit; i+=1) {
            let depositIncome = balance * ( percent/maxPercent );
            const roundDepositIncome = Number(depositIncome.toFixed(numberOfDigitsToRound))
            totalProfit = totalProfit + roundDepositIncome;
            balance += roundDepositIncome;
            result = Number(balance.toFixed(numberOfDigitsToRound))
         }
        alert(`Initial amount: ${deposit}
    Number of years: ${duration}
    Percentage of year: ${percent}
    Total profit: ${totalProfit}
    Total amount: ${result}`);
}
amountCalculator(deposit, durationOfDeposit,percent )



