window.onload = function() {
    (document.getElementsByClassName("analyze-button")[0]).onclick = function () {
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { message: "analyze_site" });
        });
    };
 };

 /*
$(document).ready(function() {
    $(".analyze-button").click(function() {
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { message: "analyze_site" });
        });
    });
});
*/