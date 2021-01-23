const express = require('express');
const controller = require('./controller')

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

router.get('/r/:subreddit', controller.getSubreddit);

router.get('/*', (req, res) => {
    res.status(404).json({ message: 'Page Not Found' });
})

module.exports = router;