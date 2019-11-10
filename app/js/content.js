window.onload = function() {
    var element = document.getElementById('incite_darkpatterns');
    if (element) {
        sendDarkPatterns(element.value);
    }
}

function sendDarkPatterns(number) {
    chrome.runtime.sendMessage({
        message: "darkpatterns",
        count: number
    });
}

function addDarkPatternsToMemory(number)
{
    chrome.storage.sync.set({'darkpatterns': getDarkPatterns() + number}, function() {

    });
}

var getDarkPatterns = function()
{
    chrome.storage.local.get(['darkpatterns'], function(result) {
        return result.key;
    });
}

var server = '127.0.0.1:5000';

function scrape() {
    var elements = segments(document.body);

    var array = [];

    for (var i = 0; i < elements.length; i++) {
        if (elements[i].innerText.trim().length == 0) {
            continue;
        }

        array.push(elements[i].innerText.trim().replace(/\t/g, " ")); 
    }

    // json to string
    alert(JSON.stringify({
        tokens:array
    }));

    // post the array of tokens to the web server (GET requests with fetch cannot have bodies)
    fetch('http://' + server + '/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "tokens": array
        })
    }).catch(function (error) {
        alert("post: " + error);
    });

    alert("POST");

    // GET the results from the webserver
    fetch('http://' + server + '/', {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then((resp) => resp.json())
    .then(function(data) {
        data = data.replace(/'/g, '"');
        json = JSON.parse(data);

        var index = 0;
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].innerText.trim() != array[index]) {
                continue;
            } 

            if (json.result[index] == 'Dark') {
                highlight(elements[i], "#4BE680");
            }

            index++;
        }

        // store number of dark patterns
        var g = document.createElement('div');
        g.id = 'incite_darkpatterns';
        g.value = json.result.length;
        g.style.opacity = 0;
        g.style.position = 'fixed';
        addDarkPatternsToMemory(g.value);

    })
    .catch(function(error) {
        alert("GET" + error);
    });
}

function highlight(element, colorCode)
{
    if (element == null)
    {
        return;
    }

    element.style.boxShadow = '1px 1px 3px rgba(0,0,0,0.3)';
    element.style.background = colorCode;
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message == 'analyze_site') {
            scrape();
        }
    }
);
