const express = require('express');
const apiController = require('../controllers/apiContoller');
const router = express.Router();


router.post('/blacklist', apiController.blacklist);


module.exports = router;
