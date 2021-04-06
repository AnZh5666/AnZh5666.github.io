const showAllBtn = () => {
    // Пишем функцию при нажатии на кнопку All показывает все товары
const showAll = document.querySelectorAll('.show-all');
const viewAll = e => {
	e.preventDefault();
	getGoods().then(renderCards);
}

showAll.forEach(function(elem) {
	elem.addEventListener('click', viewAll);
});
// ================

};

export default showAllBtn;