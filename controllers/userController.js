const db = require("../models");
const crypto = require("crypto");
const Login = require("../models/login");

module.exports = {
    //createUser is creting a user in our database
    createUser: function(req, res) {
        //here is password modification
        var salt = "540987gf09df8ksjf5870gsd"
        var data = req.body.password + salt;
        var md5Pw = crypto.createHash('md5').update(data).digest("hex");

        //creating a new login object referencing the Login model
        let newLogin = new Login({
            login_name: req.body.email,
            login_pass: md5Pw,
            salt: salt
        });
        newLogin.save(function(err, userLogin) {
            if (err) {
                res.send(err);
            } else {
                //this is the Mongoose Model where we actually create the user
                db.User.create({
                    name: req.body.name,
                    email: req.body.email,
                    login: newLogin._id
                })
                res.send(userLogin);
            }
        });
    },
    //check login to verify we have a good user, pass and username match
    checkLogin: function(req, res) {

        db.Login.findOne({
                //finding user login from the database
                login_name: req.body.login_name
            })
            .exec(function(err, entry) {
                if (!entry) {
                    //if there is not user in the db
                    res.json({ error: "No User Created" });
                } else {
                    //getting password and salt from table
                    let chkPassword = req.body.user_pass + entry.salt;
                    let pwToCheck = crypto.createHash("md5").update(chkPassword).digest("hex");
                    if (pwToCheck === entry.login_pass) {
                        //if password is correct return user data and create cookie for session
                        res.cookie('user', entry._id);
                        res.json(entry._id);
                    } else {
                        //if user password does not match
                        res.json({ error: "Invalid Password" });
                    }
                }
            })
    },
    getUser: function(req, res) {
        console.log(req.body.id);
        db.User.findOne({
            id: req.body.id
        }).exec(function(err, entry) {
            if (err) {
                res.send(err);
            } else {
                res.json(entry);
            }

        })
    },
    logout: function(req, res) {
        res.clearCookie('user');
        res.json({ success: "Logout Successful" });

    }
}