// Создаем корзину
const buttonCart = document.querySelector('.button-cart');
const modalCart = document.querySelector('#modal-cart');
const modalCloseBtn = document.querySelector('.modal-close');

// пишем функции при нажатии на кнопку корзины открывалось модальное окно
const openModal = () => {
	modalCart.classList.add('show');
	cart.renderCart();
};
buttonCart.addEventListener('click', openModal);
// ================


// пишем событие при нажатии за рамки окна и на крестик мдалка закрывается
const closeModal = () => {
	modalCart.classList.remove('show');
};
modalCart.addEventListener('click', (event) => {
	const target = event.target;
	if(target.classList.contains('overlay') ||
	target.classList.contains('modal-close')) {
		closeModal();
	}
});
//================


// чобы при нажатии на Esc модалка закрывалась
const escapeHandler = (event) => {
	if(event.code === 'Escape') {
	closeModal();
	};
};
document.addEventListener('keydown', escapeHandler);
// ================


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
})() */ // замыкание 
//================

// Другой вариант функции для плавной прокрутки
{
	const scrollLinks = document.querySelectorAll('a.scroll-link');
    for(const scrollLink of scrollLinks) {
	scrollLink.addEventListener('click', e => {
		e.preventDefault();
		
		const id = scrollLink.getAttribute('href');
		document.querySelector(id).scrollIntoView({
			behavior: 'smooth',
			block: 'start',
			})
		});
	}
}

// Товары
const btnMore = document.querySelector('a.more');
const navLink = document.querySelectorAll('.navigation-link:not(.show-all');
const longGoodsList = document.querySelector('.long-goods-list');

// пишем функцию получения данных с сервера
const getGoods = async function () {
	const result = await fetch('db/db.json');
	if(!result.ok) {
		throw 'Ошибка '+ result.status
	}
	return result.json();
}

// пишем функцию создания карточек
const createCard = function({ label, name, img, description, id, price }) {
	const card = document.createElement('div');
	card.className = 'col-lg-3 col-sm-6';
	
	card.innerHTML = `
		<div class="goods-card">
			${label ?
			`<span class="label">${label}</span>`
			: ''}
			
			<img src="db/${img}" alt="image: Hoodie" class="goods-image">
			<h3 class="goods-title">${name}</h3>
			<p class="goods-description">${description}</p>
			<button class="button goods-card-btn add-to-cart" data-id=${id}>
				<span class="button-price">$${price}</span>
			</button>
		</div>
	`;
	return card;
};


// пишем функцию которая будет показывать карточки на странице
const renderCards = function(data) {
	longGoodsList.textContent = '';
	const cards = data.map(createCard);
	
	longGoodsList.append(...cards);
	
	document.body.classList.add('show-goods')
	
};


// теперь передаем полученные с сервера товары в карточки
btnMore.addEventListener('click', e => {
	e.preventDefault();
	getGoods().then(renderCards);
	
});

// функция при нажатии на кнопку показать весь товар и после открытия всех карточек страница скролится вверх в начало
btnMore.addEventListener('click', () => {
	let id = btnMore.getAttribute('href');
	document.querySelector(id).scrollIntoView({
		behavior: 'smooth',
		block: 'start',
		})
});
// ================


// функция фильтрация для кнопок в нав панели
const filterCards = function (field, value) {
	getGoods()
	.then(data => data.filter(good => good[field] === value))
	.then(renderCards);
};
navLink.forEach(function(link) {
	link.addEventListener('click', e => {
		e.preventDefault();
		const field = link.dataset.field;
		const value = link.textContent;
		filterCards(field, value)
		
	})
})
//-------------------функция при нажатии на кнопку All показывает все товары, импортируется из файла showAllBtn.js
import showAllBtn from './showAllBtn.js';
document.addEventListener('DOMContentLoaded', () => {
	showAllBtn();
});
//-------------------

// Пишем функцию при нажатии кнпок View all на отдельных карточка Аксессуары и Одежда, показывала весь их ассортимент
const showAccessories = document.querySelectorAll('.show-accessories');
const showClothing = document.querySelectorAll('.show-clothing');

