const {Router} = require('express');
const {getAllTempsHandler} = require ('../handlers/tempHandler')

const tempRouter = Router();

tempRouter.get ('/', getAllTempsHandler);

module.exports = tempRouter;
