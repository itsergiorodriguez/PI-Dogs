require("dotenv").config();
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;


//GET | /dogs
const getDogsFromApi = async () => {
  let apiData = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    
    let fromApi = await apiData.data.map((el)=>{
        let weightMin = parseInt(el.weight.metric.slice(0,2).trim());
        let weightMax = parseInt(el.weight.metric.slice(4).trim());
        let averageWeight = weightMax + weightMin

        if (weightMin && weightMax) {
            averageWeight = averageWeight /2
        }
        else if (weightMin && !weightMax) {
                weightMax = weightMin;
                averageWeight= averageWeight / 2;

            } else if (!weightMin && weightMax) {
                weightMin = weightMax;
                averageWeight= averageWeight / 2;
            } else {
            if (el.name === "Smooth Fox Terrier") {
                weightMin = 8;
                weightMax = 8;
                averageWeight= ((weightMax) + (weightMin)) / 2;

            } else {
                weightMin = 20;
                weightMax = 30;
                averageWeight= ((weightMax) + (weightMin)) / 2;
                }
            }
        return {
            id: el.id,
            weightMin: weightMin,
            weightMax: weightMax,
            averageWeight: averageWeight,
            height: el.height,
            name: el.name,
            life_span: el.life_span,
            image: el.image.url,
            temperament: el.temperament,
        }
    })
    return fromApi;
};

//GET | /dogs por DB
const getDogsFromDb = async () => {
  let dbData = await Dog.findAll({
    include: [
      {
        model: Temperament,
        attributes: ["name"],
        through: { attributes: [] },
      },
    ],
  });

  let fromDb = dbData.map((el) => {
    return {
      id: el.id,
      weightMax: el.weightMax,
      weightMin: el.weightMin,
      averageWeight: (Number(el.weightMax) + Number(el.weightMin)) / 2,
      height: el.height,
      name: el.name,
      life_span: el.life_span,
      image: el.image,
      temperament: el.Temperaments
        ? el.Temperaments.map((el) => el.name).join(", ")
        : "Happy",
      created: true,
    };
  });
  return fromDb;
};

//GET | /dogs DB+API (concatena)
const getAllDogs = async () => {
  let dogsDB = await getDogsFromDb();
  let dogsApi = await getDogsFromApi();
  let razas = dogsDB 
  ? [...dogsDB, ...dogsApi] 
  : dogsApi;

  return razas;
};

//GET | /dogs/name?=name"..."
const getDogsName = async (name) => {
  
    let breeds = await getAllDogs();
    let result = await breeds.filter((el) => el.name.toLowerCase().includes(name.toLowerCase()));

    if (result.length){
        return result;
    } else {
        throw new Error('This breed does not exist');
    }
}



//GET | /dogs/:id
const getDogById = async (id) => {
  if (id.length > 20) {
    let dogsDb = await Dog.findByPk(id, {
      include: [
        {
          model: Temperament,
          through: { attributes: [] },
        },
      ],
    });
    return dogsDb;
  } else {
    let allApi = await getDogsFromApi();
    const apiId = allApi.filter((dog) => dog.id == id);
    return apiId;
  }
};


//POST | /dogs
const postDog = async (data) => {
  try {
    const { weightMin, weightMax, height, name, life_span, image, temperament } = data;

    if (!weightMin || !weightMax || !height || !name || !life_span || !image || !temperament) {
      throw new Error("Falta información, por favor, complete los datos requeridos.");
    } else {
      let newDog = await Dog.create({
        name: name,
        height: height,
        life_span: life_span,
        image: image,
        weightMin: weightMin,
        weightMax: weightMax,
        averageWeight: (weightMax + weightMin) / 2,
      });

      let temp = await Temperament.findAll({
        where: {
          name: temperament,
        },
      });

      await newDog.addTemperament(temp);
      return newDog;
    }
  } catch (error) {
    throw error;
  }
};

 


module.exports = {
  getDogsFromApi,
  getDogsFromDb,
  getDogsName,
  getDogById,
  getAllDogs,
  postDog,

};