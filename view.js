const IMG_URL = "https://wypn9z41ir5bzmgjjalyna.on.drv.tw/realbook/rendered"

// 이미지 로드 완료 시기 파악
Image.prototype.load = function(url){
    var thisImg = this;
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', url,true);
    xmlHTTP.responseType = 'arraybuffer';
    xmlHTTP.onload = function(e) {  // 로드 완료 시 placeholder 숨기기
        var blob = new Blob([this.response]);
        thisImg.src = window.URL.createObjectURL(blob);

        var thisLoadingPlaceholder = $(thisImg).siblings().filter('.loading-placeholder');
        thisLoadingPlaceholder.hide();
    };
    xmlHTTP.send();
    
    return thisImg;
};

var autoHideTimer;
function setAutoHideTimer() {
    autoHideTimer = setTimeout(onAutoHideTimeout, 3000);
}
function resetAutoHideTimer() {
    if ($('.auto-hide').hasClass('swiper-button-lock')) return;
    $('.auto-hide').fadeIn();
    clearTimeout(autoHideTimer);
    setAutoHideTimer();
}
function onAutoHideTimeout() {
    if ($('.auto-hide').hasClass('swiper-button-lock')) return;
    $('.auto-hide').fadeOut();
}

// url 에서 parameter 추출
function getParam(sname) {
    let params = location.search.substr(location.search.indexOf("?") + 1);
    let sval = "";
    params = params.split("&");
    for (let i = 0; i < params.length; i++) {
        temp = params[i].split("=");
        if ([temp[0]] == sname) { sval = temp[1]; }
    }
    return sval;
}

$(function () {
    let vol = getParam("vol");
    let page_s = 1 * getParam("page_s");
    let page_e = 1 * getParam("page_e");

    let imageView = $('#image-view');
    for (let i = page_s; i <= page_e; i++) {
        let img = new Image().load(`${IMG_URL}/${1000 * vol + i}.jpeg`);
        imageView.append(
            $('<div class="swiper-slide">')
                .append($(img).addClass('fit-to-screen'))
                .append('<div class="spinner-border text-info loading-placeholder role="status"">')
        );
    }

    let swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        centerInsufficientSlides: true,
        keyboard: {
            enabled: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        breakpoints: {
            '@1.40': {
                slidesPerView: 2,
            },
            '@2.10': {
                slidesPerView: 3,
            },
        },
    });

    $('body').mousemove(resetAutoHideTimer);
    $('body').click(resetAutoHideTimer);
    $('body').bind('touchstart', resetAutoHideTimer);
    $('body').keydown(resetAutoHideTimer);
    setAutoHideTimer();
});
