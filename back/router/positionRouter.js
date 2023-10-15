const express = require("express");

const { verifyToken } = require("../middlewares/index");
const { isPresident } = require("../middlewares/position");

const { roleChange, userGet } = require("../controllers/position");

const router = express.Router();

router.get("/presidentPage", verifyToken, isPresident, userGet);

router.post("/roleChange", verifyToken, isPresident, roleChange);

module.exports = router;
