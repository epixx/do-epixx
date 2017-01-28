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

  //Табчики для окошка Результат-Теория-Подсказка

  $('.result__item').on('click', function(e){
  e.preventDefault();

  $(this)
    .closest('.result__list')
    .find('.result__link.result__link--active')
    .removeClass('result__link--active');
  $(this)
   .closest('.result__link')
   .addClass('result__link--active');

  $(this)
   .closest('.result')
   .find('.result__content-wrapper.result__content-wrapper--active')
   .removeClass('result__content-wrapper--active');
  link_href = $(this).attr('href');
  $(link_href).addClass('result__content-wrapper--active');
  });

    //Табчики для окошка HTML-CSS-JS

  $('.code__item').on('click', function(e){
  e.preventDefault();

  $(this)
    .closest('.code__list')
    .find('.code__link.code__link--active')
    .removeClass('code__link--active');
  $(this)
   .closest('.code__link')
   .addClass('code__link--active');

  $(this)
   .closest('.code')
   .find('.code__content-wrapper.code__content-wrapper--active')
   .removeClass('code__content-wrapper--active');
  link_href = $(this).attr('href');
  $(link_href).addClass('code__content-wrapper--active');
  });

    //Табчики для окошка проверки(блок Проверка-Комментари)

  $('.check__item').on('click', function(e){
  e.preventDefault();

  $(this)
    .closest('.check__list')
    .find('.check__link.check__link--active')
    .removeClass('check__link--active');
  $(this)
   .closest('.check__link')
   .addClass('check__link--active');

  $(this)
   .closest('.check')
   .find('.check__content-wrapper.check__content-wrapper--active')
   .removeClass('check__content-wrapper--active');
  link_href = $(this).attr('href');
  $(link_href).addClass('check__content-wrapper--active');
  });

    //Табчики для переключения между окнами Задания - Материалы - Вопросы

  $('.track-tabs__link').on('click', function(e){
  e.preventDefault();

  $(this)
    .closest('.track-tabs__list')
    .find('.track-tabs__item.track-tabs__item--active')
    .removeClass('track-tabs__item--active');
  $(this)
   .closest('.track-tabs__item')
   .addClass('track-tabs__item--active');

  $(this)
   .closest('.track-tabs')
   .find('.track-tabs__inner.track-tabs__inner--active')
   .removeClass('track-tabs__inner--active');
  link_href = $(this).attr('href');
  $(link_href).addClass('track-tabs__inner--active');
  });

});
