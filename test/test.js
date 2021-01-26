var chai = require('chai');
const { HTTPError } = require('got');
var got = require('got');

describe("Reddit API", function() {
    describe("Requesting subreddits", function() {
        var baseurl = "http://localhost:8080/";         //url of running server
        var existing = "r/netsec";                      //normal subreddit
        var private = "r/100";                          //private subreddit, reddit api throws 403
        var empty = "r/asjndjs";                        //subreddit doesn't exist, but reddit api doesn't throw 404
        var empty2 = "r/101";                           //subreddit exists but is empty
        var nonexistent = "r/habsdasbdjashbdjsadbsad";  //subreddit doesn't exist and reddit api throws 404

        it("returns atleast 1 top article given an appropriate subreddit", function(done) {
            got(baseurl + existing).then((response)=>{
              chai.expect(JSON.parse(response.body)).has.property('articles').which.is.not.empty;
              done();
            }).catch(done);
        });
        it("returns an APIError if there was a problem with Reddit API: private subreddit", function(done) {
          got(baseurl + private).then((response)=>{
            chai.expect(response.body).to.deep.equal("Sorry, there was an error with the Reddit api.");
            done();
          }).catch(done);
        });
        it("returns an APIError if there was a problem with Reddit API: subreddit doesn't exist", function(done) {
          got(baseurl + nonexistent).then((response)=>{
            chai.expect(response.body).to.deep.equal("Sorry, there was an error with the Reddit api.");
            done();
          }).catch(done);
        });
        it("returns an empty list if the subreddit doesn't exist but Reddit API doesn't error", function(done) {
          got(baseurl + empty).then((response)=>{
            chai.expect(JSON.parse(response.body)).has.property('articles').which.is.empty;
            done();
          }).catch(done);
        });
        it("returns an empty list if the subreddit exists but has no top posts", function(done) {
          got(baseurl + empty2).then((response)=>{
            chai.expect(JSON.parse(response.body)).has.property('articles').which.is.empty;
            done();
          }).catch(done);
        });
        
    });

    describe("Requesting any other paths", function() {
        var baseurl = "http://localhost:8080/"; 
        it("returns a json connected message for root path", function(done) {
            got(baseurl).then((response)=>{
              chai.expect(JSON.parse(response.body)).to.deep.equal({"message":"Connected!"});
              done();
            }).catch(done);
        });
        it("returns a 404 when requesting any path that's not implemented", function(done) {
          got(baseurl + "notimplemented").catch(error => {
            chai.expect(error).to.be.instanceOf(got.HTTPError);
            chai.expect(error.response.statusCode).to.equal(404);
            done();
          });
      });
    });
});