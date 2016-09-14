console.log( 'js' );
var koala = [];

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var objectToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      sex: $('#sexIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala( objectToSend );
    location.reload();
  }); //end addButton on click

  $('#editKoala').on( 'click', function(){
    console.log('in editKoala on click');

    var objectToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      sex: $('#sexIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
  }); // end editKoala on click
}); // end doc ready


var getKoalas = function(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/getKoalas',
    type: 'GET',
    success: function( data ){
      console.log( 'got some koalas: ', data );
      koala = data;
      appendKoalas();
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
}; // end getKoalas

var appendKoalas = function(){
  console.log('in appendKoalas');
  for (var i = 0; i < koala.length; i++) {
    $( '#viewKoalas' ).append('<p>Name: ' + koala[i].koala_name + ' |Age: ' + koala[i].age + ' |Sex: ' + koala[i].sex + ' |Transfer: ' + koala[i].ready_for_transfer + ' |Notes: ' + koala[i].notes);
  }
};


var saveKoala = function( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/addKoala',
    type: 'post',
    data: newKoala,
    success: function( data ){
      console.log( 'got some koalas: ', data );
      koala = data;
      appendKoalas();
    } // end success
  }); //end ajax
};

var changeKoala = function( diffKoala ){
  console.log('in changeKoala', diffKoala);
  $.ajax({
    url: '/editKoala',
    type: 'POST',
    data: diffKoala,
    success: function( data ){

    } // end success
  }); // end ajax
};
