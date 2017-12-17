const db = require("../models");
const ContactRequest = require("../models/contactRequest")

module.exports = {
    createRequest: function(req, res) {
        let newRequest = new ContactRequest({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        })
        let mailString = "New Contact Request:" + " <br>Name: " + newRequest.name + "<br>Email: " + newRequest.email +
            " <br>Message: " + newReqeust.message;
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
            email_lines.push('Subject: New Contact Request');
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