# Dark Patterns Recognition (Insite)
[Overall Winner of TeenHacks LI Fall 2019](https://devpost.com/software/insite-qfpjcd)

Insite is a Chrome extension that detects and highlights dark patterns on shopping websites. It reads text on product pages of shopping websites, then identifies and classifies dark pattern text. These potential dark patterns are then highlighted, with a popup that identifies and explains the category that a given dark pattern belongs to. 

This project would have been completely impossible without the paper *Dark Patterns at Scale: Findings from a Crawl of 11K Shopping Websites* (Mathur et al.). We are especially grateful for their dataset of dark pattern strings that was used to train our classifier, and their page segmentation algorithm, which broke down webpages into meaningful blocks of text. Most importantly, the work that they did informed us of the existence of these dark patterns and helped us become more aware of the online landscape, especially when shopping.


<p align="center">
    <img src="https://raw.githubusercontent.com/NicholasTung/dark-patterns-recognition/master/after.png" alt="logo" width=600 >
</p>
<p align = "center">
    Store page with identified dark patterns highlighted in yellow
</p>

## Dark Patterns?
Dark patterns are design tricks used to influence the way users interact with software. While some dark patterns are harmless, like emphasizing signup buttons with color, others can be more malicious in problematic. In the context of online stores, dark patterns can be used to nudge buyers into buying items they might not need. For further information on dark patterns, check out [this website](https://darkpatterns.org). Created by the man who coined the term ‘dark patterns,’ the site will teach you how to recognize the different kinds of dark patterns you may encounter.
## Tech Stack
The Chrome Extension front-end that scrapes the active web page is written in Javascript. For the back-end, a Python server running Flask interfaces Bernoulli Naive Bayes models to classify tokens of text sent to it. To train these algorithms, datasets from Princeton University researchers along with manually annotated datasets were used.
## Installation
To begin installation, first clone this repository, or download and unzip it.

Install and run the Flask app backend by navigating to `api`, installing required libraries, and running `app.py` with Python

Install the Chrome extension:
1. Navigate to chrome://extensions
2. Enable "Developer mode" by toggling the switch at the top right of the page
3. Click the "Load unpacked" button.
4. Navigate to the repository directory, and select the folder `app` for installation
5. Ensure that the extension is enabled, and if so, the extension has been successfully installed!
## Reference
Mathur, A., Acar, G., Friedman, M. J., Lucherini, E., Mayer, J., Chetty, M., & Narayanan, A. (2019). Dark Patterns at Scale: Findings from a Crawl of 11K Shopping Websites. Proceedings of the ACM on Human-Computer Interaction, 3(CSCW), 81.
