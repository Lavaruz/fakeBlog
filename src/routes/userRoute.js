const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUser);
router.post("/", userController.addUser);
router.post("/:username", userController.addFollowing);
router.put("/:username", userController.updateUserByUsername);
router.get("/:username", userController.getUserByUsername);

module.exports = router;
