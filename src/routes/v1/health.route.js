// in src/routes/v1/health.route.js
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send({ status: 'ok', uptime: process.uptime() });
});

module.exports = router;