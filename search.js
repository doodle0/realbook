var data;
var fuse;

var searchTopLink;

function initTable() {
    let tbl = $("#result-tbl")
    $('#result-tbl > tbody').empty();
    $('#result-thead').addClass('d-none');
    searchTopLink = null;
}

function updateSearch() {
    let text = $("#search-text").val()
    let res = fuse.search(text)

    initTable();

    let tbo = $('#result-tbl > tbody');

    searchTopLink = null;

    for (i in res) {
        $('#result-thead').removeClass('d-none');
        if (i >= 10) break;
        let item = res[i].item;
        let page_text = item.page_s == item.page_e ? item.page_s : item.page_s + "~" + item.page_e;
        let link = `view.html?vol=${item.volume}&page_s=${item.page_s}&page_e=${item.page_e}`
        tbo.append(
            $(`<tr><td><a href="${link}">${item.title}</a></td><td>${item.volume}</td><td>${page_text}</td></tr>`)
        );
        if (i == 0) searchTopLink = link;
    }
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

function autoScroll() {
    $('html,body').animate({
        scrollTop: $("#search-text").offset().top
    });
}

$("#search-text").on("input", updateSearch)

$("#search-text").on("keypress", function(event){
    if (event.keyCode == 13) {
        // event.preventDefault();
        // event.target.blur()
        if (searchTopLink)
            location.href = searchTopLink;
    }
});

// 검색바로 자동 스크롤
$("#search-text").on("keyup", autoScroll);
$("#search-text").click(autoScroll);