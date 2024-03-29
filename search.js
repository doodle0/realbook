var data;
var fuse;

function initTable() {
    $('#result-tbl > tbody').empty();
    $('#result-tbl').addClass('d-none');
}

function getImgLink(item) {
    return `view.html?vol=${item.volume}&page_s=${item.page_s}&page_e=${item.page_e}`;
}

function getTrDOM(item) {
    let page_text = item.page_s == item.page_e ? item.page_s : item.page_s + "~" + item.page_e;
    return $(`<tr><td><a href="${getImgLink(item)}">${item.title}</a></td><td>${item.volume}</td><td>${page_text}</td></tr>`);
}

function updateSearch() {
    let text = $("#search-text").val();
    let res = fuse.search(text);

    initTable();
    
    let tbo = $('#result-tbl > tbody');
    for (i in res) {
        $('#result-tbl').removeClass('d-none');
        if (i >= 10) break;
        tbo.append(getTrDOM(res[i].item));
    }
    let resultRows = $('#result-tbl tbody tr');
    if (resultRows.length > 0) {
        $(resultRows[0]).addClass('selected');
    }
}

function autoScroll() {
    $('html,body').animate({
        scrollTop: $("#search-text").offset().top
    });
}

$('#random-btn').click((e) => {
    let rand = Math.floor(Math.random() * data.length);
    location.href = getImgLink(data[rand]);
});

$(function() {
    $.getJSON("realbook.json" , function(data_) {
        data = data_;
    
        fuse = new Fuse(data, {
            keys: ['title', 'page_s', 'page_e']
        });
    
        updateSearch();
    });
});

$("#search-text").on("input", updateSearch);

$("body").on("keydown", function(event) {
    if (event.keyCode == 13) {  // Enter
        var selectedRowA = $('.selected a')[0];
        if (selectedRowA) {
            location.href = selectedRowA.getAttribute('href');
        }
    }
    else if (event.keyCode == 38) {  // ArrowUp
        let selectedRow = $('#result-tbl tr.selected');
        if (selectedRow.length && selectedRow.prev().length) {
            selectedRow.removeClass('selected');
            selectedRow.prev().addClass('selected');
        }
    }
    else if (event.keyCode == 40) {  // ArrowDown
        let selectedRow = $('#result-tbl tr.selected');
        if (selectedRow.length && selectedRow.next().length) {
            selectedRow.removeClass('selected');
            selectedRow.next().addClass('selected');
        }
    }
});

// 시작 시 검색바 선택
$("#search-text").focus();

// 검색바로 자동 스크롤
$("#search-text").on("keyup", autoScroll);
$("#search-text").click(autoScroll);