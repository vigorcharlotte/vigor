const router = require("express").Router();
const CLIENT_ID = "19942693074721240";
const CLIENT_SECRET = "fafdbba4900f561c81f1eb7655874ef3";
app.use(session({secret: "funny foe"}));

app.get("/login",function(req,res){
    res.send(`
    <a href="https://www.facebook.com/v2.10/dialog/oauth?
    client_id=${CLIENT_ID}
    &redirect_uri=http://loaclhost:3000/login/callback
    &state=   &scope=email">Click to Login</a>`)
});
app.get("/callback",function(req,res){
    console.log(req.query);
    if (req.query.error){
        console.log('err');
        console.log(req.error);
        res.send(500);
    } else if (req.query.code){
        console.log("Got code");
        let fbURL = "https://graph.facebook.com/v2.10/oath";
        let reqObject = {
            client_id: CLIENT_ID,
            redirect_uri: "http://loaclhost:3000/login/callback",
            client_secret: CLIENT_SECRET,
            code: req.query.code
        } 
        request({url:fbURL, qs: reqObject}, function(err, req, res){
            let resObj = JSON.parse(body);
            console.log(resObj);
            if (resObj && resObj.access_token){
                //go get profile info
                let profileURL = "http://graph.facebook.com/me";
                let profileObj = {
                    access_token: resObj.access_token,
                    fields: "id, name"
                }
                request({url:profileURL, qs: profileObj}, function(err, req, res){ 
                    let profileInfo = JSON.parse(body);
                    console.log(profileInfo);
                    req.session.userName = profileInfo.name;
                    req.session.userID = profileInfo.id;

                    req.session.save(function(err){
                        res.redirect('/');
                        })
                })
            }      
        })

    }
})
