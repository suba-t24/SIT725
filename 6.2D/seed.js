const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myprojectDB', {});

const ProjectSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  description: String,
});

const Project = mongoose.model('Project', ProjectSchema);

const sampleData = [
  {
        title: "Cookie",
        image: "images/dog2.jpg",
        description: "Hi! Can't wait to lick your face off!"
    },
    {
        title: "Bubble",
        image: "images/dog3.jpg",
        description: "Hello my friend! I know you love evening walks like me!"
    }
];

Project.insertMany(sampleData)
  .then(() => {
    console.log("Sample data inserted");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));