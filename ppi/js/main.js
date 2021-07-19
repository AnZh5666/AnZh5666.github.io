// TABS
$('.card').on('click', function() {
    let currTab = $(this).parent().index();

    $('.card').removeClass('card-active');
    $(this).addClass('card-active');

    $('.tab-content').removeClass('active');
    $('.tab-content').eq(currTab).addClass('active');
});
//-----------------------------------------


// HAMBURGER
$('.hamburger').on('click', function () {
    $('.head__menu').toggle();
})

$('.menu-close').on('click', function() {
    $('.head__menu').hide();
});
//-------------------------------------------

//PARALLAX
let scene = document.getElementById('scene');
let parallaxInstance = new Parallax(scene);
//-------------------------------------------

//SWIPER SLIDER
const swiper = new Swiper('.swiper-container', {
    direction : 'horizontal',
    spaceBetween : 50,
    slidesPerView : 3,
    loop: true,
    stopOnLastSlide : false,
    autoplay : {
        delay : 1000
    }
});
//-------------------------------------------

//MAP YANDEX
ymaps.ready(init);
    function init(){
        // Создание карты.
        var myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 7,
            controls : ['zoomControl', 'geolocationControl']
        });
    }
//--------------------------------------------

//VALIDATION FORM
$.validator.addMethod('regex', function(value, element, regexp) {
    let regExsp = new RegExp(regexp);
    return regExsp.test(value);
}, 'Please check your input');

$('form').validate({
    rules : {
        firstName : {
            required : true,
            regex : "[A-Za-z]{1,32}"
        },
        phoneNumber: {
            digits : true,
            required : true,
            minlength : 10,
            maxlength : 11,
            regex : "[0-9]+"
        }
    },
        messages : {
            firstName : 'Введите имя правильно',
            phoneNumber : 'Введите Ваш номер'
        }
})