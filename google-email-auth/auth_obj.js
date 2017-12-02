var fs = require('fs');

module.exports =

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