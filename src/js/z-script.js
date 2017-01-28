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

    //Табчики для переключения между окнами Занятия - Задания - Правки - Тьютор

  $('.group-tabs__link').on('click', function(e){
  e.preventDefault();

  $(this)
    .closest('.group-tabs__list')
    .find('.group-tabs__item.group-tabs__item--active')
    .removeClass('group-tabs__item--active');
  $(this)
   .closest('.group-tabs__item')
   .addClass('group-tabs__item--active');

  $(this)
   .closest('.group-tabs')
   .find('.group-tabs__inner.group-tabs__inner--active')
   .removeClass('group-tabs__inner--active');
  link_href = $(this).attr('href');
  $(link_href).addClass('group-tabs__inner--active');
  });

        $('.group-schedule__title').click(function(e){
    e.preventDefault();
    if($(this).next('.group-schedule__table').is(":visible")) {
      $(this).next('.group-schedule__table').slideUp();
      $(this).addClass('group-schedule__title--close');
    } else {
      $(this).closest('.group-schedule__accordion').find('.group-schedule__table').slideUp();
      $(this).closest('.group-schedule__accordion').find('.group-schedule__table').addClass('group-schedule__title--close');
      $(this).next('.group-schedule__table').slideDown();
      $(this).removeClass('group-schedule__title--close');
    }
  });

});
