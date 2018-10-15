require("dotenv").config();
const keys  =  require("./keys.js")
const fs = require("fs")
const request = require("request")
const Spotify = require("node-spotify-api")
const moment = require("moment")

const arg1 = process.argv[2]
let arg2 = process.argv[3]


function concert(){
  let  url = "https://rest.bandsintown.com/artists/"+arg2+"/events?app_id="+keys.keys.bands
  request(url, function (error, response, body) {
  let information = JSON.parse(body)
  for (i in information){
    var time = moment(information[i].datetime,"YYYY-MM-DDTHH:mm:ss").format("MM-DD-YYYY")
    console.log("Venue Name: ",information[i].venue.name)
    console.log("Location: ",information[i].venue.city,", ",information[i].venue.country)
    console.log("Date: ",time)
    console.log("----------------------")
    }
  });
}
function spotifySearch(){
  var song = arg2
  var artists = ""
  var spotify = new Spotify({
  id: keys.keys.id,
  secret: keys.keys.secret
  });
  spotify.search({ type: 'track', query: song }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
    }
    for (i in data.tracks.items[0].artists){
      artists += data.tracks.items[0].artists[i].name
      if (i > 0 ){
        artists += ", "
      }
    }
    console.log("Artist(s) : ",artists)
    console.log("Song Name : ",data.tracks.items[0].name)
    console.log("Album : ", data.tracks.items[0].album.name)
    console.log("Preview URL : ", data.tracks.items[0].external_urls.spotify)
  })
}
function movie(){
  let  url = "http://www.omdbapi.com/?t="+arg2+"&apikey="+ keys.keys.movies
  console.log(keys.keys.movies)
  request(url, function (error, response, body) {
  let information = JSON.parse(body)
  console.log("Movie Title : ",information.Title)
  console.log("Year Released ; ",information.Year)
  console.log("IMDB Rating : ", information.Ratings[0].Value)
  console.log("Rotten Tomatoes Rating : ",information.Ratings[1].Value)
  console.log("Country : ", information.Country)
  console.log("Language : ", information.Language)
  console.log("Plot : ", information.Plot)
  console.log("Actors : ",information.Actors)
})
}

if(arg1 == "concert-this"){
  concert()
}
else if (arg1 == "spotify-this-song"){
  spotifySearch()
}
else if (arg1 == "movie-this") {
  movie()
}
else if (arg1 = "do-what-it-says") {
  text()
}
else{
  console.log("did not understand your command")
}
