require("dotenv").config();
const keys  =  require("./keys.js")
const fs = require("fs")
const request = require("request")
const spotify = require("node-spotify-api")
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
else(){
  console.log("did not understand your command")
}
