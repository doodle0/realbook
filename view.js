const IMG_URL = "https://wypn9z41ir5bzmgjjalyna.on.drv.tw/realbook/rendered"

var autoHideTimer;

function setAutoHideTimer() {
    autoHideTimer = setTimeout(onAutoHideTimeout, 3000);
}
function resetAutoHideTimer() {
    $('.auto-hide').fadeIn();
    clearTimeout(autoHideTimer);
    setAutoHideTimer();
}
function onAutoHideTimeout() {
    $('.auto-hide').fadeOut();
}

$('body').mousemove(resetAutoHideTimer);
$('body').keydown(resetAutoHideTimer);
$('body').click(resetAutoHideTimer);

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

    let image_view = $('#image-view');
    for (let i = page_s; i <= page_e; i++) {
        image_view.append(
            $('<div class="swiper-slide">').append(
                $(`<img class="fit-to-screen" src="${IMG_URL}/${1000 * vol + i}.jpeg">`)
            )
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

    setAutoHideTimer();
});
