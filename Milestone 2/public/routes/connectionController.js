var express = require('express');

var router = express.Router();

var dUtility = require('../utility/connectionsDB');



 // for all other urls
 router.get('/connections', function(req, res) {
  dUtility.getConnections(co=>{

    console.log(co);
    var topic_set= new Set();
    co.forEach(element => {
      topic_set.add(element.connTopic);
    });
    console.log(topic_set)

    res.render('connections',{connections:co,topics:topic_set})

  });
});

router.get('/connection',function(req,res){

  dUtility.getConnection(req.query.connId,ob=>{
    if( ob == undefined){
      res.redirect('/connections');
      return;
    }
    else{
    console.log(ob);
    res.render('connection',{connection:ob});
    return;
    }
  });
});
router.get('/', function(req,res){
  res.render('index');
});

router.get('/savedConnections', function(req,res){
  res.render('savedConnections');
});

router.get('/about', function(req,res){
  res.render('about');
});

router.get('/contact', function(req,res){
  res.render('contact');
});

router.get('/newConnection', function(req,res){
  res.render('newConnection');
});

router.get('/index', function(req,res){
  res.render('index');
});

router.get('/*', function(req,res){
  res.send('Error 404: Page Not Found!');
});


module.exports=router;
