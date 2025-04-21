var express = require("express")
var app = express()
var port = process.env.port || 3000;

const http = require('http').createServer(app); // Create HTTP server from app
const io = require('socket.io')(http);          // Pass http server to socket.io

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Socket connection logic
io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
    let count = 0;
    let notification = ["Joy got a home","Pixie has a new friend now!","Are you ready to meet your new family member today?","Give them a new home today!"]
    // Emit a random number every second
    setInterval(() => {
      socket.emit('notify', notification[count]);
      count++;
      if(count==notification.length){
        count = 0;
      }
    }, 5000);
  });

//Import route file
const petsRoute = require('./routes/pets')
// Mount the route at /api/projects
app.use('/api/pets',petsRoute)

// app.listen(port, () => {
//     console.log("App listening to: " + port)
// })

// Start server
http.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });