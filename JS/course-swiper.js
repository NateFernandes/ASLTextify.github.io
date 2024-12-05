// Initialize Swiper
const swiper = new Swiper('.swiper-container', {
    slidesPerView: 3, // Default view
    spaceBetween: 0,
    loop: true, // Enable looping
    autoplay: {
        delay: 6000, // Default delay for 3 slides
        disableOnInteraction: false, // Keep autoplay after interaction
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        1024: {
            slidesPerView: 3, // 3 slides per view on larger screens
            spaceBetween: 30,
            autoplay: {
                delay: 6000, // 6 seconds delay for 3 slides
            },
        },
        750: {
            slidesPerView: 2, // 2 slides per view on medium screens
            spaceBetween: 20,
            autoplay: {
                delay: 5000, // 5 seconds delay for 2 slides
            },
        },
        500: {
            slidesPerView: 1, // 1 slide per view on small screens
            spaceBetween: 10,
            autoplay: {
                delay: 4000, // 4 seconds delay for 1 slide
            },
        },
        300: {
            slidesPerView: 1, // 1 slide per view on extra small screens
            spaceBetween: 10,
            autoplay: {
                delay: 4000, // 4 seconds delay for 1 slide
            },
        },
    },
});
