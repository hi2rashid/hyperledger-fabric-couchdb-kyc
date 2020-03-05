var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require("fs");
token = "";
fs.readFile("token", function(err,data){
  token = data;
})
/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.render("main");
});

router.post('/create_channel', function(req, res, next) {

      var options = {
        url: "http://localhost:4000/channels",
        method: 'POST',
        headers: {
            'authorization': 'Bearer '+token,
            'Content-type' : 'application/json'
        }
      };
      options.form = {
        'channelName' : 'mychannel',
        'channelConfigPath' : '../artifacts/channel/mychannel.tx'
      };

      
      request(options, callback);





  res.send("okk");
});


router.post('/join_channel', function(req, res, next) {

  var options = {
    url: "http://localhost:4000/channels/mychannel/peers",
    method: 'POST',
    headers: {
        'authorization': 'Bearer '+token,
        'Content-type' : 'application/json'
    }
  };

  //options.json = {"peers" : ["peer0.org1.example.com","peer1.org1.example.com"]} //or
  options.body = JSON.stringify({"peers" : ["peer0.org1.example.com","peer1.org1.example.com"]})

  console.log(options.form)
  request(options, callback);


res.send("okk");
});


router.get('/chaininfo', function(req, res, next) {
  
  var queryStr = new Object;
    queryStr.peer = "peer0.org1.example.com";
  
    var options = {
      url: "http://localhost:4000/channels/mychannel/blocks/1",
      method: 'GET',
      headers: {
          'authorization': 'Bearer '+token,
          'Content-type' : 'application/json'
      }
    };
  
    options.qs = queryStr;
    
    request(options, callback);
  
    res.send("okk");
});


function callback(error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
}
module.exports = router;
