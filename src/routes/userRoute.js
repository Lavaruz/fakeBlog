const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUser);
router.get("/:username", userController.getUserByUsername);
router.post("/:pk", userController.addFollowingByPk);
router.put("/:pk", userController.updateUserByPk);

module.exports = router;
