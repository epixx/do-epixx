// window.$ = window.jQuery =  require('jquery');
// window.slick =              require('./vendor/bower/slick');


jQuery(document).ready(function($){

  $(function() {
    $('select').selectric();
    
    $('select').on('selectric-open', function(event, element, selectric){
        $('.selectric .button').addClass('button--open');
     });

    $('select').on('selectric-close', function(event, element, selectric){
        $('.selectric .button').removeClass('button--open');
     });
  });

});
