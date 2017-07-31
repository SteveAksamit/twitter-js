const express = require( 'express' );
const app = express();
const port = 3000;

app.listen(port, function(){console.log('server listening');});
app.use('/', function(request, response, next){
  console.log(request.method, response.statusCode);
  next();
});
app.get('/special/', function(request, response, next){
  console.log("you've reached the special area!");
});
app.get('/', function(request, response, next){
  //console.log(response.statusCode)
  response.send('Welcome to the Roooooot');
});


