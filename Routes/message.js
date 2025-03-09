const express = require("express");
const auth = require("../Authentication/auth");
const router = express.Router();
const MessageController = require('../Controller/message');

router.post('/post-message-chat',auth,MessageController.sendMessage);
router.get('/get-message-chat/:convId',MessageController.getMessage);

module.exports = router;