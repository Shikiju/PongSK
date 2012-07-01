// Every connection on the server triggers identify...
var identifiedToServer = false;
var socket = io.connect('http://localhost:8888');

socket.on('ready', function (data) {
  alert('game started!');
  socket.emit('msg', player1);
});

socket.on('identify', function (data) {
  if (!identifiedToServer) {
    var name = prompt(data.msg, "Harry Potter");
    if (name != null && name != "") {
      socket.emit('set nickname', name);
      // user is now connected.
      identifiedToServer = true;
    }
  }
  else {
    console.log('Another user is trying to connect!')
  }
});

socket.on('waiting for players', function (msg) {
  alert('waiting for players!');
})