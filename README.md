# dark-patterns-recognition (insite.)
[Overall Winner of TeenHacks LI Fall 2019](https://devpost.com/software/insite-qfpjcd)

Insite is a Chrome extension that detects and highlights dark patterns on shopping websites. It reads text on product pages of shopping websites, then identifies and classifies dark pattern text. These suspected dark patterns are highlighted, with a popup that identifies and explains the category that a given dark pattern belongs to. 

This project would have been completely impossible without the paper *Dark Patterns at Scale: Findings from a Crawl of 11K Shopping Websites* (Mathur et al.). We are especially grateful for their dataset of dark pattern strings that was used to train our classifier, and their page segmentation algorithm, which brok down webpages into meaningful blocks of text. Most importantly, the work that they did informed us of the existence of these dark patterns and helped us become more aware of the online landscape, especially when shopping.

## Installation
To begin installation, first clone this repository, or download and unzip it.

Install the Chrome extension by doing the following:
1. Navigate to chrome://extensions
2. Enable "Developer mode" by toggling the switch at the top right of the page
3. Click the "Load unpacked" button.
4. Navigate to the repository directory, and select the folder `app` for installation
5. Ensure that the extension is enabled, and if so, the extension has been successfully installed!

## Inspiration
‘Dark patterns’ have recently taken the marketing world by storm. According to a study done by Princeton University researchers, dark patterns are “computer interfaces that have been crafted to trick users into doing things they didn’t mean to.” tl;dr: Online stores often use dishonest methods to trick honest buyers like us. Insite is here to change that.
If you’re interested in becoming a savvier online shopper, check out darkpatterns.org. Created by the man who coined the term ‘dark patterns,’ the site will teach you how to recognize the different kinds of dark patterns you may encounter when you shop online.

## What it does
Insite is a free-to-use Chrome extension that offers unparalleled accuracy in finding dark patterns, with an intuitive and user-friendly design. Once the extension is downloaded, you can run an in-depth site analysis by clicking the Insite logo in the upper right corner and pressing the ‘Analyze Site’ button. Any dark patterns on the site will automatically be highlighted for user convenience.

## How we built it
From the front-end, we used JS to create a Chrome extension. From the back-end, we used a Flask server with an implementation of a Bernoulli Naive Hayes ML model to create classifier algorithms. To train these algorithms, we used datasets from Princeton University researchers along with our own manually annotated datasets.

## Challenges we ran into
Although high school prepared us for long periods of sleep deprivation, we found it difficult to stay sane during the wee hours of the early mornings. Whatever. Our mental health was already down the drain. Some of our competitors also thought it would be a fantastic idea to roleplay a declassified conversation between Donald Trump and the president of Ukraine at 4 AM. Many aspirins were needed. On a more positive note, we’d like to thank the event supervisor and savior that brought us Oreos at 5 AM.
Our biggest issue was trying to connect the back-end to the front-end. None of us had much experience with the Flask library, but we managed to pull through and create a fully functional extension. In the end, we can all agree that StackOverflow saved us from imminent destruction.

## Accomplishments that we're proud of
**Hour 0** - Hackathon begins at Saturday noon. We’re off to great things.

**Hour 1** - Group agrees on dark patterns idea after talking to event supervisors.

**Hour 6** - First classifier working! Our framework is ready to categorize dark patterns by type. After dataset training, we correctly classify 94% of a website’s dark patterns on our first try. Beginner’s luck or actual skill?

**Hour 13** - Second classifier working! Our algorithm can now scrape website content for dark patterns with a 97% accuracy.

**Hour 20** - After 7 hours (no cap) of work and more work, we finally succeed in connecting our front-end and back-end. Our extension is practically ready to be deployed at this point.

**Hour 23** - A restless night turns into a restless morning as we practice presenting our project.

**Hour 24** - Laptops down! Our project is complete and we’re excited to show the judges what we’ve accomplished over the past 24 hours.

## What we learned
Since we've never been to a hackathon before, we learned to collaborate as a team and to assign responsibilities to each other. We also learned that when there's a time crunch, sleep quickly becomes a secondary priority.

## What's next for Insite.
Insite is and will always be a work in progress. That means we’ll be constantly improving user functionality to ensure that our users stay one step ahead of sellers. We’re open to suggestions, too. Feel free to drop some ideas using this [Google Form](https://forms.gle/1Ca6hrhEHTxcjkfWA).

## Reference
Mathur, A., Acar, G., Friedman, M. J., Lucherini, E., Mayer, J., Chetty, M., & Narayanan, A. (2019). Dark Patterns at Scale: Findings from a Crawl of 11K Shopping Websites. Proceedings of the ACM on Human-Computer Interaction, 3(CSCW), 81.