const router = require("express").Router();
const paymentController = require("../../controllers/paymentController");


// Matches with "/payment/processing"
router.route("/processing")
    .post(paymentController.createPayment)
    //.get(paymentController.getRequests);

//Matches with a specific request id 
router.route("/processing/:id")
    //.delete(paymentController.remove);
module.exports = router;