!(function() {
    var bWidth = $(window).width();
    bWidth = bWidth < 1200 ? 1200 : bWidth;
    var carouselIdx = 0;
    var carouselCount = $('.carousel-inner').children().length;
    function loadCarousel() {
        bWidth = $(window).width();
        bWidth = bWidth < 1200 ? 1200 : bWidth;
        if (bWidth < 1980) {
            $('.carousel img').css('left', 0 - parseInt((1980 - bWidth) / 2));
        }
        $('.carousel-inner .item').width(bWidth);
        $('.carousel-inner').width(carouselCount * bWidth);
    }
    loadCarousel();
    function carouselSwitch() {
        $('.carousel-inner').animate({
            left: 0 - carouselIdx * bWidth
        }, 666);
        $('.carousel-indicators .active').removeClass('active');
        $('.carousel-indicators li').eq(carouselIdx).addClass('active');
    }
    $('.carousel-indicators li').click(function() {
        carouselIdx = $(this).index();
        carouselSwitch();
    });
    window.setInterval(function() {
        carouselIdx++;
        if (carouselIdx > carouselCount - 1) {
            carouselIdx = 0;
        }
        carouselSwitch();
    }, 3868);

    window.onresize = function() {
        loadCarousel();
    }
})();
