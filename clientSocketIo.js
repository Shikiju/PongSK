var clientSocketComm = (function () { 
  // Every connection on the server triggers identify...
  var identifiedToServer = false;
  var listOfUsers;
  var socket = io.connect('http://localhost:8888');

  socket.on('ready', function (data) {
    alert('game starting!');
  });

  socket.on('identify', function (data) {
    if (!identifiedToServer) {
      var name = prompt(data.msg, "Harry Potter");
      if (name != null && name != "") {
        socket.emit('set nickname', name, function (data){
          listOfUsers = data;
          console.log(this);
          writePlayerNamesLobby(listOfUsers.player1, listOfUsers.player2);
        });
        // user is now connected.
        identifiedToServer = true;
      }
    }
    else {
      $('#player2name').text('Another user is trying to connect!');
    }
  });

  socket.on('waiting for players', function (msg) {
    alert('waiting for players!');
  });

  this.writePlayerNamesLobby = new function (player1, player2) {
    if (player1 != null) {
      $('#player1name').text(player1);
    }
    if (player2 != null) {
      $('#player1name').text(player2);
    }
  }

})();