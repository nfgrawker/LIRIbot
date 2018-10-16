require("dotenv").config();
const keys  =  require("./keys.js")
const fs = require("fs")
const request = require("request")
const Spotify = require("node-spotify-api")
const moment = require("moment")

let arg1 = process.argv[2]
let arg2 = process.argv[3]


function concert(){
  let  url = "https://rest.bandsintown.com/artists/"+arg2+"/events?app_id="+keys.keys.bands
  request(url, function (error, response, body) {
  fs.appendFile("log.txt", `Command :${arg1}  Band Title :${arg2}`,function(){})
  let information = JSON.parse(body)
  for (i in information){
    var time = moment(information[i].datetime,"YYYY-MM-DDTHH:mm:ss").format("MM-DD-YYYY")
    var write =
`
Venue Name : ${information[i].venue.name}
Location : ${information[i].venue.city}, ${information[i].venue.country}
Date : ${time}
---------------
`
console.log(write)
fs.appendFile("log.txt",write, function(){})
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
    let write =
`
Artist(s) : ${artists}
Song Name : ${data.tracks.items[0].name}
Album : ${data.tracks.items[0].album.name}
Preview URL : ${data.tracks.items[0].external_urls.spotify}
-----------------
`
console.log(write)
fs.appendFile("log.txt", `Command :${arg1}    Song Title :${arg2}`,function(){})
fs.appendFile("log.txt",write, function(){})
  })
}
function movie(){
  let  url = "http://www.omdbapi.com/?t="+arg2+"&apikey="+ keys.keys.movies
  request(url, function (error, response, body) {
    rotten = "None Found"
    imdb = "None Found"
    if (error){
      console.log(error)
    }
    else {
      let information = JSON.parse(body)
      if(information.Ratings[1]){
        rotten = information.Ratings[1].Value
      }
      if(information.Ratings[0]){
        imdb = information.Ratings[0].Value
      }
      var data = (
`
Movie Title : ${information.Title}
Year Released : ${information.Year}
IMDB Rating : ${imdb}
Rotten Tomatoes Rating : ${rotten}
Country : ${information.Country}
Language : ${information.Language}
Plot : ${information.Plot}
Actors : ${information.Actors}
-----------
`
)
  console.log(data)
  fs.appendFile("log.txt", `Command :${arg1}   Movie Title :${arg2}`,function(){})
  fs.appendFile("log.txt",data, function(){})
}
})
}


function text(){
  fs.readFile('random.txt', 'utf8',(err, data) => {
  if (err) throw err;
  console.log(data);
  array = data.split(",")
  arg1 = array[0]
  arg2 = array[1]
  start()
})
}

function start(){
  if(arg1 == "concert-this"){
    concert()
  }
  else if (arg1 == "spotify-this-song"){
    spotifySearch()
  }
  else if (arg1 == "movie-this") {
    movie()
  }
  else if (arg1 == "do-what-it-says") {
    text()
  }
  else{
    console.log("did not understand your command")
  }
}
start()
