var express = require("express")
const path = require('path'); // Make sure to include this
var app = express()
var port = process.env.port || 3003;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// GET endpoint to calculate the square of a number
// Example: http://localhost:3000/square?num=5
app.get('/square', (req, res) => {
  const num = parseFloat(req.query.num);
  
  if (isNaN(num)) {
    return res.send("Error: Please provide a valid number using query parameter 'num'.");
  }
  
  const square = num * num;
  res.send(`The square of ${num} is: ${square}`);
});

app.use(express.json());
// GET endpoint to calculate the square of a number
// Example: http://localhost:3000/sum?num1=5&num2=8
app.post('/sum', (req, res) => {
    const { num1, num2 } = req.body;
    const sum = parseFloat(num1) + parseFloat(num2);
    res.json({ sum });  // Send the sum as a JSON response
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});