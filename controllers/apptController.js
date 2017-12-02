const db = require("../models");
const express = require("express");
const crypto = require("crypto");
const app = express();
const twilio = require("twilio");
const google = require('googleapis');
const googleAuth = require('google-auth-library');
const Base64 = require('js-base64').Base64;
const moment = require("moment");
//const auth_obj = require("../google-email-auth/auth_obj");
var fs = require('fs');

module.exports = {

    findAll: function(req, res) {
        db.Appointment
            .find({})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
        db.Appointment
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findApptByEmail: function(req, res) {
        console.log(`Here is user email: ${req.body.email}`);
        db.Appointment
            .find({})
            .where({ email: req.body.email })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByTherapist: function(req, res) {
        db.Appointment
            .find({})
            .where(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.Appointment
            .create(req.body)
            .then(dbModel => {
                let user = req.body;
                let accountSid = 'AC741f233849b2d6f55b7176d377a74257'; // Your Account SID from www.twilio.com/console
                let authToken = 'your_auth_token'; // Your Auth Token from www.twilio.com/console
                let client = new twilio(accountSid, authToken);
                let userDate = moment(user.date, 'YYYY-DD-MM').format('dddd[,] MMMM Do[,] YYYY');
                let userSlot = moment().hour(8).minute(0).add(user.slot, 'hours').format('h:mm a');
                let smsBody = `${user.name}, your appointment is scheduled for Date: ${userDate} at Time: ${userSlot}`;
                let userNumber = user.phone;
                let therapist = user.pfdTherapist;
                let appt = user.apptType;

                client.messages.create({
                    body: smsBody,
                    to: '+1' + userNumber, // Text this number
                    from: '+12345678901' // From a valid Twilio number
                });
                //setup email data with unicode symbols
                let mailString = "New Appointment scheduled:" + " <br>Name: " + user.name + " <br>Number: " + userNumber + "<br>Email: " + user.email +
                    " <br>Date: " + userDate + " <br>Time: " + userSlot + "<br>Therapist: " + therapist + "<br>Type: " + appt;
                let userId = "vigorappointments@gmail.com"
                console.log(mailString);

                function getOAuth2Client(cb) {
                    // Load client secrets
                    fs.readFile('client_secret.json', function(err, data) {
                        if (err) {
                            return cb(err);
                        }
                        var credentials = JSON.parse(data);
                        var clientSecret = credentials.installed.client_secret;
                        var clientId = credentials.installed.client_id;
                        var redirectUrl = credentials.installed.redirect_uris[0];
                        var auth = new googleAuth();
                        var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

                        // Load credentials
                        fs.readFile('gmail-credentials.json', function(err, token) {
                            if (err) {
                                return cb(err);
                            } else {
                                oauth2Client.credentials = JSON.parse(token);
                                return cb(null, oauth2Client);
                            }
                        });
                    });
                }


                function sendMail(auth, cb) {
                    var gmailClass = google.gmail('v1');

                    var email_lines = [];

                    email_lines.push('From: "Appointments" <vigorappointments@gmail.com>');
                    email_lines.push('To: info@vigorcharlotte.com');
                    email_lines.push('Cc: vigorappointments@gmail.com');
                    email_lines.push('Content-type: text/html;charset=iso-8859-1');
                    email_lines.push('MIME-Version: 1.0');
                    email_lines.push('Subject: New Appointment');
                    email_lines.push('');
                    email_lines.push(mailString);


                    var email = email_lines.join('\r\n').trim();

                    var base64EncodedEmail = new Buffer(email).toString('base64');
                    base64EncodedEmail = base64EncodedEmail.replace(/\+/g, '-').replace(/\//g, '_');

                    gmailClass.users.messages.send({
                        auth: auth,
                        userId: 'me',
                        resource: {
                            raw: base64EncodedEmail
                        }
                    }, cb);
                }

                getOAuth2Client(function(err, oauth2Client) {
                    if (err) {
                        console.log('err:', err);
                    } else {
                        sendMail(oauth2Client, function(err, results) {
                            if (err) {
                                console.log('err:', err);
                            } else {
                                console.log(results);
                            }
                        });
                    }
                });

                res.json(dbModel);
            })
            .catch(err => res.status(422).json(err));

    },

    remove: function(req, res) {
        db.Appointment
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};