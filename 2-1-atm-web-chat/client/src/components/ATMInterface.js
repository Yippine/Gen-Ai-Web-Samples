import React, { useState, useEffect } from "react";
import { performATMOperation, getBalance } from "../services/api";

const ATMInterface = () => {
    const [balance, setBalance] = useState(null);
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBalance();
    }, []);

    const fetchBalance = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getBalance();
            setBalance(response.balance);
        } catch (error) {
            console.error("Error fetching balance:", error);
            setError("Unable to fetch balance. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleOperation = async (operation) => {
        if (!amount && operation !== "balance") {
            setMessage("Please enter an amount.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await performATMOperation(operation, parseFloat(amount));
            setBalance(response.balance);
            setMessage(response.message);
            setAmount("");
        } catch (error) {
            console.error("Error performing ATM operation:", error);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-lg ml-0 md:ml-4 mt-4 md:mt-0">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">ATM Interface</h2>
            <div className="mb-6">
                <p className="text-xl font-semibold">
                    Current Balance: <span className="text-green-600">${balance ? balance.toFixed(2) : "0.00"}</span>
                </p>
            </div>
            <div className="mb-6">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                    onClick={() => handleOperation("deposit")}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out"
                    disabled={loading}
                >
                    Deposit
                </button>
                <button
                    onClick={() => handleOperation("withdraw")}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out"
                    disabled={loading}
                >
                    Withdraw
                </button>
            </div>
            <button
                onClick={() => handleOperation("balance")}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out"
                disabled={loading}
            >
                Check Balance
            </button>
            {message && <p className="mt-6 text-center text-lg font-semibold text-gray-700">{message}</p>}
            {loading && <p className="mt-4 text-center text-gray-600">Processing...</p>}
        </div>
    );
};

export default ATMInterface;
