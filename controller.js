const { response } = require('express');
const model = require('./model')

exports.getSubreddit = (req, res) => {
    var subreddit = req.params.subreddit;

    (async () => {
        try {
            var result = await model.getSubredditTopArticles(subreddit);
            res.send(result);
        } catch(error) {
            console.log(error);
        }
    })();
};