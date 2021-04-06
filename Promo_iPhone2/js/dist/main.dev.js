"use strict";

document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  /* Запускает код в строгом режиме, т.е. не позволяет 
  запустить с ошибками и не объявленными переменными */

  /* ПИШЕМ ВТОРОЙ ВАРИАНТ ТАБОВ */

  var tabs = function tabs() {
    /* Получем переменные по классам */
    var cardDetailChange = document.querySelectorAll('.card-detail__change');
    var cardDetailsTitle = document.querySelector('.card-details__title');
    var cardImageItem = document.querySelector('.card__image_item');
    var cardDetailsPrice = document.querySelector('.card-details__price');
    var descriptionMemory = document.querySelector('.description__memory');
    /* в переменных выбираем все карточки и один заголовок, одно описание, одну картинку и одну цену */

    /* -- -- */

    /* Создаем несколько массивов каждый из которых будет относится к одному из модели телефонов */

    /* Создаем массив "DATA" который будет содержать все наши телефоны */

    var data = [{
      name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
      img: '/img/iPhone-graphite.png',
      price: 99990,
      memory: 128
    }, {
      name: 'Смартфон Apple iPhone 12 Pro 256GB Silver',
      img: '/img/iPhone-silver.png',
      price: 120000,
      memory: 256
    }, {
      name: 'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue',
      img: '/img/iPhone-blue.png',
      price: 98699,
      memory: 128
    }];
    /* Пишем функцию которая будет перебирать кнопки и убирать у них active */

    var diactive = function diactive() {
      cardDetailChange.forEach(function (btn) {
        return btn.classList.remove('active');
      });
    };
    /* После массива пишем функцию for each чтобы его перебирать */


    cardDetailChange.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        if (!btn.classList.contains('active')) {
          diactive();
          btn.classList.add('active');
          cardDetailsTitle.textContent = data[i].name;
          cardImageItem.src = data[i].img;
          cardImageItem.alt = data[i].name;
          cardDetailsPrice.textContent = data[i].price + '₽';
          descriptionMemory.textContent = "\u0412\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u0430\u044F \u043F\u0430\u043C\u044F\u0442\u044C (ROM) ".concat(data[i].memory, " \u0413\u0431");
        }
      });
    });
  };
  /* пишем функцию аккордиона */


  var accordion = function accordion() {
    var characteristicsList = document.querySelector('.characteristics__list');
    var characteristicsItem = document.querySelectorAll('.characteristics__item');

    var open = function open(button, dropDown) {
      closeAllDrops(button, dropDown);
      dropDown.style.height = "".concat(dropDown.scrollHeight, "px");
      button.classList.add('active');
      dropDown.classList.add('active');
    };

    var close = function close(button, dropDown) {
      button.classList.remove('active');
      dropDown.classList.remove('active');
      dropDown.style.height = '';
    };

    var closeAllDrops = function closeAllDrops(button, dropDown) {
      characteristicsItem.forEach(function (elem) {
        if (elem.children[0] !== button && elem.children[1] !== dropDown) {
          close(elem.children[0], elem.children[1]);
        }
      });
    };

    characteristicsList.addEventListener('click', function (event) {
      var target = event.target;

      if (target.classList.contains('characteristics__title')) {
        var parent = target.closest('.characteristics__item');
        var description = parent.querySelector('.characteristics__description');
        description.classList.contains('active') ? close(target, description) : open(target, description);
      }
    });
    document.body.addEventListener('click', function (event) {
      var target = event.target;

      if (!target.closest('.characteristics__list')) {
        closeAllDrops();
      }
    });
  };
  /* Пишем функцию чтобы при нажатии на кнопку открывалось модальное окно */


  var modal = function modal() {
    var cardDetailsButtonBuy = document.querySelector('.card-details__button_buy');
    var cardDetailsButtonDelivery = document.querySelector('.card-details__button_delivery');
    var modal = document.querySelector('.modal');
    var cardDetailsTitle = document.querySelector('.card-details__title');
    var modalTitle = document.querySelector('.modal__title');
    var modalSubtitle = modal.querySelector('.modal_subtitle');
    var modalTitleSubmit = modal.querySelector('.modal__title-submit');

    var openModal = function openModal(event) {
      var target = event.target;
      modal.classList.add('open');
      document.addEventListener('keydown', escapeHandler);
      /* чтобы при нажатии на кнопку в модальном окне менялось название телефона */

      modalTitle.textContent = cardDetailsTitle.textContent;
      modalTitleSubmit.value = cardDetailsTitle.textContent;
      modalSubtitle.textContent = target.dataset.buttonBuy;
    };

    var closeModal = function closeModal() {
      modal.classList.remove('open');
      document.removeEventListener('keydown', escapeHandler);
      /* при нажатии на Esc закрывается модальное окно */
    };

    var escapeHandler = function escapeHandler(event) {
      if (event.code === 'Escape') {
        closeModal();
      }

      ;
    };
    /* чтобы при нажатии на крестик в модальном окне оно закрывалось */


    modal.addEventListener('click', function (event) {
      var target = event.target;

      if (target.classList.contains('modal__close') || target === modal) {
        closeModal();
      }
    });
    cardDetailsButtonBuy.addEventListener('click', openModal);
    cardDetailsButtonDelivery.addEventListener('click', openModal);
  };

  tabs();
  accordion();
  modal();
});
//# sourceMappingURL=main.dev.js.map
