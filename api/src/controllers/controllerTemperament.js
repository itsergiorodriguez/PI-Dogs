const axios= require ("axios");
const { Temperament } = require("../db");
const { API_KEY } = process.env;

//📍 GET | /temperament/
const getAllTemperaments = async () => {
  const allData = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  try {
    let everyTemperament = allData.data
      .map((dog) => 
      (dog.temperament 
        ? dog.temperament 
        : "No info"
        ))
      .map((dog) => dog?.split(", "))
      .flat();

    let eachTemperament = [...new Set(everyTemperament)];

    eachTemperament.sort((a, b) => a.localeCompare(b));

    await Promise.all(
      eachTemperament.map(async (el) => {
        if (el) {
          const existingTemp = await Temperament.findOne({
            where: { name: el },
          });
          if (!existingTemp) {
            await Temperament.create({ name: el });
          }
        }
      })
    );

    eachTemperament = await Temperament.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      order: [['name', 'ASC']]
    });

    return eachTemperament;
    
  } catch (error) {
    throw new Error(error.message);
  }
};


module.exports = {
  getAllTemperaments,
};