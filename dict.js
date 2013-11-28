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
            var result = document.getElementById('results');
            content.innerHTML = "";
            content.appendChild(result);
            content.style.visibility = 'visible';

            var tabs = document.querySelectorAll('.tabs a');
            for (var i in tabs) {
                var tab = tabs[i];
                console.log(tab);
                var cur = tab.parentNode.getElementsByClassName('tab-current');
                tab.onclick = function(){
                    if (cur.length > 1) {
                        cur = cur[0];
                        cur.className.replace('tab-current', '');
                        var currel = cur.getAttribute('rel').slice(1);
                        document.getElementById(currel).style.display = "none";
                    }
                    var rel = tab.getAttribute('rel').slice(1);
                    tab.className += ' tab-current';
                    document.getEle(rel).style.display = "block";
                }
            };
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
