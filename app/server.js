
var express = require('express');
var app = express();
var router = express.Router();
var server = require('http').createServer(app);
 
//port: Heroku || AppFog || 3000
var port = process.env.PORT || process.env.VMC_APP_PORT || 3000;
server.listen(port);
console.log("server start OK! on port 3000");
app.use(express.static(__dirname + '/public'));