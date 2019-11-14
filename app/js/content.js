function sendDarkPatterns(number) {
    chrome.runtime.sendMessage({
        message: 'update_current_count',
        count: number
    });
}

var server = '127.0.0.1:5000';

function scrape() {
    if (document.getElementById('insite_count')) {
        return;            
    }

    var elements = segments(document.body);
    var array = [];

    for (var i = 0; i < elements.length; i++) {
        if (elements[i].innerText.trim().length == 0) {
            continue;
        }
        array.push(elements[i].innerText.trim().replace(/\t/g, " ")); 
    }
    
    // post to the web server
    fetch('http://' + server + '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "tokens": array })
    })
    .then((resp) => resp.json()) // https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
    .then(function(data) {
        data = data.replace(/'/g, '"');
        json = JSON.parse(data);
        var count = 0;
        var index = 0;

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].innerText.trim().length == 0) {
                continue;
            }
            if (json.result[index] == 'Dark') {
                highlight(elements[i], '#F7E660');
                count++;
            }
            index++;
        }

        // store number of dark patterns
        var g = document.createElement('div');
        g.id = 'insite_count';
        g.value = count;
        g.style.opacity = 0;
        g.style.position = 'fixed';
        document.body.appendChild(g);
        sendDarkPatterns(g.value);
    })
    .catch(function (error) {
        alert('POST: ' + error);
    });
}

function highlight(element, colorCode)
{
    element.style.boxShadow = '1px 1px 3px rgba(0,0,0,0.3)';
    element.style.background = colorCode;
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message == 'analyze_site') {
            scrape();
        }
        else if (request.message == 'popup_open') {
            var element = document.getElementById('insite_count');
            if (element) {
                sendDarkPatterns(element.value);
            }
        }
    }
);