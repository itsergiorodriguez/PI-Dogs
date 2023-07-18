const {getAllTemperaments} = require('../controllers/controllerTemperament');



const getAllTempsHandler = async (req, res) => {
    try {
        let result = await getAllTemperaments()
        await res.status(200).json(result)
    } catch (error) {
        res.status(404).send(error);
    }
}

module.exports = {getAllTempsHandler};