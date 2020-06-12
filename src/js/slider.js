$('.reviews__slider').slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 1100,
            settings: {
                slidesToShow: 2,
                dots: true,
                arrows: false,
            },
        },
        {
            breakpoint: 780,
            settings: {
                slidesToShow: 1,
                dots: true,
                arrows: false,
            },
        },
    ]
});