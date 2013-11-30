var dictLoader = {
    seachYoudao: 'http://dict.youdao.com/search?q=',
    
    requestYoudao: function(key) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'text/html';
        xhr.open('GET', this.seachYoudao + key, true);
        xhr.send(null);
        xhr.onload = function(e) {
            var content = document.getElementById('content');
            content.style.visibility = 'hidden';
            content.innerHTML = xhr.responseText;
            
            var toremove = document.querySelectorAll('body script, body link,.img-list,img,.pronounce a, .more');
            for (var i = 0; i < toremove.length; ++i) {
                toremove[i].parentNode.removeChild(toremove[i]);
            }
            
            var todisplay = document.querySelectorAll('#phrsListTab, #tEETrans, #authDictTrans, #collinsResult');

            content.innerHTML = "";
            
            for (var i = 0; i < todisplay.length; ++i) {
                todisplay[i].style.display = "block";
                content.appendChild(todisplay[i]);
                
                if (i < todisplay.length - 1)
                    content.appendChild(document.createElement('hr'));
            }
            content.style.visibility = 'visible';
            
            var more = document.querySelectorAll(".more");
        }
    },

    resultFilter: function(result) {
        return result;
    },
};

var search = function() {
    var key = document.getElementById("keyword").value;
    if (key !== "") {
        dictLoader.requestYoudao(key);
    }
};

onload = function(){
    document.getElementById('search').onclick = function(){
        search();
    };
};

document.onkeypress  = function(e) {
    if (e.which == 13) {
        search();
    }
}
