const router = require("express").Router();
const postController = require("../controllers/postController");
const { verifyToken } = require("../middlewares/JWT");

router.get("/", verifyToken, postController.getAllPost);
router.get("/:pk", postController.getPostByPk);
router.post("/", postController.addPost);
router.put("/:pk", postController.updatePostByPk);

module.exports = router;
