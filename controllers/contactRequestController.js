const db = require("../models");
const ContactRequest = require("../models/contactRequest")

module.exports = {
    createRequest: function(req, res) {
        let newRequest = new ContactRequest({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        })

        newRequest.save(function(err, newRequest) {
            if (err) {
                console.log(err);
            } else {
                res.send(newRequest);
            }
        })
    },
    getRequests: function(req, res) {
        db.ContactRequest.find({})
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        //deleting specific contact request
        db.ContactRequest.
        findById({ _id: req.params.id })
            .then(dbObj => dbObj.remove())
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err));
    }
}