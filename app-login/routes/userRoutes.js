const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/register',UserController.createSelf);
router.put('/me', UserController.updateSelf);
router.delete('/me', UserController.deleteSelf);

module.exports = router;
