let balance = 1000; // Initial balance

const processOperation = (aiResponse) => {
    let newBalance = balance;
    let operationResponse = null;

    if (aiResponse.includes("balance")) {
        operationResponse = `Your current balance is $${balance.toFixed(2)}.`;
    } else if (aiResponse.includes("withdraw")) {
        const amount = parseFloat(aiResponse.match(/\d+(\.\d+)?/)[0]);
        console.log(`amount: ${amount}`);
        if (amount <= balance) {
            newBalance -= amount;
            operationResponse = `Withdrawal of $${amount.toFixed(2)} successful. Your new balance is $${newBalance.toFixed(2)}.`;
        } else {
            operationResponse = `Insufficient funds. Your current balance is $${balance.toFixed(2)}.`;
        }
    } else if (aiResponse.includes("deposit")) {
        const amount = parseFloat(aiResponse.match(/\d+(\.\d+)?/)[0]);
        newBalance += amount;
        operationResponse = `Deposit of $${amount.toFixed(2)} successful. Your new balance is $${newBalance.toFixed(2)}.`;
    }

    balance = newBalance;
    return { newBalance, operationResponse };
};

module.exports = { processOperation };
