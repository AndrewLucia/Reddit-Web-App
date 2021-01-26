
const got = require('got');
const err = require('./errors');

class Response {
    error;
    response;
    constructor(error, response) {
        this.error = error;
        this.response = response;
    }
}

class Article {
    title;
    text;
    article;

    constructor(title, text, article) {
        this.title = title;
        this.text = text;
        this.article = article;
    }
};

class ArticleList {
    articles;

    constructor() {
        this.articles = [];
    }

    addArticle(article) {
        this.articles.push(article);
    }
};

async function getSubredditTopArticles(subreddit) {
    var resultsObject = await callRedditAPI(subreddit);
    if (resultsObject.error != null) {
        return resultsObject.error.message;
    }

    try {
        var resultsList = resultsObject.data.children;
        var articleList = new ArticleList();
        for (var post of resultsList) {
            var data = post.data;
            var text = data.selftext;
            var title = data.title;
            var article = data.url;
            var sanitizedArticle = new Article(title, text, article);

            articleList.addArticle(sanitizedArticle);
        }

        return JSON.stringify(articleList);
    } catch(error) {
        console.log(error);
        return new err.BaseError().message;
    }
};

async function callRedditAPI(subreddit) {
    try {
        var response = await got('https://www.reddit.com/r/' + subreddit + '/top.json');
        return JSON.parse(response.body);
    }
    catch (error) {
        if (error instanceof SyntaxError) {
            console.log(error.message);
            return new Response(new err.BaseError(), null);
        }
        console.log(error.message);
        return new Response(new err.APIError(), null);
    }
};

module.exports.getSubredditTopArticles = getSubredditTopArticles;