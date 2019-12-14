const express = require('express');
const router = express.Router();
const request = require("request");
const cheerio = require("cheerio");
const axios = require("axios");
const puppeteer = require("puppeteer");
var fs = require("fs");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/pup',(req,res)=>{
   var u = req.body.url;

    (async () => {
        try {
            const browser = await puppeteer.launch({headless: true});
            console.log("Browser Opened");
            const page = await browser.newPage();
            console.log("Browser Opened Page Opened");
            await page.goto(u);
            // await page.goto(`https://www.amazon.in/dp/B07DJD1RTM?pf_rd_p=fa25496c-7d42-4f20-a958-cce32020b23e&pf_rd_r=ZNWM80VTGQVV7NXTGZT1`);
            console.log("Browser gone to page");
            // var element = await page.$x(`//*[@id="title"]`);
            // console.log("This is Brought",element);
            const output = await page.evaluate(() => {
                var tPro = document.querySelectorAll("#productTitle");
                // var l = page.$x('//*[@id="reviewsMedley"]/div/div[1]/div[2]/div[2]/span', span.a-size-base.a-color-secondary);
                // var ttotal = document.querySelectorAll('table#reviewsMedley');
                var ttotal = document.querySelectorAll('#histogramTable');
                var rCount = document.querySelectorAll('#acrCustomerReviewText');
                console.log(tPro);
                var productsArray = {
                    "title": tPro[0].innerText,//.trim(),
                    "totalReview":ttotal[1].innerText,
                    "count":rCount[0].innerText
                };
                // for (let i=0; i<ttotal.length; i++){
                //     productsArray.totalReview[i]= ttotal[i].innerText;
                //         //{// nameOfProduct:tPro[i].innerText.trim(),totalReview:ttotal[i].innerText};
                // }
                console.log(productsArray);
                return productsArray;
            });
            await browser.close();
            console.log("browser Closed Successfully");
            console.log(output)
            res.send(output)
        }catch (e) {
            console.log(e)
        }})();
    // res.send("aSDA");

});

// *****************************************************

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
    res.send("Go back");

});


router.get('/asd',(req,res)=>{
    const puppeteer = require('puppeteer');

    (async () => {
        const browser = await puppeteer.launch({ headless: true});
        const page = await browser.newPage();
        let element, formElement, tabs;

        await page.goto(`https://www.amazon.in/dp/B07HGH82LT/ref=psdc_1805560031_t1_B07DJD1RTM`, { waitUntil: 'networkidle0' });

        var comPage = await page.evaluate(
            element = await page.$x(`//*[@id="productTitle"]/text()`));
        return element

        console.log(comPage);

        // await element[0].click();

        // element = await page.$x(`(.//*[normalize-space(text()) and normalize-space(.)='Customer reviews'])[1]/following::div[7]`);
        // await element[0].click();

        // element = await page.$x(`(.//*[normalize-space(text()) and normalize-space(.)='See more answered questions (989)'])[1]/following::h2[1]`);
        // await element[0].click();

        // element = await page.$x(`(.//*[normalize-space(text()) and normalize-space(.)='Customer reviews'])[1]/following::div[7]`);
        // await element[0].click();
        await browser.close();
    })(), ()=>{
        res.send("sadasdf")
    };
});


module.exports = router;
