const express = require('express');
const isAuthenticated = require('../middleware/isAuthenticated');
const router = express.Router();

router.get('/learn', isAuthenticated, (req, res, next) => {
	return res.render('learn');
});

module.exports = router;
