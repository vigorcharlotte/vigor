const router = require("express").Router();
const apptRoutes = require("./appts");
const contactRoute = require("./contactRequest");
const payRoutes = require("./payRoutes");

// Article routes
router.use("/appointments", apptRoutes);

router.use("/contactRequest", contactRoute);

router.use("/payment", payRoutes);

module.exports = router;