const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

module.exports = function(io) {

  router.get('/', function (req, res) {
    let tweetsArr = tweetBank.list();
    res.render( 'index', { tweets: tweetsArr, showForm: true } );
  });
  router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var list = tweetBank.find( function(o){
      var underscoredName = o.name.toLowerCase();
      console.log(name);
      return underscoredName === name.toLowerCase();
    }) ;
    res.render( 'index', { tweets: list, showForm: true, formName: name } );
  });
  router.get('/tweets/:id', function(req, res) {
    var id = req.params.id;
    var list = tweetBank.find( function(o){
      return o.id == id;
    }) ;
    res.render( 'index', { tweets: list } );
  });

  router.post('/tweets', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    var newTweet = tweetBank.add(name, text);
    io.sockets.emit('newTweet', newTweet);
    res.redirect('/');
  });

  return router;
}
