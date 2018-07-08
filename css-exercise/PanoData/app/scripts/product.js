!(function(){
    var bWidth = $('body').width();
    if(bWidth < 1980){
        $('.product-list .bg img').css('left',0-parseInt((1980-bWidth)/2));    
    }
})();
