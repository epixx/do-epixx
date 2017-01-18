// window.$ = window.jQuery =  require('jquery');
// window.slick =              require('./vendor/bower/slick');


jQuery(document).ready(function($){  

  /* галерея "специалисты" */
  $('.staff__gallery').slick({
    infinite: true,
    dots: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  });

  $('.hamburger').click(function(e) { 
      e.preventDefault();
      $(this).closest('.header').find('.nav').toggle();
  });

  /* business description */
  $('.business-description__link').click(function(e){
      e.preventDefault();
      $(this).closest('.business-description__item').toggleClass('business-description__item--active');
  }); 

  /* reviews masonry */
  $('.reviews__articles').masonry({
    columnWidth: '.review-item',
    itemSelector: '.review-item'
  });

  /* Form in modal window */
  $('*[data-form]').click( function(e){
    e.preventDefault(); 
    var suffix = $(this).data('form'); 
    $('body').css({'overflow':'hidden'});   
    $('.overlay').show();
    var formClass = '.form--' + suffix;
    $('.overlay').find(formClass).fadeIn();
  });
  /* Close modal window */
  $('.overlay__bg, .overlay__close').click( function(e){ 
    e.preventDefault();
    $('body').css({'overflow':'auto'});
    $(this).closest('.overlay').find('.form').fadeOut();
    $(this).closest('.overlay').fadeOut(400);
  }); 

  /* question sort - branch */
  $('.questions-controls__sort-link').click(function(e) { 
    e.preventDefault();  
    $(this).closest('.questions-controls__sort').find('.sort').toggle();
    $(this).toggleClass('questions-controls__sort-link--active');
  });
  $('.sort').mouseleave(function(){
    $(this).fadeOut();
    $(this).closest('.questions-controls__sort').find('.questions-controls__sort-link').removeClass('questions-controls__sort-link--active');
  });
  $('.sort__link').on('click', function(){
    $(this).closest('.questions-controls__sort').find('.questions-controls__sort-link').removeClass('questions-controls__sort-link--active');
    $(this).closest('.questions-controls__sort').find('.questions-controls__sort-link').html($(this).html());
    $('.sort').hide(); 
    return false;
  });

  /* Form offers appearing */
  var offerYourIdea = $('.offer-item--your-idea')
  $(offerYourIdea).find('.btn').click( function(e){
    e.preventDefault();
    $(offerYourIdea).addClass('offer-item--your-idea-form');
    $(offerYourIdea).find('.offer-item__inner').hide();
    $(offerYourIdea).find('.form--offers').show();
    $(offerYourIdea).find('.btn').removeClass('btn--red').addClass('btn--blue');
  });
  var offerSelection = $('.offer-item--selection')
  $(offerSelection).find('.btn').click( function(e){
    e.preventDefault();
    $(offerSelection).addClass('offer-item--selection-form');
    $(offerSelection).find('.offer-item__inner').hide();
    $(offerSelection).find('.form--offers').show();
  });

  /* Marks close */
  $('.marks__close').click( function(e){
    e.preventDefault();
    $(this).closest('.marks__item').remove();
  });

  /* Search */
  $('.search__icon').click(function(e) { 
      e.preventDefault();
      $(this).closest('.search').find('.form').toggle();
  });

  /* service textblock slideToggle */
  $('.service__link').click(function(e){
      e.preventDefault();
      $(this).closest('.service__item').toggleClass('service__item--active');
      $(this).closest('.service__item').find('.service__text').slideToggle();
  }); 


  /* Sticky and absolute .service-stages block */
  var serviceStages = $('.service-stages');
  var serviceStagesTop = serviceStages.offset().top;
  var serviceStagesLeft = serviceStages.offset().left;
  var serviceStagesWidth = serviceStages.width();
  var serviceStagesOuterHeight = serviceStages.outerHeight(true);

  var serviceStagesBottom;
  var serviceStagesAbsolute;
  // console.log(serviceStagesTop) //376
  // console.log($('.services').outerHeight(true)) //2266
  // console.log($('.services').offset().top) //90  
  // console.log(serviceStagesBottom) //2356
  // console.log(serviceStagesAbsolute) //1930

  $(window).scroll(function () {
    if ($(window).width() > 1024) {
      /* изменение этапа по третям высоты блока контента */
      if ($(this).scrollTop() >= (serviceStagesTop + $('.services__sidebar').outerHeight(true)*2/3 )) {
        $('.service-stage-item').hide();
        $('.service-stage-item--3').show();
      } else if ($(this).scrollTop() >= (serviceStagesTop + $('.services__sidebar').outerHeight(true)/3 )) {
        $('.service-stage-item').hide();
        $('.service-stage-item--2').show();
      } else {
        $('.service-stage-item').hide();
        $('.service-stage-item--1').show();
      }
      /* корректная перебивка значения высоты меняюшегося блока */
      serviceStages = $('.service-stages');
      serviceStagesOuterHeight = serviceStages.outerHeight(true);
      serviceStagesBottom = $('.services').offset().top + $('.services').outerHeight(true);
      serviceStagesAbsolute = serviceStagesBottom - serviceStagesOuterHeight;

      /* service-stages - relative/fixed/absolute */
      if ($(this).scrollTop() >= serviceStagesAbsolute ) {
        $(serviceStages).removeClass('service-stages--sticky');
        $(serviceStages).addClass('service-stages--absolute');
        $(serviceStages).css({"width":serviceStagesWidth, "left":"10px"});
      } else if ($(this).scrollTop() >= serviceStagesTop ) {
        $(serviceStages).removeClass('service-stages--relative service-stages--absolute');
        $(serviceStages).addClass('service-stages--sticky');
        $(serviceStages).css({"width":serviceStagesWidth, "left":serviceStagesLeft});
      } else {
        $(serviceStages).removeClass('service-stages--sticky');
        $(serviceStages).addClass('service-stages--relative');
        $(serviceStages).css({"width":'auto', "left":"0"});
      }
    }
  });

  /* hamburger */
  // $('.hamburger').click(function(e) { 
  //     e.preventDefault();    
  //     $(this).closest('.header').find('.header__nav').slideToggle();
  //     $(this).closest('.header').find('.header__services').slideToggle();
  // });
  // $(window).resize(function(){
  //   if ($(window).width() > 768) {
  //     $('.header__nav').show();
  //     $('.header__services').show();
  //   } else {
  //     $('.header__nav').hide();
  //     $('.header__services').hide();
  //   }
  // });








  // /* плавный скролл наверх */
  // $('.up').click(function () {
  //   $("html, body").animate({
  //     scrollTop: 0
  //   }, 600);
  //   return false;
  // });

  // /* sticky menu */
  // var headerInner = $('.header__inner');
  // var headerNav = $('.header__nav'); 
  // var navList = $('.nav__list');
  // var navItemLogo = $(navList).find('.nav__item--logo');
  // var navItemBtn = $(navList).find('.nav__item--btn');      

  // $(window).scroll(function () {
  //   if ($(window).width() > 768) {
  //     if ($(this).scrollTop() >= headerInner.height() ) {
  //       $(headerNav).addClass('header__nav--sticky');
  //       $(navList).addClass('nav__list--sticky');
  //       $(navItemLogo).show();
  //       $(navItemBtn).hide();
  //     } else {
  //       $(headerNav).removeClass('header__nav--sticky');
  //       $(navList).removeClass('nav__list--sticky');
  //       $(navItemLogo).hide();
  //       $(navItemBtn).show();
  //     }
  //   }
  // });

  /* 404 - sticky footer */
  // var footerHeight = $('.footer').outerHeight();
  // if ($(window).height() >= $('body').height()){
  //   $('body').addClass('body--full-screen');
  //   $('body').css('padding-bottom', footerHeight+'px');
  //   $('.footer').addClass('footer--stuck-to-bottom');
  // }




    /* Map */
    // var map = new GMaps({
    //     el: '.contacts__map',
    //     lat: 59.971198,
    //     lng: 30.315121,
    //     scrollwheel: false
    // });
    // map.drawOverlay({
    //     lat: 59.971198,
    //     lng: 30.315121,
    //     content: '<div class="pin"></div>'
    // });

});

