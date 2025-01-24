var express = require("express");
var router = express.Router();

const usersDataController = require("../controllers/users.controller");
const usersController = require("../controllers/user_controller");

router.post("/add", usersController.addUserProfile);
router.get("/get/:email", usersController.getUserProfile);
router.put("/update/:profileDataId", usersController.updateLevelTwoProfile);
router.put("/addPersonality", usersController.addPersonality);
// router.put("/update/:id", usersController.updateUserProfile);
// router.put("/addMentor/:id", usersController.changeUserType);
// router.put("/addPersonality", usersDataController.updateUser)


module.exports = router;