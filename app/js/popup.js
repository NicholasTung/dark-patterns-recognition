window.onload = function() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: "popup_open" });
    });

    (document.getElementsByClassName("analyze-button")[0]).onclick = function () {
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { message: "analyze_site" });
        });
    };
 };

 chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message == 'update_current_count') {
            (document.getElementsByClassName("number")[0]).textContent = request.count;
        }
    }
);