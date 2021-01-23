
const got = require('got');

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
}

async function getSubredditTopArticles(subreddit) {
    try{
        var resultsObject = await callRedditAPI(subreddit);
    } catch(error) {
        return error;
    }
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
};

async function callRedditAPI(subreddit) {
    try {
        var response = await got('https://www.reddit.com/r/' + subreddit + '/top.json');
        return JSON.parse(response.body);
    }
    catch (error) {
        console.log(error.message);
        throw error.message;
    }
};

module.exports.getSubredditTopArticles = getSubredditTopArticles;