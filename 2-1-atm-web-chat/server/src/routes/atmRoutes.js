const express = require("express");
const router = express.Router();
const atmController = require("../controllers/atmController");
const auth = require("../middleware/auth");

router.post("/", auth, atmController.performOperation);
router.get("/balance", auth, atmController.getBalance);

module.exports = router;
