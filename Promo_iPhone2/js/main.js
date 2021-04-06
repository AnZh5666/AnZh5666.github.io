document.addEventListener('DOMContentLoaded', () => {
    'use strict';  /* Запускает код в строгом режиме, т.е. не позволяет 
    запустить с ошибками и не объявленными переменными */  

    /* Пишем функцию  обращения к data base серверa через JSON  */
    
    const getData = (url, callback) => {
       const request = new XMLHttpRequest();
       request.open('GET', url);
       request.send();

       request.addEventListener('readystatechange', () => {
         if(request.readyState !== 4) return;
         if (request.status === 200) {
            const response = JSON.parse(request.response);
           callback(response); 
                 } else {
                    console.error(new Error('Ошибка ' + request.status));
         }
       });
    };

   /*  getData('cross-sell-dbase/dbase.json', (data) => {
      console.log(data);
    }); */

        /* ПИШЕМ ВТОРОЙ ВАРИАНТ ТАБОВ */
    const tabs = () => {
        /* Получем переменные по классам */
        const cardDetailChange = document.querySelectorAll('.card-detail__change');
        const cardDetailsTitle = document.querySelector('.card-details__title');
        const cardImageItem = document.querySelector('.card__image_item');
        const cardDetailsPrice = document.querySelector('.card-details__price');
        const descriptionMemory = document.querySelector('.description__memory');
        /* в переменных выбираем все карточки и один заголовок, одно описание, одну картинку и одну цену */
        /* -- -- */

        /* Создаем несколько массивов каждый из которых будет относится к одному из модели телефонов */
        /* Создаем массив "DATA" который будет содержать все наши телефоны */
        const data = [
            {
              name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
              img: '/img/iPhone-graphite.png',
              price: 99990,  
              memory: 128  
            },
            {
              name: 'Смартфон Apple iPhone 12 Pro 256GB Silver',
              img: '/img/iPhone-silver.png',
              price: 120000,   
              memory: 256
            },
            {
               name: 'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue',
               img: '/img/iPhone-blue.png',
               price: 98699,
               memory: 128
            }
        ];
        
        /* Пишем функцию которая будет перебирать кнопки и убирать у них active */
        const diactive = () => {
          cardDetailChange.forEach(btn => btn.classList.remove('active'))
        };
      
        /* После массива пишем функцию for each чтобы его перебирать */ 
      cardDetailChange.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            if(!btn.classList.contains('active')) {
               diactive();
                btn.classList.add('active');
                cardDetailsTitle.textContent = data[i].name;
                cardImageItem.src = data[i].img;
                cardImageItem.alt = data[i].name; 
                cardDetailsPrice.textContent = data[i].price + '₽';
                descriptionMemory.textContent = `Встроенная память (ROM) ${data[i].memory} Гб`;
            }
        });
      })
    
    };
    /* пишем функцию аккордиона */
    const accordion = () => {
      const characteristicsList = document.querySelector('.characteristics__list');
      const characteristicsItem = document.querySelectorAll('.characteristics__item');

        const open = (button, dropDown) => {
          closeAllDrops (button, dropDown);
          dropDown.style.height = `${dropDown.scrollHeight}px`;
          button.classList.add('active');
          dropDown.classList.add('active');
        };
        const close = (button, dropDown) => {
          button.classList.remove('active');
          dropDown.classList.remove('active');
          dropDown.style.height = '';
        };
        const closeAllDrops = (button, dropDown) => {
          characteristicsItem.forEach((elem) => {
            if(elem.children[0] !== button && elem.children[1] !==dropDown) {
              close(elem.children[0], elem.children[1]);
            }
          })
        }
        
        characteristicsList.addEventListener('click', (event) => {
           const target = event.target;
           if(target.classList.contains('characteristics__title')) {
              
            const parent = target.closest('.characteristics__item');
            const description = parent.querySelector('.characteristics__description');
             
             description.classList.contains('active') ? 
               close(target, description) : 
                  open(target, description);
            }
        });
        document.body.addEventListener('click', (event) => {
          const target = event.target;
          if (!target.closest('.characteristics__list')) {
            closeAllDrops();
          };
        })
    }; 
    /* Пишем функцию чтобы при нажатии на кнопку открывалось модальное окно */
      const modal = () => {
        const cardDetailsButtonBuy = document.querySelector('.card-details__button_buy');
        const cardDetailsButtonDelivery = document.querySelector('.card-details__button_delivery');
        const modal = document.querySelector('.modal');
        const cardDetailsTitle = document.querySelector('.card-details__title');
        const modalTitle = document.querySelector('.modal__title');
        const modalSubtitle = modal.querySelector('.modal_subtitle');
        const modalTitleSubmit = modal.querySelector('.modal__title-submit');
         
        const openModal = (event) => {
          const target =event.target;
          modal.classList.add('open');
          document.addEventListener('keydown', escapeHandler);
          /* чтобы при нажатии на кнопку в модальном окне менялось название телефона */
          modalTitle.textContent = cardDetailsTitle.textContent;
          modalTitleSubmit.value = cardDetailsTitle.textContent;
          modalSubtitle.textContent = target.dataset.buttonBuy;
        };
        const closeModal = () => {
          modal.classList.remove('open');
          document.removeEventListener('keydown', escapeHandler);/* при нажатии на Esc закрывается модальное окно */
        };
        const escapeHandler = (event) => {
          if(event.code === 'Escape') {
            closeModal();
          };
        };
       
        /* чтобы при нажатии на крестик в модальном окне оно закрывалось */
        modal.addEventListener('click', (event) => {
          const target = event.target;
          if(target.classList.contains('modal__close') || target === modal) {
            closeModal();
          }
        });
        cardDetailsButtonBuy.addEventListener('click', openModal);
        cardDetailsButtonDelivery.addEventListener('click', openModal);
      }

      /* Пишем функцию render cross-sell */
      const renderCrossSell = () => {
        const COUNT_ROW_GOODS = 4;
        const crossSellList = document.querySelector('.cross-sell__list');
        const allGoods = [];
        let wrapRender = null;
        /* внутри пишем функцию которая будет перемешивать массив с товаром */
        const shuffle = arr => arr.sort(() => Math.random() - 0.5);
        const crossSellAdd = document.querySelector('.cross-sell__add');
        
        
        const createCrossSellItem = (good) => {
          const { photo: picture, name, price } = good;

          const liItem = document.createElement('li');
          liItem.innerHTML = `
          <article class="cross-sell__item">
							<img class="cross-sell__image" src="${picture}" alt="">
							<h3 class="cross-sell__title">${name}</h3>
							<p class="cross-sell__price">${price}₽</p>
							<div class="button button_buy cross-sell__button">Купить</div>
						</article>
          `;
          return liItem;
        };

        const render = arr => {
         arr.forEach(item => {
              crossSellList.append(createCrossSellItem(item));
           })    
        }

        const wrapper = (fn, count) => {
          let counter = 0
          return (...args) => {
            if(counter === count) return;
            counter++;
            return fn(...args) 
          }
        };
        
        /* фукция которая будет принимать список товаров и перемешивать их в рандомном порядке */
        const createCrossSellList = (goods) => {
          wrapRender = wrapper(render, parseInt(goods.length/COUNT_ROW_GOODS)+1)
          allGoods.push(...shuffle(goods));
          const fourItem = allGoods.splice(0, COUNT_ROW_GOODS);
          wrapRender(fourItem);
        };

        crossSellAdd.addEventListener('click', () => {
          wrapRender(allGoods.splice(0, COUNT_ROW_GOODS));
        })

        getData('cross-sell-dbase/dbase.json', createCrossSellList);
       }


       tabs();
       accordion(); 
       modal();
       renderCrossSell();
       amenu('.header__menu', '.header-menu__list', '.header-menu__item', '.header-menu__burger');
       

});