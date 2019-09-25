require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var axios = require("axios");
var fs = require('fs');
var inquirer = require('inquirer');
var moment = require("moment");

var spotify = new Spotify(keys.spotify);