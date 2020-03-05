var express = require('express');
var router = express.Router();
var request = require('request');

var fs = require("fs");
token = "";

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.render("main");
});


router.post('/create_user', function(req, res, next) {

      var options = {
        url: "http://localhost:4000/users",
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      options.form = {
        'username' : 'abdulrashid',
        'orgName' : 'Org1'
      };      

      
      request(options, callback);





  res.send("okk");
});


function callback(error, response, postData) {
  if (!error && response.statusCode == 200) {
    parsedData = JSON.parse(postData);
    token = parsedData.token;
    fs.writeFile("token", token, function(err,data){
      
    })
  }
}
module.exports = router;
