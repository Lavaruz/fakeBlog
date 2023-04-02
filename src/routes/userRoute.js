const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/JWT");

router.get("/", userController.getAllUser);
router.get("/profile", verifyToken, userController.getUser);
router.get("/:username", userController.getUserByUsername);
router.post("/:pk", verifyToken, userController.addFollowing);
router.put("/", verifyToken, userController.updateUser);

module.exports = router;
