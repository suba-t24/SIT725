const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myprojectDB', {});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB!');
});

const ProjectSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String,
});
const Project = mongoose.model('Project', ProjectSchema);

async function getPetList(){
    const projects = await Project.find({});
    return projects;
}; 

module.exports = {
    getPetList
};