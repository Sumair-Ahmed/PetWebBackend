const express = require("express");
const router = express.Router();
const dogController = require("../controllers/dogcontroller");

router.post("/", dogController.createDog);
router.get("/", dogController.getAllDogs);
router.get("/:id", dogController.getDogById);
router.put("/:id", dogController.updateDog);
router.delete("/:id", dogController.deleteDog);

module.exports = router;
