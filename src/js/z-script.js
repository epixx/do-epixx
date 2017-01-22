// window.$ = window.jQuery =  require('jquery');
// window.slick =              require('./vendor/bower/slick');


jQuery(document).ready(function($){

(function( $ ) {
  $.fn.selectbox = function() {

    // начальные параметры
    // задаем стандартную высоту div'a.
    var selectDefaultHeight = $('#selectBox').height();
    // угол поворота изображения в div'e
    var rotateDefault = "rotate(0deg)";

        // после нажатия кнопки срабатывает функция, в которой
        // вычисляется исходная высота нашего div'a.
        // очень удобно для сравнения с входящими параметрами (то, что задается в начале скрипта)
        $('#selectBox > p.valueTag').click(function() {
          // вычисление высоты объекта методом height()
          var currentHeight = $('#selectBox').height();
          // проверка условия на совпадение/не совпадение с заданной высотой вначале,
          // чтобы понять. что делать дальше.
          if (currentHeight < 100 || currentHeight == selectDefaultHeight) {
              // если высота блока не менялась и равна высоте, заданной по умолчанию,
              // тогда мы открываем список и выбираем нужный элемент.
              $('#selectBox').height("150px");  // «точка остановки анимации»
              // здесь стилизуем нашу стрелку и делаем анимацию средствами CSS3
              $('img.arrow').css({borderRadius: "1000px", transition: ".2s", transform: "rotate(180deg)"});
          }


         // иначе если список развернут (высота больше или равна 250 пикселям),
         // то при нажатии на абзац с классом valueTag, сворачиваем наш список и
         // и присваиваем блоку первоначальную высоту + поворот стрелки в начальное положение
          if (currentHeight >= 150) {
            $('#selectBox').height(selectDefaultHeight);
            $('img.arrow').css({transform: rotateDefault});
          }
      });

     // так же сворачиваем список при выборе нужного элемента
     // и меняем текст абзаца на текст элемента в списке
      $('li.option').click(function() {
        $('#selectBox').height(selectDefaultHeight);
       $('img.arrow').css({transform: rotateDefault});
        $('p.valueTag').text($(this).text());
      });
  };
})( jQuery );

$('selector').selectbox();

});

