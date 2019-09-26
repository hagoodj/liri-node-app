// require("dotenv").config();

var keys = require("./keys.js");

// var Spotify = require('node-spotify-api');
var axios = require("axios");
// var fs = require('fs');
var inquirer = require('inquirer');
var moment = require("moment");

// var spotify = new Spotify(keys.spotify);

function movieThis(movie) {
    var movieSelected = movie;
    var queryURL = "http://www.omdbapi.com/?t=" + movieSelected + "&y=&plot=short&apikey=trilogy"
    console.log(queryURL);
    axios.get(queryURL).then(
        function (response) {
            if (response.data.Response === "True") {
                console.log("\nTitle: " + response.data.Title + "\n");
                console.log("Year Released: " + response.data.Year + "\n");
                console.log("IMDB Rating: " + response.data.imdbRating + "\n");
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n");
                console.log("Country: " + response.data.Country + "\n");
                console.log("Language: " + response.data.Language + "\n");
                console.log("Plot: " + response.data.Plot + "\n");
                console.log("Actors: " + response.data.Actors + "\n");
                searchSomethingElse()
            } else {
                movieThis("Mr.+Nobody")
                searchSomethingElse()
            }
        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function concertThis(concert) {
    var concertSelected = concert;
    var queryURL = "https://rest.bandsintown.com/artists/" + concertSelected + "/events?app_id=codingbootcamp"
    console.log(queryURL);
    axios.get(queryURL).then(
        function (response) {
            if (response.data.length === 0) {
                console.log(concertSelected + " has no upcoming events.")
                searchSomethingElse()
            } else {
                for (var i = 0; i < response.data.length; i++) {
                    console.log("\nVenue: " + response.data[i].venue.name + "\n");
                    console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].country + "\n");
                    var dateString = response.data[i].datetime.substring(0,10);
                    var momentDate = moment(dateString).format("MM/DD/YYYY");
                    console.log("Date: " + momentDate + "\n")
                }
            }
        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function liriSearch() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What do you want Liri to search?',
                choices: ["movie", "concert", "song", "random"],
                name: 'userchoice'
            }
        ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.userchoice === "movie") {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: 'What movie do you want Liri to search?',
                            name: 'moviechoice'
                        }
                    ])
                    .then(function (inquirerResponse) {
                        var movieChoiceArr = inquirerResponse.moviechoice.split(" ");
                        var movieToSearch = movieChoiceArr.join("+");
                        movieThis(movieToSearch);
                    });
            }
            if (inquirerResponse.userchoice === "concert") {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: 'What concert do you want Liri to search?',
                            name: 'concertchoice'
                        }
                    ])
                    .then(function (inquirerResponse) {
                        var concertChoiceArr = inquirerResponse.concertchoice.split(" ");
                        var concertToSearch = concertChoiceArr.join("+");
                        concertThis(concertToSearch);
                    });
            }
        });

}

function searchSomethingElse() {
    inquirer
        .prompt([
            {
                type: 'confirm',
                message: 'Would you like to search for something else?',
                name: 'searchagain',
                default: true
            }
        ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.searchagain === true) {
                liriSearch();
            }
        })
}

liriSearch();