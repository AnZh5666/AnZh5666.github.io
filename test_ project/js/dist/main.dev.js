"use strict";

/* подключение всплывающего сайдбара при нажатии на кнопку */
var sidebarToggleBtn = document.querySelector('.menu-icon-wrapper');
var menuIcon = document.querySelector('.menu-icon');
var sidebar = document.querySelector('.sidebar');

sidebarToggleBtn.onclick = function () {
  menuIcon.classList.toggle('menu-icon-active');
  sidebar.classList.toggle('sidebar--mobile-active');
};
/* конец блока вслывающего сайдбара*/

/* блок для кнопки ПОКАЗАТЬ ЕЩЕ, чтобы открывались еще три карточки  НЕ РАБОТАЕТ*/


var btnShowMoreCards = document.querySelector('.show_more');
var hiddenCards = document.querySelectorAll('.card-link-hidden');
btnShowMoreCards.addEventListener('click', function () {
  for (var i = 0; i < hiddenCards.length; i++) {
    hiddenCards[i].classList.remove('card-link-hidden');
  }
});
/* показать-скрыть контент внутри виджетов*/

var widjets = document.querySelectorAll('.widjet');
/* чтобы при нажатии стрелочка на виджете переворачивалась*/

widjets.forEach(function (widjet) {
  widjet.addEventListener('click', function (e) {
    if (e.target.classList.contains('widjet__title')) {
      e.target.classList.toggle('widjet__title--active');
      /* чтобы содержимое виджета скрывалось при нажатии на стрелочку*/

      e.target.nextElementSibling.classList.toggle('widjet__body--hidden');
    }
  });
});
/* Показать еще 3 доопции при нажатии кнопки еще в сайдбаре */

var showMoreOptions = document.querySelector('.widjet__btn-show-hidden');
var hiddenCheckBoxes = document.querySelectorAll('.checkbox--hidden');

showMoreOptions.onclick = function (e) {
  e.preventDefault();
  /* если блоки были скрыты - значит показываем */

  if (showMoreOptions.dataset.options == 'hidden') {
    hiddenCheckBoxes.forEach(function (item) {
      item.style.display = 'block';
    });
    showMoreOptions.innerText = 'Скрыть дополнительные опции';
    showMoreOptions.dataset.options = 'visible';
  }
  /* если блоки были видны, значит скрываем */
  else if (showMoreOptions.dataset.options == 'visible') {
      hiddenCheckBoxes.forEach(function (item) {
        item.style.display = 'none';
      });
      showMoreOptions.innerText = 'Показать еще';
      showMoreOptions.dataset.options = 'hidden';
    }
};
//# sourceMappingURL=main.dev.js.map
