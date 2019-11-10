$(document).ready(function() {
    $(".analyze-button").click(function() {
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { message: "analyze_site" });
        });
    });
});