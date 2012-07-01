window.Calth = function() {
	var clear = function(){
	  ctx.fillStyle = '#d0e7f9';
	  ctx.beginPath();
	  ctx.rect(0, 0, c.width, c.height);  
	  ctx.closePath();
	  ctx.fill();
	}
	
	var createPeddles =  function(P1, P2) {
	  ctx.fillStyle = 'black';
	  ctx.fillRect(P1.pos.x,P1.pos.y,P1.paddle.width,P2.paddle.height);
	  ctx.fillRect(P2.pos.x,P2.pos.y,P2.paddle.width,P2.paddle.height);
	}
	//canvas itself 
	var c = document.getElementById('c');

	//and two-dimensional graphic context of the
	//canvas, the only one supported by all 
	//browsers for now
	var ctx = c.getContext('2d');

	//setting canvas size 
	c.width = 800;
	c.height = 600;
	
	mousepos = { x: 0, y: 0 };
	
	document.onmousemove = function(e){
		mousepos.x = e.pageX;
		mousepos.y = e.pageY;
	}
	
	var player1 = {pos: {x: 0, y: 0}, name: 'Harry', paddle: {height: 100, width: 25}};
	var player2 = {pos: {x: 775, y: 0}, name: 'Karel', paddle: {height: 100, width: 25}};

	var setPositions = function(enemyPlayer){
		player2.pos.y = enemyPlayer.pos.y
	}
	
	var GameLoop = function(){
	  clear();
	  if(player1.pos.y + player1.paddle.height < c.height && player1.pos.y+(player1.paddle.height/2) < mousepos.y ){
	    player1.pos.y += 2;
	  }
	  if(player1.pos.y -2 > 0 && player1.pos.y+(player1.paddle.height/2) > mousepos.y ){
	    player1.pos.y -= 2;
	  }
	  createPeddles(player1, player2);
	  gLoop = setTimeout(GameLoop, 1000 / 50);
	}

	var identifiedToServer = false;
	var socket = io.connect('http://localhost:8888');
	socket.on('identify', function (data) {
	  var name = prompt(data.msg, "Harry Potter");
	  if (name != null && name != "") {
	    socket.emit('set nickname', name);
	  }
	});

	socket.on('waiting on players', function (msg) {
	  alert('waiting for players!');
	})

	socket.on('ready', function (data) {
	  alert('game started!');
	  socket.emit('msg', player1);
	});

	GameLoop();
 }
this.Calth();