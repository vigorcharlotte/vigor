const router = require("express").Router();
const contactRequestController = require("../../controllers/contactRequestController");


// Matches with "/api/contactRequest"
router.route("/")
    .post(contactRequestController.createRequest)
    .get(contactRequestController.getRequests);

//Matches with a specific request id 
router.route("/:id")
    .delete(contactRequestController.remove);
module.exports = router;