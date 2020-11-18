const express = require('express'), fs = require('fs');
const bodyParser = require("body-parser");
const cors = require('cors');

const https = require('https');

const mysql = require('mysql');

const tableName = 'votecollector_fb09';

const dbCon = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "union-vote-user",
  password: "6%,hKv:q%UP,!!Q3",
  database: "fb-09-vote"
});

//Cert
var privateKey = fs.readFileSync('certs/privkey.pem').toString();
var certificate = fs.readFileSync('certs/cert.pem').toString();
var credentials = {key: privateKey, cert: certificate};

//Start App
var app = express();

dbCon.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
const port = 8080;

//Configure app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Start Server
var httpsServer = https.createServer(credentials, app);

httpsServer.listen(port);


//Endpoints
//Authorize
app.post('/authorize', function (req, res) {
  const token = req.body.token;
  const sql = "Select * from " + tableName + " where token = '" + token + "';"
  console.log(sql);
  dbCon.query(sql, function(err, dbResult) {
    if (err) throw err;
    console.log(dbResult.length);
    if (dbResult.length === 0) {
      res.status(500).send("Ungültiger Authentifizierungstoken!");
    }
    else if (dbResult[0].voted === 1) {
      res.status(500).send("Token wurde bereits verwendet!");
    }
    else {
      res.send({authorizationToken: dbResult[0].token});
    }
  })
});
//Post voting to DB
app.post('/vote', function (req, res) {
  const branche = req.body.branche;
  const homeOffice = req.body.homeOffice;
  const token = req.body.token;
  const prepForHomeOffice = req.body.prepForHomeOffice;
  const equipmentForHomeOffice = req.body.equipmentForHomeOffice;
  const requirementsForHomeOffice = req.body.requirementsForHomeOffice;
  const problemsInHomeOffice = req.body.problemsInHomeOffice;
  const customProblems = req.body.customProblems === '' ? null : req.body.customProblems;
  const workInHomeOffice = req.body.workInHomeOffice;
  const qualificationForHomeOffice = req.body.qualificationForHomeOffice;
  const communicationChange = req.body.communicationChange;
  const rulesOfFutureHomeOffice = req.body.rulesOfFutureHomeOffice;
  const savedTravelTime = req.body.savedTravelTime;
  const gender = req.body.gender;
  const expectationsFromVerdi = req.body.expectationsFromVerdi;

  console.log(req.body.token);

  const sql = "UPDATE " + tableName + " SET voted = '1', " +  
  "branche = '" + branche + 
  "', home_office = '" + homeOffice + 
  "', preparation_for_home_office = '" + prepForHomeOffice + 
  "', equipment_for_home_office = '" + equipmentForHomeOffice + 
  "', requirements_for_home_office = '" + requirementsForHomeOffice + 
  "', problems_in_home_office = '" + problemsInHomeOffice + 
  "', custom_problems = '" + customProblems + 
  "', work_in_home_office = '" + workInHomeOffice + 
  "', qualification_for_home_office = '" + qualificationForHomeOffice + 
  "', communication_change = '" + communicationChange + 
  "', rules_of_future_home_office = '" + rulesOfFutureHomeOffice + 
  "', saved_travel_time = '" + savedTravelTime + 
  "', gender = '" + gender + 
  "', expectations_from_verdi = '" + expectationsFromVerdi + 
  "' WHERE token = '" + token + "';";
  console.log(sql);
  dbCon.query(sql, function(err, dbResult) {
    if (err) {
      console.log("error");
      throw err;
    }
    res.send(dbResult);
  })

})
