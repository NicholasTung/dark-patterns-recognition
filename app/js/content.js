var server = '127.0.0.1:5050';

function scrape() {
    var elements = segments(document.body);

    var array = [];

    for (var i = 0; i < elements.length; i++) {
        if (elements[i].innerText.trim().length == 0) {
            continue;
        }

        array.push(elements[i].innerText.trim().replace(/\t/g, " ")); 
    }

    // post the array of tokens to the web server (GET requests with fetch cannot have bodies)
    fetch('http://' + server + '/', {
        method: 'POST',
        body: JSON.stringify({
            tokens: array
        })
    }).catch(function (error) {
        alert(error);
    });

    // GET the results from the webserver
    fetch('http://' + server + '/', {
        method: 'GET', 
    })
    .then((resp) => resp.json())
    .then(function(data) {
        alert('test ' + data.length);
    })
    .catch(function() {
        alert(error);
    });

    copyToClipboard(tokens);
}

function copyToClipboard(text) {
    const input = document.createElement('textarea');
    input.style.position = 'fixed';
    input.style.opacity = 0;
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);
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
    }
);