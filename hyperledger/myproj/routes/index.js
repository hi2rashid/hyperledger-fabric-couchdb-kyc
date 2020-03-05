var express = require('express');
var request = require('request');
var router = express.Router();

var fs = require("fs");
token = "";
fs.readFile("token", function(err,data){
  token = data;
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register_user', function(req, res, next){
  var ID = "ID"+Date.now();
  var phone = req.body.phone;
  var email = req.body.email;
  var name = req.body.name;
  

  var options = {
    url: "http://localhost:4000/channels/mychannel/chaincodes/mycc",
    method: 'POST',
    headers: {
        'authorization': 'Bearer '+token,
        'Content-type' : 'application/json'
    }
  };
  
  options.body = JSON.stringify({
    "peers": ["peer0.org1.example.com","peer1.org1.example.com"],
    "chaincodeName":"mycc",
    "chaincodeType": "node",
    "chaincodeVersion":"v0",
    "fcn":"create_user",
    "args":[ID,phone,email,name]
  });
  
  request(options, callback);
  res.send("okk");
});


function callback(error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
}

module.exports = router;
