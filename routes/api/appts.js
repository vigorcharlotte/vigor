const router = require("express").Router();
const apptController = require("../../controllers/apptController");


// Matches with "/api/appointments"
router.route("/")
    .get(apptController.findAll)
    .post(apptController.create);

//Matches with "/api/appointments/therapist"
router.route("/therapist")
    .post(apptController.findByTherapist);

router.route("/userAppt")
    .post(apptController.findApptByEmail);

// Matches with "/api/appointments/:id"
router.route("/:id")
    .get(apptController.findById)
    //.put(apptController.update)
    .delete(apptController.remove);

module.exports = router;