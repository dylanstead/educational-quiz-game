const {Router} = require("express")
const scoreController = require("../controllers/scores")

const scoreRouter = Router()

scoreRouter.post("/send", scoreController.addNew)

module.exports = scoreRouter