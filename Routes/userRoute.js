const express = require("express");
const UserController = require("../Controller/user");
const auth = require("../Authentication/auth");
const router = express.Router();

router.post("/register",UserController.register)
router.post("/login",UserController.login);
router.get('/searchedMember',auth,UserController.searchMember);
router.post('/logout',UserController.logout)

module.exports = router;