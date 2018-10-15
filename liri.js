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
    let write =
`
Artist(s) : ${artists}
Song Name : ${data.tracks.items[0].name}
Album : ${data.tracks.items[0].album.name}
Preview URL : ${data.tracks.items[0].external_urls.spotify}
-----------------
`
fs.appendFile("log.txt", `Command :${arg1}---    Movie Title :${arg2}`,function(){console.log("logged")})
fs.appendFile("log.txt",write, function(){console.log("appended")})
  })
}
function movie(){
  let  url = "http://www.omdbapi.com/?t="+arg2+"&apikey="+ keys.keys.movies
  request(url, function (error, response, body) {
    if (error){
      console.log(error)
    }
    else {
      let information = JSON.parse(body)
      if(!information.Ratings[1]){
      information.Ratings.push({Value:"None Found"})
    }
      var data = (
`
Movie Title : ${information.Title}
Year Released : ${information.Year}
IMDB Rating : ${information.Ratings[0].Value}
Rotten Tomatoes Rating : ${information.Ratings[1].Value}
Country : ${information.Country}
Language : ${information.Language}
Plot : ${information.Plot}
Actors : ${information.Actors}
-----------
`
)
  console.log(data)
  fs.appendFile("log.txt", `Command :${arg1}---    Movie Title :${arg2}`,function(){console.log("logged")})
  fs.appendFile("log.txt",data, function(){console.log("appended")})
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
