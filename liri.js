//add code to read and set enviroment variables for dotenv package
require("dotenv").config();

var inputString = process.argv;

var command = inputString[2];
var titleInput = inputString[3];
var Twitter = require("twitter");

//code required to import keys.js file and store it in a variable
var keys = require("./keys.js");
//access the keys information
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var params = {
	screen_name: realRobinb242,
	count: 20
}

var request =require("request");
var fs = require("fs");

switch (command) {
	case "my-tweets":
		myTweets();
		break;
	case "spotify-this-song":
		spotifyThis(value);
		break;
	case "movie-this":
		omdbThis(value);
		break;
	case "do-what-it-says":
		doWhatItSays();
		break;
	default:
    console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
  	break;
}
//make it so liri can take in the following commands 

//this command will show your last 20 tweets
//"my-tweets"
function myTweets() {
	client.get("statuses/user_timeline", params, function(error,tweets,response){
		if(error) throw error;

			console.log("Last 20 tweets");
			for (i-0; i< tweets.length; i++) {
				var number = i + 1;
				console.log(" ");
				console.log([i + 1] + "." + tweets[i].text);
				console.log("Created on " + tweets.created_at);
			}
		
	}
}
// will display the Artist, Song's Name, preview link of the song from spotify
//and the Album the song is from. If no song will default to "The Sign" by Ace of Bass
//"spotify-this-song"
function spotifyThis(value) {
	if (value == null){
		value = "The Sign"
	}
	request('https://api.spotify.com/v1/search?q=' + value + '&type=track', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            jsonBody = JSON.parse(body);
            console.log(' ');
            console.log('Artist: ' + jsonBody.tracks.items[0].artists[0].name);
            console.log('Song: ' + jsonBody.tracks.items[0].name);
            console.log('Preview Link: ' + jsonBody.tracks.items[0].preview_url);
            console.log('Album: ' + jsonBody.tracks.items[0].album.name);
            console.log(' ');
            
                if (error) throw error;
            };
        }
    });
} // end spotifyThis function

// will output title, year released, IMDB ratinng, Rotten Tomotoes Rating, Country Produced, Language
//plot, actors. If no movie, return results for "Mr Nobody"
//If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
// It's on Netflix!
//"movie-this"
function omdbThis(value) {
    if (value == null) {
        value = 'wargames';
    }
    request('http://www.omdbapi.com/?t=' + value + '&tomatoes=true&r=json', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            jsonBody = JSON.parse(body);
            console.log(' ');
            console.log('Title: ' + jsonBody.Title);
            console.log('Year: ' + jsonBody.Year);
            console.log('IMDb Rating: ' + jsonBody.imdbRating);
            console.log('Country: ' + jsonBody.Country);
            console.log('Language: ' + jsonBody.Language);
            console.log('Plot: ' + jsonBody.Plot);
            console.log('Actors: ' + jsonBody.Actors);
            console.log('Rotten Tomatoes Rating: ' + jsonBody.tomatoRating);
            console.log('Rotten Tomatoes URL: ' + jsonBody.tomatoURL);
            console.log(' ');
            fs.appendFile('log.txt', ('=============== LOG ENTRY BEGIN ===============\r\n' + Date() + '\r\n \r\nTERMINAL COMMANDS: ' + process.argv + '\r\nDATA OUTPUT:\r\n' + 'Title: ' + jsonBody.Title + '\r\nYear: ' + jsonBody.Year + '\r\nIMDb Rating: ' + jsonBody.imdbRating + '\r\nCountry: ' + jsonBody.Country + '\r\nLanguage: ' + jsonBody.Language + '\r\nPlot: ' + jsonBody.Plot + '\r\nActors: ' + jsonBody.Actors + '\r\nRotten Tomatoes Rating: ' + jsonBody.tomatoRating + '\r\nRotten Tomatoes URL: ' + jsonBody.tomatoURL + '\r\n =============== LOG ENTRY END ===============\r\n \r\n'), function(err) {
                if (err) throw err;
            });
        }
    });
} //end omdbThis function

//usinng the fs node package Liri will take the text inside of random.txt and use it to 
//call one of Liri's commands
//"do-what-it-says"
function random() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        } else {
            var dataArr = data.split(',');
            if (dataArr[0] === 'spotify') {
                spotifyThis(dataArr[1]);
            }
            if (dataArr[0] === 'omdb') {
                omdbThis(dataArr[1]);
            }
        }
    });
} // end doWhatItSays function


