// url 에서 parameter 추출
function getParam(sname) {
    var params = location.search.substr(location.search.indexOf("?") + 1);
    var sval = "";
    params = params.split("&");
    for (var i = 0; i < params.length; i++) {
        temp = params[i].split("=");
        if ([temp[0]] == sname) { sval = temp[1]; }
    }
    return sval;
}

$(function() {
    var vol = getParam("vol");
    var page_s = 1*getParam("page_s");
    var page_e = 1*getParam("page_e");

    var image_urls = []
    for (var i = page_s; i <= page_e; i++) {
        image_urls.push(`https://wypn9z41ir5bzmgjjalyna-on.drv.tw/realbook/rendered/${1000 * vol + i}.jpeg`);
    }

    var image_view = document.getElementById("image-view");
    for (var i in image_urls) {
        var image_slide = document.createElement("div");
        image_slide.className = "swiper-slide";
        var image = document.createElement("img");
        image.className = "fit-to-screen";
        image.src = image_urls[i];
        image_slide.appendChild(image);
        image_view.appendChild(image_slide);
    }

    var swiper = new Swiper('.swiper-container', {
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
    
});
