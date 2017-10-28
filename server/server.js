const express = require('express')
    , bodyParser = require('body-parser')
    , path = require('path')
    , app = express()
    , http = require('http').Server(app)
    , io = require('socket.io')(http)
    , port = 3101;

// app.get('/', (req, res) => {
//   console.log(path.join(__dirname, '/index.html'));
//   res.sendFile(path.join(__dirname, '/index.html'));
// });

io.on('connection', socket => {
  console.log('User connected. User ID:', socket.id);
  
  socket.on('new message', message => {
    console.log('New message coming in', message);
    io.emit('all messages', message);
  });
  
  socket.on('disconnect', _ => { console.log('User disconnected.'); });
});

http.listen(port, _ => console.log(`Listening on ${port}.`));