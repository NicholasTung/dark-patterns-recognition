function scrape() {
    elements = segments(document.body);

    text = '';

    for (i = 0; i < elements.length; i++) {
        if (elements[i].innerText.trim().length == 0) {
            continue;
        }

        text += elements[i].innerText.trim().replace(/\t/g, " ") + '\n'; 
    }

    copyToClipboard(text);
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