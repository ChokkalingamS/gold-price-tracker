const express = require('express');
const { price } = require('../../controllers/price.controller');

const router = express.Router();

router.get('/',price)


module.exports = router;
