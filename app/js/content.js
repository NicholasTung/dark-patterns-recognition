const endpoint = "http:/127.0.0.1:5000/";
const descriptions = {
  "Sneaking": "Coerces users to act in ways that they would not normally act by obscuring information.",
  "Urgency": "Places deadlines on things to make them appear more desirable",
  "Misdirection": "Aims to deceptively incline a user towards one choice over the other.",
  "Social Proof": "Gives the perception that a given action or product has been approved by other people.",
  "Scarcity": "Tries to increase the value of something by making it appear to be limited in availability.",
  "Obstruction": "Tries to make an action more difficult so that a user is less likely to do that action.",
  "Forced Action": "Forces a user to complete extra, unrelated tasks to do something that should be simple.",
};

function scrape() {
  // website has already been analyzed
  if (document.getElementById("insite_count")) {
    return;
  }

  // aggregate all DOM elements on the page
  let elements = segments(document.body);
  let filtered_elements = [];

  for (let i = 0; i < elements.length; i++) {
    let text = elements[i].innerText.trim().replace(/\t/g, " ");
    if (text.length == 0) {
      continue;
    }
    filtered_elements.push(text);
  }

  // post to the web server
  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tokens: filtered_elements }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      data = data.replace(/'/g, '"');
      json = JSON.parse(data);
      let dp_count = 0;
      let element_index = 0;

      for (let i = 0; i < elements.length; i++) {
        let text = elements[i].innerText.trim().replace(/\t/g, " ");
        if (text.length == 0) {
          continue;
        }

        if (json.result[i] !== "Not Dark") {
          highlight(elements[element_index], json.result[i]);
          dp_count++;
        }
        element_index++;
      }

      // store number of dark patterns
      let g = document.createElement("div");
      g.id = "insite_count";
      g.value = dp_count;
      g.style.opacity = 0;
      g.style.position = "fixed";
      document.body.appendChild(g);
      sendDarkPatterns(g.value);
    })
    .catch((error) => {
      alert(error);
      alert(error.stack);
    });
}

function highlight(element, type) {
  element.classList.add("insite-highlight");

  let body = document.createElement("span");
  body.classList.add("insite-highlight-body");

  /* header */
  let header = document.createElement("div");
  header.classList.add("modal-header");
  let headerText = document.createElement("h1");
  headerText.innerHTML = type + " Pattern";
  header.appendChild(headerText);
  body.appendChild(header);

  /* content */
  let content = document.createElement("div");
  content.classList.add("modal-content");
  content.innerHTML = descriptions[type];
  body.appendChild(content);

  element.appendChild(body);
}

function sendDarkPatterns(number) {
  chrome.runtime.sendMessage({
    message: "update_current_count",
    count: number,
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "analyze_site") {
    scrape();
  } else if (request.message === "popup_open") {
    let element = document.getElementById("insite_count");
    if (element) {
      sendDarkPatterns(element.value);
    }
  }
});
