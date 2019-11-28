const server = 'http://insite.azurewebsites.net/';
const descriptions = {
    'Sneaking': 'Coerces users to act in ways that they would not normally act by obscuring information.',
    'Urgency': 'Places deadlines on things to make them appear more desirable',
    'Misdirection': 'Aims to deceptively incline a user towards one choice over the other.',
    'Social Proof': 'Gives the perception that a given action or product has been approved by other people.',
    'Scarcity': 'Tries to increase the value of something by making it appear to be limited in availability.',
    'Obstruction': 'Tries to make an action more difficult so that a user is less likely to do that action.',
    'Forced Action': 'Forces a user to complete extra, unrelated tasks to do something that should be simple.'
};

function scrape() {
    // website has already been analyzed
    if (document.getElementById('insite_count')) {
        return;            
    }

    // aggregate all DOM elements on the page
    var elements = segments(document.body);
    var array = [];

    for (var i = 0; i < elements.length; i++) {
        if (elements[i].innerText.trim().length == 0) {
            continue;
        }
        array.push(elements[i].innerText.trim().replace(/\t/g, ' ')); 
    }
    
    // post to the web server
    fetch(server, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'tokens': array })
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
            if (json.result[index] != 'Not Dark') {
                highlight(elements[i], json.result[index]);
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

function highlight(element, type)
{
    element.classList.add('insite-highlight');

    var body = document.createElement("span");
    body.classList.add('insite-highlight-body');

    /* header */
    var header = document.createElement("div");
    header.classList.add('modal-header');
    var headerText = document.createElement("h1");
    headerText.innerHTML = type + ' Pattern';
    header.appendChild(headerText);
    body.appendChild(header);

    /* content */
    var content = document.createElement('div');
    content.classList.add('modal-content');
    content.innerHTML = descriptions[type];
    body.appendChild(content);

    element.appendChild(body);
}

function sendDarkPatterns(number) {
    chrome.runtime.sendMessage({
        message: 'update_current_count',
        count: number
    });
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