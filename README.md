# Reddit-Web-App

# Frameworks

- NodeJS
    - Used for runtime environment
- Express
    - Middleware used for standing up server and routing functionality
- got
    - Used to make API requests to Reddit's API
- mocha/chai
    - Used for testing


# How to launch and test locally

- Make sure you have NodeJS and npm installed on the machine, they can be downloaded from here: https://nodejs.org/en/ (they are both included in the one download)
- Move into a directory you want to use to hold the project and clone the github repo: git clone https://github.com/AndrewLucia/Reddit-Web-App.git
- Move into the Reddit-Web-App folder, making sure that it is the root folder containing app.js and package-lock.json
- Next run "npm i" (npm install), this should install all dependencies and link all scripts
- To start the server, run npm start. It should be accessible from http://localhost:8080/. (remember to use http and to specify the port)
- The testing script relies on the server being available at http://localhost:8080/ so it can only be run after the server has been stood up.
- In a seperate terminal, while the first is still running the server, navigate back to the Reddit-Web-App folder and run "npm test"

# How it works

    This api only contains two paths: the root path, "/", and the path to obtain the top articles of a subreddit, "/r/name_of_subreddit". If any other path is specified, the api should return a 404 error code. For example, if you want to access the top articles in the "NetSec" subreddit go to http://localhost:8080/r/netsec or https://reddit-web-app.herokuapp.com/r/netsec depending on whether you're accessing it locally or from the Heroku deployment.

    If an existing subreddit containing top articles is specified in the 
    /r/subreddit path, then an ArticleList JSON object is returned. This object only contains one property: "articles". This "articles" property is a list of Article objects that represent a single top article in the subreddit. This list will be empty if the subreddit specified doesn't contain any top articles. The Article object contains 3 fields, title, text, and article. The title field represents the title of the post. The text field represents any text that the user posted in their initial post. And the article field contains any link the user put in their post.

# Sanitization Decision Reasoning

    I made the decision to sanitize the Reddit API response down to only these 3 fields as I felt they were the most important and relevant. The title was chosen so that the reader can identify the post and what it may contain. The user text was chosen because often users post a brief summary to a linked article, or the subreddit posting style only uses user text such as in r/ama. And I chose to leave the article link because in some subreddits, the user's post only contains a link to an article at another website. For example, if you go to r/netsec, you will see that user's only post links to other cybersecurity related news articles on the internet, sometimes with short summaries of what's in the news article. So the "article" field contains those links. If a Reddit user didn't put a link in their post, as in r/ama, then the "article" field simply points to the Reddit URL of that post.

