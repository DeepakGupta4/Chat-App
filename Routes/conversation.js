const express = require('express');
const router = express.Router();
const auth = require('../Authentication/auth');
const conversationRouteController = require('../Controller/conversation');

router.post('/add-conversation',auth,conversationRouteController.addConversation)
router.get('/get-conversation',auth,conversationRouteController.getConversation)



module.exports = router;