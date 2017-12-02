const router = require("express").Router();
const userController = require("../../controllers/userController");


router.route("/")
    .post(userController.createUser)

router.route("/userCheck")
    .post(userController.checkLogin);
router.route("/getUser")
    .post(userController.getUser);
router.route("/logout")
    .post(userController.logout);


module.exports = router;