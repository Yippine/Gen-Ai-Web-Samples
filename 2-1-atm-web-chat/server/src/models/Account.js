const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
    accountId: {
        type: String,
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
    },
});

module.exports = mongoose.model("Account", AccountSchema);
