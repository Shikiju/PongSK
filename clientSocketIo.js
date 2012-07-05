this.clientSocketComm = {
  // Every connection on the server triggers identify...
  globalNameSpace: this,
  socket: {},
  identifiedToServer: false,
  listOfUsers : {},
  
  writePlayerNamesLobby: function (player1, player2) {
    if (player1 != null) {
      $('#player1name').text('Player1: ' + player1);
    }
    if (player2 != null) {
      $('#player2name').text('Player2: ' + player2);
    }
  },

  writeNewMessageToChatWindow: function(chatmessage) {
    $('#chatwindow').val($('#chatwindow').val()+ chatmessage + '<br />')
  },

  registerChatButton: function(){
    $("#chatButton").click(function () {
      var chatMessage = $('#chatTextField').val()
      if (chatMessage != '') {
        window.clientSocketComm.socket.emit('msg', chatMessage);
      }
    });
  },

  initialize: function () {
    var socket = io.connect('http://localhost:8888');

    if (socket.socket.connecting == false || socket.socket.connected == false) {
      $('#offlineimage').show(1000);
    }

    this.socket = socket.socket;

    console.log(socket);

    socket.on('ready', function (data) {
      window.clientSocketComm.writeNewMessageToChatWindow('Game Starting ppl!')
    });

    socket.on('identify', function (data) {
      $('#offlineimage').hide(1000);
      if (!this.identifiedToServer) {
        var name = 'koentjuh!';
        if (name != null && name != "") {
          socket.emit('set nickname', name, function (data) {
            listOfUsers = data;
            window.clientSocketComm.writePlayerNamesLobby(listOfUsers.player1, listOfUsers.player2);
            window.clientSocketComm.registerChatButton();
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
      window.clientSocketComm.writeNewMessageToChatWindow('Waiting for players!')
    });
  }
};
  