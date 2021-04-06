"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var mySwiper = new Swiper('.swiper-container', {
  loop: true,
  // Navigation arrows
  navigation: {
    nextEl: '.slider-button-next',
    prevEl: '.slider-button-prev'
  }
}); // Создаем корзину

var buttonCart = document.querySelector('.button-cart');
var modalCart = document.querySelector('#modal-cart');
var modalCloseBtn = document.querySelector('.modal-close'); // пишем функции при нажатии на кнопку корзины открывалось модальное окно

var openModal = function openModal() {
  modalCart.classList.add('show');
};

buttonCart.addEventListener('click', openModal); // ================
// пишем событие при нажатии за рамки окна и на крестик мдалка закрывается

var closeModal = function closeModal() {
  modalCart.classList.remove('show');
};

modalCart.addEventListener('click', function (event) {
  var target = event.target;

  if (target.classList.contains('overlay') || target.classList.contains('modal-close')) {
    closeModal();
  }
}); //================
// чобы при нажатии на Esc модлка закрывалась

var escapeHandler = function escapeHandler(event) {
  if (event.code === 'Escape') {
    closeModal();
  }

  ;
};

document.addEventListener('keydown', escapeHandler); // ================
// пишем функцию плавной прокрутки

/* (function () {
const scrollLinks = document.querySelectorAll('a.scroll-link');
for (let i = 0; i < scrollLinks.length; i ++) {
	scrollLinks[i].addEventListener('click', (e) => {
		e.preventDefault();
		const id = scrollLinks[i].getAttribute('href');
		document.querySelector(id).scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		})
	});
}
})() */
// замыкание 
//================
// Другой вариант функции для плавной прокрутки

{
  var scrollLinks = document.querySelectorAll('a.scroll-link');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var scrollLink = _step.value;
      scrollLink.addEventListener('click', function (e) {
        e.preventDefault();
        var id = scrollLink.getAttribute('href');
        document.querySelector(id).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    };

    for (var _iterator = scrollLinks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
} // Товары

var btnMore = document.querySelector('a.more');
var navLink = document.querySelectorAll('.navigation-link:not(.show-all');
var longGoodsList = document.querySelector('.long-goods-list'); // пишем функцию получения данных с сервера

var getGoods = function getGoods() {
  var result;
  return regeneratorRuntime.async(function getGoods$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch('db/db.json'));

        case 2:
          result = _context.sent;

          if (result.ok) {
            _context.next = 5;
            break;
          }

          throw 'Ошибка ' + result.status;

        case 5:
          return _context.abrupt("return", result.json());

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}; // пишем функцию создания карточек


var createCard = function createCard(_ref) {
  var label = _ref.label,
      name = _ref.name,
      img = _ref.img,
      description = _ref.description,
      id = _ref.id,
      price = _ref.price;
  var card = document.createElement('div');
  card.className = 'col-lg-3 col-sm-6';
  card.innerHTML = "\n\t\t<div class=\"goods-card\">\n\t\t\t".concat(label ? "<span class=\"label\">".concat(label, "</span>") : '', "\n\t\t\t\n\t\t\t<img src=\"db/").concat(img, "\" alt=\"image: Hoodie\" class=\"goods-image\">\n\t\t\t<h3 class=\"goods-title\">").concat(name, "</h3>\n\t\t\t<p class=\"goods-description\">").concat(description, "</p>\n\t\t\t<button class=\"button goods-card-btn add-to-cart\" data-id=").concat(id, ">\n\t\t\t\t<span class=\"button-price\">$").concat(price, "</span>\n\t\t\t</button>\n\t\t</div>\n\t");
  return card;
}; // пишем функцию которая будет показывать карточки на странице


var renderCards = function renderCards(data) {
  longGoodsList.textContent = '';
  var cards = data.map(createCard);
  longGoodsList.append.apply(longGoodsList, _toConsumableArray(cards));
  document.body.classList.add('show-goods');
}; // теперь передаем полученные с сервера товары в карточки


btnMore.addEventListener('click', function (e) {
  e.preventDefault();
  getGoods().then(renderCards);
}); // функция при нажатии на кнопку показать весь товар и после открытия всех карточек страница скролится вверх в начало

btnMore.addEventListener('click', function () {
  var id = btnMore.getAttribute('href');
  document.querySelector(id).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}); // ================
// функция фильтрация для кнопок в нав панели

var filterCards = function filterCards(field, value) {
  getGoods().then(function (data) {
    return data.filter(function (good) {
      return good[field] === value;
    });
  }).then(renderCards);
};

navLink.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    var field = link.dataset.field;
    var value = link.textContent;
    filterCards(field, value);
  });
}); // Пишем функцию при нажатии на кнопку All показывает все товары

var showAll = document.querySelectorAll('.show-all');

var viewAll = function viewAll(e) {
  e.preventDefault();
  getGoods().then(renderCards);
};

showAll.forEach(function (elem) {
  elem.addEventListener('click', viewAll);
}); // ================
// Пишем функцию при нажатии кнпок View all на отдельных карточка Аксессуары и Одежда, показывала весь их ассортимент

var showAccessories = document.querySelectorAll('.show-accessories');
var showClothing = document.querySelectorAll('.show-clothing');
showClothing.forEach(function (item) {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    filterCards('category', 'Clothing');
  });
});
showAccessories.forEach(function (item) {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    filterCards('category', 'Accessories');
  });
}); // ================
//# sourceMappingURL=main2.dev.js.map
