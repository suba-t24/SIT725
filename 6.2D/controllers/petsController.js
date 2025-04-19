// Import the service
const petService = require('../services/petService');

// Controller uses the service to get data
exports.getAllPets = async (req, res) => {
  const items = await petService.getPetList();
  console.log("Items:",items);
  res.json({
    statusCode: 200,
    data: items,
    message: 'Success'
  });
};