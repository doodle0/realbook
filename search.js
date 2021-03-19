var data;
var fuse;

var searchTopLink;

function initTable() {
    var tbl = document.getElementById("result-tbl")
    tbl.innerHTML = '<thead><tr><th width="70%">제목</th><th width="15%">볼륨</th><th width="15%">페이지</th></tr></thead>'
    searchTopLink = null;
}

function updateSearch() {
    var text = document.getElementById("search-text").value
    var res = fuse.search(text)

    var tbl = document.getElementById("result-tbl")
    initTable();

    var tbo = document.createElement("tbody");

    searchTopLink = null;

    for (i in res) {
        if (i >= 15) break;
        var item = res[i].item;
        var page_text = item.page_s == item.page_e ? item.page_s : item.page_s + "~" + item.page_e;
        var link = `view.html?vol=${item.volume}&page_s=${item.page_s}&page_e=${item.page_e}`
        tbo.innerHTML += `<tr><td><a href="${link}">${item.title}</a></td><td>${item.volume}</td><td>${page_text}</td></tr>`
        if (i == 0) searchTopLink = link;
    }

    tbl.appendChild(tbo);
}

$(function() {
    $.getJSON("realbook.json" , function(data_) {
        data = data_;
    
        fuse = new Fuse(data, {
            keys: ['title', 'page_s', 'page_e']
        });
    
        updateSearch();
    });
});

$("#search-text").on("keypress", function(event){
    if (event.keyCode == 13) {
        event.preventDefault();
        event.target.blur()
        if (searchTopLink)
            location.href = searchTopLink;
    }
})