const { Router } = require("express");
const {
  getDogsHandler,
  createNewDogHandler,
  getDogsByIdHandler,
} = require("../handlers/dogsHandler");

const dogsRouter = Router();

dogsRouter.get("/", getDogsHandler);
dogsRouter.get("/:id", getDogsByIdHandler);
dogsRouter.post("/", createNewDogHandler);

module.exports = dogsRouter;
