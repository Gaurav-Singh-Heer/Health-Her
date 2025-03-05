
// router.post('/', (req, res) => {
//     console.log('Query Params:', req.query);
//     return res.render('article', { article: req.query.article });
// });


// module.exports = router;

const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    console.log("POST request received at /article");
    console.log("Received article:", req.body.article);

    const article = req.body.article;
    
    if (!article) {
        return res.status(400).send("Article not provided.");
    }

    return res.render('article', { article });
});

module.exports = router;
