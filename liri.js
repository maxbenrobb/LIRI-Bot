require("dotenv").config();

var fs = require("fs");

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var request = require("request");
var keys = require("./keys.js");
//Why?
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var input = process.argv[2];

console.log(spotify);

var params = {screen_name: 'Max72585298'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets[0].text);
  }

});

console.log(input);