var dictLoader = {
    seachYoudao: 'http://dict.youdao.com/search?q=',
    
    requestYoudao: function(key) {
        $.get(this.seachYoudao + key, function(data) {
            var result = $(data).find('#results-contents');

            result.find('.add_to_wordbook, .more-example, #webTrans h3, #tWebTrans,' + 
                          '#tPETrans, #eBaike, .more, .img-list').remove();
            result.find('#hhDictTrans, tEETrans').removeAttr('style');

            $('#content').empty().append(result);
        });
    },

    resultFilter: function(result) {
        return result;
    },
};

var search = function() {
    var key = $("#keyword").val();
    dictLoader.requestYoudao(key);
};

$(document).ready(function(){
    $('#search').click(function(){
        search();
    });

    $('#keyword').keypress(function(e) {
        if (e.which == 13) {
            search();
        }
    });
});
