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
  cart.renderCart();
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
// -----------------------------Управлние корзиной----------------------------

var cartTableGoods = document.querySelector('.cart-table__goods');
var cardTableTotal = document.querySelector('.card-table__total'); //Создаем объект и назовем его CART

var cart = {
  cartGoods: [],
  renderCart: function renderCart() {
    cartTableGoods.textContent = '';
    this.cartGoods.forEach(function (_ref2) {
      var id = _ref2.id,
          name = _ref2.name,
          price = _ref2.price,
          count = _ref2.count;
      var trGood = document.createElement('tr');
      trGood.className = 'cart-item';
      trGood.dataset.id = id;
      trGood.innerHTML = "\n\t\t\t\t<td>".concat(name, "</td>\n\t\t\t\t<td>").concat(price, "</td>\n\t\t\t\t<td><button class=\"cart-btn-minus\" data-id=\"").concat(id, "\">-</button></td>\n\t\t\t\t<td>").concat(count, "</td>\n\t\t\t\t<td><button class=\"cart-btn-plus\" data-id=\"").concat(id, "\">+</button></td>\n\t\t\t\t<td>").concat(price * count, "</td>\n\t\t\t\t<td><button class=\"cart-btn-delete\" data-id=\"").concat(id, "\">x</button></td>\n\t\t\t");
      cartTableGoods.append(trGood);
    }); // Выводим на кнопке корзины количество товаров содержащихся в ней

    var cartCount = document.querySelector('.cart-count'); // ИСпользуем метод reduise для вывода итоговой суммы

    var totalPrice = this.cartGoods.reduce(function (sum, item) {
      return sum + item.price * item.count;
    }, 0);
    cardTableTotal.textContent = totalPrice + '$';
  },
  deleteGood: function deleteGood(id) {
    this.cartGoods = this.cartGoods.filter(function (item) {
      return id !== item.id;
    });
    this.renderCart();
  },
  minusGood: function minusGood(id) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = this.cartGoods[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var item = _step2.value;

        if (item.id === id) {
          if (item.count <= 1) {
            this.deleteGood(id);
          } else {
            item.count--;
          }

          break;
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    this.renderCart();
  },
  plusGood: function plusGood(id) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = this.cartGoods[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var item = _step3.value;

        if (item.id === id) {
          item.count++;
          break;
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    this.renderCart();
  },
  addCartGoods: function addCartGoods(id) {
    var _this = this;

    var goodItem = this.cartGoods.find(function (item) {
      return item.id === id;
    });

    if (goodItem) {
      this.plusGood(id);
    } else {
      getGoods().then(function (data) {
        return data.find(function (item) {
          return item.id === id;
        });
      }).then(function (_ref3) {
        var id = _ref3.id,
            name = _ref3.name,
            price = _ref3.price;

        _this.cartGoods.push({
          id: id,
          name: name,
          price: price,
          count: 1
        });
      });
    }
  }
};
document.body.addEventListener('click', function (e) {
  var addTocart = e.target.closest('.add-to-cart');

  if (addTocart) {
    cart.addCartGoods(addTocart.dataset.id);
  }
});
/* cart.renderCart(); */
// вызывать эту функцию будем в openModal
// cart.deleteGood('090');

cartTableGoods.addEventListener('click', function (e) {
  var target = e.target;

  if (target.classList.contains('cart-btn-delete')) {
    cart.deleteGood(target.dataset.id);
  }

  ;

  if (target.classList.contains('cart-btn-minus')) {
    cart.minusGood(target.dataset.id);
  }

  ;

  if (target.classList.contains('cart-btn-plus')) {
    cart.plusGood(target.dataset.id);
  }

  ;
}); //================
//# sourceMappingURL=main.dev.js.map
