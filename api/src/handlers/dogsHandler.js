const { 
    getAllDogs,
    getDogsName,
    getDogById,
    postDog,
  } = require('../controllers/controllerDog');
  
  
  //GET | /dogs
  const getDogsHandler = async (req, res) => {
    const { name } = req.query;
    try {
      if (!name) {
        let result = await getAllDogs();
        return res.status(200).json(result);
      } else {
        let result = await getDogsName(name);
        return res.status(200).json(result);
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  
  
  //GET | /dogs --> de la base de datos
  const getDogsByIdHandler = async (req, res) => {
    const { id } = req.params;
    let origin = isNaN(id) ? "db" : "api";
    try {
      let result = await getDogById(id, origin);
      if (result.length === 0) throw Error("No se encontro Raza")
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  //GET | /dogs/name?="..."
  const getDogsByNameHandler = async (req, res) => {
    const { name } = req.query;
    try {
      let result = await getDogsName(name);
      if (result.length) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json({ message: 'No se encontraron razas de perros con el nombre.' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  
  //POST | /dogs
  const createNewDogHandler = async (req, res) => {
    let payload = req.body;
    try {
      const newDog = await postDog(payload);
      res.status(200).json({ dog: newDog }); 
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  
  
  module.exports = {
      getDogsHandler,
      getDogsByIdHandler,
      createNewDogHandler,
      getDogsByNameHandler,
  }