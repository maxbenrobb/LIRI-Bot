require("dotenv").config();

var fs = require("fs");

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var request = require("request");
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//var random = require("./random.text")

var input = process.argv[2];

console.log("==================================");

// // Store all of the arguments in an array
var nodeArgs = process.argv;

// // Create an empty variable for holding the movie name
var userRequest = "";

// // Loop through all the words in the node argument
// // And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {

    userRequest = userRequest + "+" + nodeArgs[i];

  }

  else {

    userRequest += nodeArgs[i];

  }
}

if (input === 'do-what-it-says') {
  fs.readFile("./random.text", function(err, f){
    var data = f.toString();
    var randomInput = data.substr(0, data.indexOf(','));
    userRequest = data.substr(data.indexOf(',')+1);
    handleInput(randomInput);
  });
} else {
  handleInput(input);
}

function handleInput(input) {
  switch(input) {
    case `my-tweets`:
      twitter()
      break;
    
    case `spotify-this-song`:
      spotifyCall(userRequest)
      break;

    case `movie-this`:
      omdb()
      break;
    
    // case 'do-what-it-says':
    //   readRandom();
    //   break;

    default:
      console.log("Acceptable commands 'my-tweets,' 'spotify-this-song,' 'movie-this,' and 'do-what-it-says'")
      break;
  }
}

function twitter() {
  var params = {screen_name: 'Max72585298'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (i = 0; i < 20; i++) { 
        console.log(tweets[i].text);        
      }
    }
  });
}

console.log(input);

function spotifyCall(request) {
  //console.log(request)
  spotify.search({ type: 'track', query: request, limit: 1}, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }
    //console.log(data);
    console.log(data.tracks.items[0].album.artists[0].name);
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].album.external_urls);
    console.log(data.tracks.items[0].album.name);
  });
}

function readRandom() {

}

console.log("----------------------------------");

function omdb() {
  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + userRequest + "&apikey=trilogy";

  request(queryUrl, function(error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log(JSON.parse(body));
      var string = JSON.parse(body)
      console.log("Title: " + string.Title);
      console.log("Year: " + string.Year);
      console.log("IMDB Rating: "  + string.imdbRating);
      console.log("Rotten Tomatoes Rating: " + string.Ratings[1].Value);
      console.log("Country of Origin: " + string.Country);
      console.log("Language: " + string.Language);
      console.log("Plot: " + string.Plot);
      console.log("Actors: " + string.Actors);
    }
  });
}

function doit() {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
}