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


// slider
var slideIndex = 1;
function plusDivs(n) {
  showDivs(slideIndex += n);
}
function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "inline-block";  
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
        var image = document.createElement("img");
        image.className = "mySlides make-it-fit";
        image.src = image_urls[i];
        image_view.appendChild(image);
    }

    showDivs(slideIndex);
});

function onKey(e) {
    console.log(e.code)
    if (e.code == 'ArrowLeft') {
        plusDivs(-1);
    } else if (e.code == 'ArrowRight') {
        plusDivs(1);
    }
}

document.addEventListener('keydown', onKey);
