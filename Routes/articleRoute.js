const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articlecontroller");

router.post("/", articleController.createArticle);
router.get("/", articleController.getAllArticle);
router.get("/:id", articleController.getArticleById);
router.put("/:id", articleController.updateArticle);
router.delete("/:id", articleController.deleteArticle);

module.exports = router;
