const express = require("express");
const session = require("express-sessions");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const request = require("request");
const PORT = process.env.PORT || 3001;
const router = require("express").Router();

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://heroku_rmjbbdq5:3j77ablg5a4b25cgv0vtog061b@ds147265.mlab.com:47265/heroku_rmjbbdq5", {
        //localhost/vigor", {
        useMongoClient: true
    }
);
// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);


// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});