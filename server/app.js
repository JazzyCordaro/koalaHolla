var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser= require( 'body-parser' );
var urlencodedParser = bodyParser.urlencoded( {extended: false } );
var pg = require('pg');
var connectionString = 'postgress://localhost:5432/koalaHolla';
var port = process.env.PORT || 8080;

// static folder
app.use( express.static( 'public' ) );

// spin up server
app.listen( port, function(){
  console.log( 'server up on', port );
});

// base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( 'index.html' );
});

// get koalas
app.get( '/getKoalas', function( req, res ){
  console.log( 'getKoalas route hit' );
  // connect to db
  pg.connect( connectionString, function( err, client, done){
    // if err
    if(err){
      console.log( err );
    } // end error connect
    else{
      console.log('connected to db');
      var resultsArray=[];
      // query to db
      var queryResults = client.query( 'SELECT * FROM koala');
      queryResults.on( 'row', function( row ){
        resultsArray.push( row );
      }); // end on row
      queryResults.on( 'end', function(){
        done();
        return res.json( resultsArray);
      });
    }
  }); // end connect
  //assemble object to send
  // var objectToSend={
  //   response: 'from getKoalas route'
  // }; //end objectToSend
  // //send info back to client
  // res.send( objectToSend );
});

// add koala
app.post( '/addKoala', urlencodedParser, function( req, res ){
  console.log( 'addKoala route hit:', req.body );
  var results = [];

  var data = {name: req.body.name, sex: req.body.sex, age: req.body.age, readyForTransfer: req.body.readyForTransfer, notes: req.body.notes };
  pg.connect( connectionString, function( err, client, done){
    // if err
    if(err){
      done();
      console.log( err );
      return;
    } // end error connect
      // query to db
      client.query( "INSERT INTO koala(koala_name, sex, age, ready_for_transfer, notes) values($1, $2, $3, $4, $5)", [data.name, data.sex, data.age, data.readyForTransfer, data.notes]);
      var query = client.query('SELECT * FROM  koala ORDER BY id DESC LIMIT 1');
      query.on('row', function( row ){
        results.push(row);
      });

      query.on( 'end', function(){
        done();
        return res.json(results);
      });

  });
  //assemble object to send
  // var objectToSend={
  //   response: 'from addKoala route'
  // }; //end objectToSend
  // //send info back to client
  // res.send( objectToSend );
});

// add koala
app.post( '/editKoala', urlencodedParser, function( req, res ){
  console.log( 'editKoala route hit' );
  //assemble object to send
  var objectToSend={
    response: 'from editKoala route'
  }; //end objectToSend
  //send info back to client
  res.send( objectToSend );
});
