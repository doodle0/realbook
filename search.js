var data;
var fuse;

$.getJSON("realbook1.json" , function(data_) {
    data = data_;

    fuse = new Fuse(data, {
        keys: ['title', 'page']
    });
});

function updateSearch() {
    var text = document.getElementById("search-text").value
    var res = fuse.search(text)
    console.log(res)

    var tbl = document.getElementById("result-tbl")
    tbl.innerHTML = '<thead><tr><th width="70%">제목</th><th width="15%">페이지</th><th>링크</th></tr></thead>'

    for (i in res) {
        if (i >= 20) break;
        tbl.innerHTML += '<tr><td>' + res[i].item.title + '</td><td>' + res[i].item.page + '</td><td>' + '' + '</td></tr>'
    }
}