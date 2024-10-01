// Swiper initialization
const swiper = new Swiper('.mySwiper', {
    slidesPerView: 4,
    spaceBetween: 10,
    loop: true,
    autoplay: {
        delay: 5000,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        1920: {
            slidesPerView: 4,
            spaceBetween: 10,
        },
        1536: {
            slidesPerView: 4,
            spaceBetween: 10,
        },
        1366: {
            slidesPerView: 4,
            spaceBetween: 10,
        },
        1300: {
            slidesPerView: 4,
            spaceBetween: 10,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        650: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        576: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        485: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        0: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
    },
});
