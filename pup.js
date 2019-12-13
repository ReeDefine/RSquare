const puppeteer = require("puppeteer");

(async () => {
    try {
        // open the headless browser
        const browser = await puppeteer.launch({ headless: true });
        // open a new page
        const page = await browser.newPage();
        // enter url in page
        await page.goto(u);

        // await page.waitForSelector("a.storylink");

        var news = await page.evaluate(() => {



            var titleNodeList = document.querySelectorAll(`a.storylink`);
            var ageList = document.querySelectorAll(`span.age`);
            var scoreList = document.querySelectorAll(`span.score`);
            var titleLinkArray = [];
            for (var i = 0; i < titleNodeList.length; i++) {
                titleLinkArray[i] = {
                    title: titleNodeList[i].innerText.trim(),
                    link: titleNodeList[i].getAttribute("href"),
                    age: ageList[i].innerText.trim(),
                    score: scoreList[i].innerText.trim()
                };
            }
            return titleLinkArray;
        });
        console.log(news);
        await browser.close();
        // Writing the news inside a json file
        // fs.writeFile("hackernews.json", JSON.stringify(news), function(err) {
        //     if (err) throw err;
        //     console.log("Saved!");
        // });
        console.log(("Browser Closed"));
    } catch (err) {
        // Catch and display errors
        console.log((err));
        await browser.close();
        console.log(("Browser Closed"));
    }
})();