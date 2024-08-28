const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/default.json");
const chatRoutes = require("./routes/chatRoutes");
const atmRoutes = require("./routes/atmRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB connected");
        initializeDatabase();
    })
    .catch((err) => console.error("MongoDB connection error:", err));

async function initializeDatabase() {
    const Account = require("./models/Account");
    try {
        const demoAccount = await Account.findOne({ accountId: "demo" });
        if (!demoAccount) {
            await Account.create({ accountId: "demo", balance: 1000 });
            console.log("Demo account initialized");
        }
    } catch (error) {
        console.error("Error initializing database:", error);
    }
}

app.use("/api/chat", chatRoutes);
app.use("/api/atm", atmRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
