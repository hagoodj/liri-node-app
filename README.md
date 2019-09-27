# Liri Node App

## Summary
This is my trivia game created using javascript and jquery. This browser presents the user with five questions with four answer choices each at the start of the game. Once the game has ended, it displays the user's results and gives the option to restart the game. 

## Functionality Videos
![Site](./assets/images/giphy-webpage.JPG)

## Technologies Used 
- HTML - Used to create elements on the DOM
- JS - Used to manipulate content on HTML
- JQuery - JavaScript library used for DOM manipulation
- AJAX - Used to update webpage asynchronously through outside web server data exchange
- Git - Version control system to track changes to source code
- Github - Hosts repository that can be deployed to GitHub pages

## Code Snippet
The following code shows the method of retreiving data from an api using AJAX. This method allows the response from AJAX to be stored and used locally.
```js
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=wslWpWhssAgYDK6zVXacBDsacT47flr4&limit=10&q=";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
    var results = response.data;
}
```

## Author Links
https://github.com/hagoodj