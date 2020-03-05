var express = require('express');
var router = express.Router();
var request = require('request');
// const querystring = require('querystring');
var fs = require("fs");
token = "";
fs.readFile("token", function(err,data){
  token = data;
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.render("main");
});


router.post('/install_chaincode', function(req, res, next) {

      var options = {
        url: "http://localhost:4000/chaincodes",
        method: 'POST',
        headers: {
            'authorization': 'Bearer '+token,
            'Content-type' : 'application/json'
        }
      };
      options.body = JSON.stringify({
        "peers": ["peer0.org1.example.com","peer1.org1.example.com"],
        "chaincodeName":"mycc",
        "chaincodePath":"/home/rashid/Documents/hyperledger/fabric-samples/balance-transfer/artifacts/src/github.com/example_cc/node",
        "chaincodeType": "node",
        "chaincodeVersion":"v0"
      });

      
      request(options, callback);

      res.send("okk");
});



router.post('/instantiate_chaincode', function(req, res, next) {
  
  var options = {
    url: "http://localhost:4000/channels/mychannel/chaincodes",
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
    "args":["a","100","b","21"]
  });

  
  request(options, callback);

  res.send("okk");
});


router.post('/invoke', function(req, res, next) {
  
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
    "fcn":"move",
    "args":["a","b","25"]
  });

  
  request(options, callback);

  res.send("okk");
});




router.get('/query', function(req, res, next) {
  var ID = req.query.ID;
  var queryStr = new Object;
  queryStr.peer = "peer0.org1.example.com";
  queryStr.fcn = "query";
  queryStr.args = "['"+ID+"']";
  
  var options = {
    url: "http://localhost:4000/channels/mychannel/chaincodes/mycc",
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


router.get('/query_block', function(req, res, next) {
  
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


router.get('/installed', function(req, res, next) {
  
  var queryStr = new Object;
    queryStr.peer = "peer0.org1.example.com";
    queryStr.type = "installed";
  
    var options = {
      url: "http://localhost:4000/chaincodes",
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
