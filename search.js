var data;
var fuse;

function initTable() {
    var tbl = document.getElementById("result-tbl")
    tbl.innerHTML = '<thead><tr><th width="70%">제목</th><th width="15%">볼륨</th><th>페이지</th></tr></thead>'
}

function updateSearch() {
    var text = document.getElementById("search-text").value
    var res = fuse.search(text)
    console.log(res)

    var tbl = document.getElementById("result-tbl")
    initTable();

    for (i in res) {
        if (i >= 15) break;
        var item = res[i].item;
        var page_text = item.page_s == item.page_e ? item.page_s : item.page_s + "~" + item.page_e;
        tbl.innerHTML += '<tr><td>' + item.title + '</td><td>' + item.volume + '</td><td>' + page_text + '</td></tr>'
    }
}

$.getJSON("realbook1.json" , function(data_) {
    data = data_;

    fuse = new Fuse(data, {
        keys: ['title', 'page_s', 'page_e']
    });
});

$(function() {
    initTable();
});
