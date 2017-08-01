const express = require( 'express' );
const nunjucks = require( 'nunjucks' );
const app = express();
const port = 3000;
const tweetBank = require('./tweetBank');
const routes = require('./routes');

var locals = {
  title: 'An Example',
  people: [
    {name: 'Gandalf'},
    {name: 'Frodo'},
    {name: 'Hermione'}
  ],
  test: 'Test!'
};
nunjucks.configure('views', { noCache: true });
// nunjucks.render('index.html', locals, function (err, output) {
//     console.log(output);
// });


app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views'); // point nunjucks to the proper directory for templates

app.listen(port, function(){console.log('server listening');});
app.use('/', function(request, response, next){
  console.log(request.method, response.statusCode);
  next();
});
app.use('/', routes);
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