showClothing.forEach(item => {
	item.addEventListener('click', e => {
	e.preventDefault();
	filterCards('category', 'Clothing')
	})
});
showAccessories.forEach(item => {
	item.addEventListener('click', e => {
	e.preventDefault();
	filterCards('category', 'Accessories')
	})
});
// ================


// -----------------------------Управлние корзиной----------------------------

const cartTableGoods = document.querySelector('.cart-table__goods');
const cardTableTotal = document.querySelector('.card-table__total');

// Выводим на кнопке корзины количество товаров содержащихся в ней
const cartCount	= document.querySelector('.cart-count');

//====================

const cartClear = document.querySelector('.cart-clear');

//Создаем объект и назовем его CART
const cart = {
	cartGoods: [],
	// Выводим на кнопке корзины количество товаров содержащихся в ней
	countQuantity() {
		cartCount.textContent = this.cartGoods.reduce((sum, item) => {
			return sum + item.count
		}, 0)
	},
	clearCart() {
		this.cartGoods.length = 0;
		this.countQuantity();
		this.renderCart();
	},
    //=============================

	renderCart(){
		cartTableGoods.textContent = '';
		this.cartGoods.forEach(({id, name, price, count}) => {
			const trGood = document.createElement('tr');
			trGood.className = 'cart-item';
			trGood.dataset.id = id;
			trGood.innerHTML = `
				<td>${name}</td>
				<td>${price}</td>
				<td><button class="cart-btn-minus" data-id="${id}">-</button></td>
				<td>${count}</td>
				<td><button class="cart-btn-plus" data-id="${id}">+</button></td>
				<td>${price * count}</td>
				<td><button class="cart-btn-delete" data-id="${id}">x</button></td>
			`;
			cartTableGoods.append(trGood);
		});


// ИСпользуем метод reduise для вывода итоговой суммы
const totalPrice = this.cartGoods.reduce((sum, item) => {
	return sum + (item.price * item.count);
	}, 0)
	cardTableTotal.textContent = totalPrice + '$';
	
	},
	deleteGood(id){
		this.cartGoods = this.cartGoods.filter(item => id !== item.id);
		this.renderCart();
		this.countQuantity();
	},
	minusGood(id){
		for (const item of this.cartGoods) {
			if (item.id === id) {
				if(item.count <= 1) {
					this.deleteGood(id)
				} else {
					item.count--;
				}
				break;
			}
		}
		this.renderCart();
		this.countQuantity();	
	},
	plusGood(id){
		for (const item of this.cartGoods) {
			if (item.id === id) {
				item.count++;
				break;
			}
		}
		this.renderCart();
		this.countQuantity();
	},
	addCartGoods(id){
		const goodItem = this.cartGoods.find(item => item.id === id);
		if (goodItem) {
			this.plusGood(id);
		} else {
			getGoods()
			.then(data => data.find(item => item.id === id))
			.then(({ id, name, price }) => {
				this.cartGoods.push({
					id,
					name,
					price,
					count: 1 
				});
				this.countQuantity();
			});
		}
	},
}
// Пишем функцию при нажатии на кнопку очищается корзина
cartClear.addEventListener('click', () => {
	cart.clearCart()
})
//=====================

document.body.addEventListener('click', e => {
	const addTocart = e.target.closest('.add-to-cart');
		if(addTocart) {
		cart.addCartGoods(addTocart.dataset.id)
	}
})

/* cart.renderCart(); */ // вызывать эту функцию будем в openModal
// cart.deleteGood('090');

cartTableGoods.addEventListener('click', e => {
	const target = e.target;
	if (target.classList.contains('cart-btn-delete')) {
		cart.deleteGood(target.dataset.id);
	};
	if (target.classList.contains('cart-btn-minus')) {
		cart.minusGood(target.dataset.id);
	};
	if (target.classList.contains('cart-btn-plus')) {
		cart.plusGood(target.dataset.id);
	};
})
//================