const router = require("express").Router();
const postController = require("../controllers/postController");

router.get("/", postController.getAllPost);
router.post("/", postController.addPost);

module.exports = router;
