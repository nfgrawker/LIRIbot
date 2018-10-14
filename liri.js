require("dotenv").config();
const keys  =  require("./keys.js")
const fs = require("fs")
const request = require("request")
const spotify = require("node-spotify-api")

const arg1 = process.argv[2]
let arg2 = process.argv[3]


function concert(){
  let  url = "https://rest.bandsintown.com/artists/"+arg2+"/events?app_id="+keys.keys.bands
  request(url, function (error, response, body) {
  let information = JSON.parse(body)
  console.log(information)
});
}
concert()
