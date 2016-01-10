var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

var config = require('./config');



app.get('/focuss_client.js', function(req, res){
  res.sendFile(__dirname + '/focuss_client.js');
});

io.on('connection', function(socket){
	socket.data = {};
	socket.on('hello', function(data){
		
		console.log('Hello from ' + data.host);
		console.log('Loading configurations for ' + data.host + " :");
		var conf = config.config[data.host];
		socket.data.stylesheets = {};
		
		for(file in conf.focuss){
			
			socket.data.stylesheets[file] = conf.focuss[file];
			console.log(file + ' => ' + conf.focuss[file]);
			
			fs.access(file, fs.R_OK, function(err){
				console.log(err ? ('ERROR => can\'t access to file : ' + file) : '');
			});
			
			fs.watch(file, function(curr, prev){
				console.log('Detect file changed');
				socket.emit('changed', {file : socket.data.stylesheets[file]});
			});
		}

		console.log('Configuration is now loaded !');
	});
});

http.listen(3000, function(){
  console.log('Focuss is ready *:3000');
});