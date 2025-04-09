var express = require("express")
var app = express()
var port = process.env.port || 3000;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Import route file
const petsRoute = require('./routes/pets')
// Mount the route at /api/projects
app.use('/api/pets',petsRoute)

app.listen(port, () => {
    console.log("App listening to: " + port)
})