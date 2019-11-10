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
                //alert(array[i].innerText)
                highlight(elements[i], "#4BE680");
            }

            index++;
        }
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
