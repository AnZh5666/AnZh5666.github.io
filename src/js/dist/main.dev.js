"use strict";

/* Выпадающее список городов с телефонами*/
$(function () {
  if (localStorage.getItem("myKey")) {
    var stored_select = localStorage.getItem("myKey");
    $('#' + stored_select).prop("selected", true);
    $('.' + stored_select).show();
  } else {
    $('.piter').show();
  }
});
$("#selectItem").change(function () {
  $('.container-phone').find('div').hide();
  var selected = $('#selectItem option:selected').attr('id');
  localStorage.setItem("myKey", selected);
  $('.' + selected).show();
});
/* Dropdawn-menu */

var dropDawns = document.querySelectorAll('.nav');
dropDawns.forEach(function (dropDawn) {
  dropDawn.addEventListener('click', function (e) {
    if (e.target.classList.contains('drawpdown-menu-title')) {
      e.target.classList.toggle('drawpdown-menu-title--active');
      e.target.nextElementSibling.classList.toggle('drawpdown-menu-body--visible');
    }
  });
}); // Video slider

var swiper = new Swiper('.about-slider', {
  // Optional parameters
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  speed: 700,
  breakpoints: {
    // when window width is >= 320px
    1460: {
      slidesPerView: 2,
      spaceBetween: 20
    }
  },
  // Navigation arrows
  navigation: {
    nextEl: '.about-button-next',
    prevEl: '.about-button-prev'
  }
});
//# sourceMappingURL=main.dev.js.map
