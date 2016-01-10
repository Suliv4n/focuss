var socket = io.connect('http://localhost:3000');
socket.connect();

socket.emit('hello', {host: window.location.host});

var links = document.getElementsByTagName('link');
var files = {};


for(i=0; i<links.length; i++){
  var parser = document.createElement('a');
  parser.href = links[i].href;
  
  files[parser.pathname] = links[i];
}


socket.on('changed', function(data){
  if(files[data.file] != undefined){
    var link = files[data.file];
    link.href = data.file + '?' + new Date().getTime();
	
    console.log(link);
  }
});