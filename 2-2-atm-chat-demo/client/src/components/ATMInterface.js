import React from "react";

const ATMInterface = ({ balance }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">ATM Interface</h2>
            <div className="mb-4">
                <p className="text-lg">Current Balance:</p>
                <p className="text-3xl font-bold text-green-600">${balance.toFixed(2)}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">Withdraw</button>
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">Deposit</button>
                <button className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-200">Transfer</button>
                <button className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition duration-200">Statement</button>
            </div>
        </div>
    );
};

export default ATMInterface;
