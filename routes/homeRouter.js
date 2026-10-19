const { Router } = require("express");
const homeRouter = Router();

const controller = require("../controllers/homeController");

homeRouter.get("/", controller.displayHomepageGet);

module.exports = homeRouter;
