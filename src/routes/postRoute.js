const router = require("express").Router();
const postController = require("../controllers/postController");
const { verifyToken } = require("../middlewares/JWT");

router.get("/", postController.getAllPost);
router.get("/user", verifyToken, postController.getPostByProfile);
router.post("/", verifyToken, postController.addPost);
router.get("/:pk", postController.getPostByPk);
router.put("/:pk", verifyToken, postController.updatePostByPk);

module.exports = router;
