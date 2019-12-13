const express = require('express');
const router = express.Router();
const request = require("request");
const cheerio = require("cheerio");
const axios = require("axios");
const puppeteer = require("puppeteer");
var fs = require("fs");
/* GET home page. */

function trimSpaces(s){
    s = s.replace(/(^\s*)|(\s*$)/gi,"");
    s = s.replace(/[ ]{2,}/gi," ");
    s = s.replace(/\n /,"\n");
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/pup',(req,res)=>{
   var u = req.body.url;

    (async () => {
        const browser = await puppeteer.launch({ headless: true, defaultViewport: { width: 1920, height: 1080 }, args: ['--start-maximized']  });
        const page = await browser.newPage();
        let element, formElement, tabs;

        await page.goto(`https://www.amazon.in/dp/B07DJD1RTM?pf_rd_p=fa25496c-7d42-4f20-a958-cce32020b23e&pf_rd_r=ZNWM80VTGQVV7NXTGZT1`, { waitUntil: 'networkidle0' });

        element = await page.$x(`//*[@id="title"]`);
        // await element[0].click();

        console.log(element[0].text);
        // await page.waitForNavigation();
        await browser.close();
    })();
    //
    // (async () => {
    //     try {
    //         // open the headless browser
    //         const browser = await puppeteer.launch({ headless: true });
    //         // open a new page
    //         const page = await browser.newPage();
    //         // enter url in page
    //         await page.goto(u);
    //
    //         // await page.waitForSelector("a.storylink");
    //
    //         var news = await page.evaluate(() => {
    //
    //

                // var titleNodeList = document.querySelectorAll(`a.storylink`);
                // var ageList = document.querySelectorAll(`span.age`);
                // var scoreList = document.querySelectorAll(`span.score`);
                // var titleLinkArray = [];
                // for (var i = 0; i < titleNodeList.length; i++) {
                //     titleLinkArray[i] = {
                //         title: titleNodeList[i].innerText.trim(),
                //         link: titleNodeList[i].getAttribute("href"),
                //         age: ageList[i].innerText.trim(),
                //         score: scoreList[i].innerText.trim()
                //     };
                // }
                // return titleLinkArray;
            // });
            // console.log(news);
            // await browser.close();
            // Writing the news inside a json file
            // fs.writeFile("hackernews.json", JSON.stringify(news), function(err) {
            //     if (err) throw err;
            //     console.log("Saved!");
            // });
    //         console.log(success("Browser Closed"));
    //     } catch (err) {
    //         // Catch and display errors
    //         console.log(error(err));
    //         await browser.close();
    //         console.log(error("Browser Closed"));
    //     }
    // })();
    res.send("aSDA");

});

router.get('/url',(req,res)=> {
  var url = req.body.url;

  axios.get(url)
      .then((response) => {
        if(response.status === 200) {
          const html = response.data;
          const $ = cheerio.load(html);
          var title, count, p5,p4,p3,p2,p1;
          // var product ={
          //     title:$('#productTitle').text(),
          //     count:"",
          //     p5:"",
          //     p4:"",
          //     p3:"",
          //     p2:"",
          //     p1:"",
          // };
          // var title = $('#productTitle').text();
          var count = $('span .a-size-base .a-color-secondary').text();
          // var p = $('.histogramTable').text();
          console.log(count);
          console.log("sdfasdfasd")

        }
      }, (error) => console.log(error) );
  //
  // axios.get(url)
  //     .then((retrived)=>{
  //       if(response.status === 200) {
  //         const html = response.data;
  //         const $ = cheerio.load(html);
  //         console.log($,"Success");
  //         // console.log(retrived);
  //       }
  //     })
  //     .catch((error)=>{
  //       console.log(error);
  //     });

  // request(url, function (error, response, html) {
  //   if (!error) {
  //     var $ = cheerio.load(html);
  //     console.log($)
  //     // var title, release, rating;
  //     // var json = { title : "", release : "", rating : ""};
  //   } else {
  //     console.log(error.code, error.message);
  //   }
  //   console.log(url);
    res.send("Go back");
  // });
});

module.exports = router;
