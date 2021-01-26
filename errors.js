
class APIError extends Error {
    message = "Sorry, there was an error with the Reddit api.";
};

class BaseError extends Error {
    message = "Sorry, an error occured.";
}


module.exports = {APIError, BaseError};