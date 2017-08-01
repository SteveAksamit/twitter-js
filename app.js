const express = require( 'express' );
const nunjucks = require( 'nunjucks' );
const app = express();
const port = 3000;
const tweetBank = require('./tweetBank');
const routes = require('./routes');
const bodyParser = require('body-parser');
  var server = app.listen(port, function(){console.log('server listening');});
  app.use('/', function(request, response, next){
    console.log(request.method, response.statusCode);
    next();
});
var socketio = require('socket.io');
io = socketio.listen(server);

nunjucks.configure('views', { noCache: true });
// nunjucks.render('index.html', locals, function (err, output) {
//     console.log(output);
// });

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', routes(io));
app.use(express.static('public'))
// app.get('/tweets/', function(request, response, next){
//   response.send(tweetBank.list());
// });
// app.get('/tweets/:number', function(request, response, next){
//   response.send(tweetBank.list()[request.params.number]);
// });
// app.get('/', function(request, response, next){
//   //console.log(response.statusCode)
//   //response.send('Welcome to the Roooooot');
//   const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
//   response.render( 'index.html', locals );

// });

// nunjucks.render('index.html', locals, function (err, output) {
//     response.send(output);
// });




