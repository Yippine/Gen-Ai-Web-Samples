const Account = require("../models/Account");

exports.performOperation = async (operation, amount) => {
    try {
        let account = await Account.findOne({ accountId: "demo" });
        if (!account) {
            throw new Error("Demo account not found");
        }

        switch (operation) {
            case "deposit":
                account.balance += amount;
                break;
            case "withdraw":
                if (account.balance >= amount) {
                    account.balance -= amount;
                } else {
                    return { balance: account.balance, message: "Insufficient funds" };
                }
                break;
            case "balance":
                return { balance: account.balance, message: `Current balance: $${account.balance.toFixed(2)}` };
            default:
                throw new Error("Invalid operation");
        }

        await account.save();
        return {
            balance: account.balance,
            message: `${operation.charAt(0).toUpperCase() + operation.slice(1)}ed $${amount.toFixed(2)}. New balance: $${account.balance.toFixed(2)}`,
        };
    } catch (error) {
        console.error("Error performing ATM operation:", error);
        throw error;
    }
};
