window.onload = function() {
    (document.getElementsByClassName("analyze-button")[0]).onclick = function () {
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { message: "analyze_site" });
        });
    };
 };

 chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message == 'darkpatterns') {
            (document.getElementsByClassName("label")[0]).textContent = request.count;
        }
    }
);