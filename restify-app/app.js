var restify = require('restify');
var server = restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

let swimlaneID = 0;

let columnData = []
let cardData = []

function getHomePage(req, res, next) {
	res.send("Welcome to our first api.");
}

var Column = function (id, dSwimlaneID, classType) {

  this.id = id;
  this.dSwimlaneID = dSwimlaneID;
  this.classType = classType;

}

function getSwimLanes(req, res, next) {
  // Resitify currently has a bug which doesn't allow you to set default headers
  // These headers comply with CORS and allow us to serve our response to any origin
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

 //find the appropriate data
    res.send(columnData);
}


function postSwimLanes(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  console.log(req.body);

  var column = new Column(req.body.id, req.body.dataSwimlaneID, req.body.slClass);

  columnData.push(column);

  //save the new message to the collection
	res.send(column);
}

var Card = function (id, dSwimlaneID, classType, title, description) {

  this.id = id;
  this.dSwimlaneID = dSwimlaneID;
  this.classType = classType;
  this.title = title;
  this.description = description;

}

function getCards(req, res, next) {
  // Resitify currently has a bug which doesn't allow you to set default headers
  // These headers comply with CORS and allow us to serve our response to any origin
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

 //find the appropriate data
    res.send(cardData);
}


function postCards(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  console.log(req.body);

  var card = new Card(req.body.id, req.body.dataSwimlaneID, req.body.cClass, req.body.title, req.body.description);

  cardData.push(card);

  //save the new message to the collection
  res.send(card);
}

// Set up our routes and start the server

server.get('/columns', getSwimLanes);
server.post('/columns', postSwimLanes);
server.get('/cards', getCards);
server.post('/cards', postCards);

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});