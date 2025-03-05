const express = require('express');
const isAuthenticated = require('../middleware/isAuthenticated');
const userRouter = require('./user');
const learn = require('./learn');
const mealPlanRouter = require('./mealPlan');
const fitnessRouter = require('./fitness');
const articleRouter = require('./article');
const periodTrackerRouter = require('./periodTracker');

const router = express.Router();

router.get('/', (req, res, next) => {
	if (req.user) {
		return res.redirect('/dashboard');
	}
	return res.render('index');
});

router.get('/dashboard', isAuthenticated, (req, res, next) => {
	return res.render('dashboard');
});

// Register all routes

// const article = (req, res) => {
// 	res.render("article", { article: req.query.article }); // Ensure `article` is provided
// };

// router.use(articleRouter); // Instead of defining it inline
router.use('/article', articleRouter);


router.use('/user', userRouter);
router.use('/meal', mealPlanRouter);
// router.use('/learn', learn);
router.use(learn); // Instead of `router.use('/learn', learn);`
router.use('/fitness', fitnessRouter);
router.use('/period-tracking', periodTrackerRouter);

// Not found route (404)
router.use('*', (req, res, next) => {
	return res.render('404.ejs');
});

// Handling 500
router.use(function (err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	console.log(err);
	res.status(err.status || 500);
	return res.render('error');
});

module.exports = router;
