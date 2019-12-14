const express = require('express');
const router = express.Router();
const request = require("request");
const cheerio = require("cheerio");
const axios = require("axios");
const puppeteer = require("puppeteer");
var requestPromise = require('request-promise');
var fs = require("fs");

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
            console.log("Browser gone to page");
            // await page.goto(`https://www.amazon.in/dp/B07DJD1RTM?pf_rd_p=fa25496c-7d42-4f20-a958-cce32020b23e&pf_rd_r=ZNWM80VTGQVV7NXTGZT1`);
            // var element = await page.$x(`//*[@id="title"]`);
            // console.log("This is Brought",element);
            const output = await page.evaluate(() => {
                console.log("Evaluation Started");
                // var l = page.$x('//*[@id="reviewsMedley"]/div/div[1]/div[2]/div[2]/span', span.a-size-base.a-color-secondary);
                // var ttotal = document.querySelectorAll('table#reviewsMedley');
                var tPro = document.querySelectorAll("#productTitle");
                // var review = document.querySelectorAll("#cm-cr-dp-review-list");
                var review = document.querySelectorAll(".a-section.review.aok-relative");
                var ttotal = document.querySelectorAll('#histogramTable');
                var rCount = document.querySelectorAll('#acrCustomerReviewText');
                var pcategory = document.querySelectorAll( '.a-link-normal.a-color-tertiary')
                var reviewArray=[];
                for (let i=0; i<review.length; i++){
                    reviewArray[i]= review[i].innerText;
                }
                var productsArray = {
                    "title": tPro[0].innerText,//.trim(),
                    "totalReview":ttotal[1].innerText,
                    "count":rCount[0].innerText,
                    "category":pcategory[0].innerText,
                    "comments":reviewArray
                };
                return productsArray;
            });
            await browser.close();

            var options = {
                method: 'POST',
                uri: 'http://127.0.0.1:5000/checkmate',
                body: output,
                json: true // Automatically stringifies the body to JSON
            };

            var returndata;
            var sendrequest = await requestPromise(options)
                .then(function (parsedBody) {
                    console.log(parsedBody); // parsedBody contains the data sent back from the Flask server
                    returndata = parsedBody; // do something with this data, here I'm assigning it to a variable.
                })
                .catch(function (err) {
                    console.log(err);
                });

            res.send(returndata);
            //
            // fs.writeFile("comments.json",JSON.stringify(output),(err)=>{
            //     if(err){
            //         console.log(err);
            //     }
            // });
            console.log("browser Closed Successfully");
            // console.log(output);
            // res.send(output)
        }catch (e) {
            console.log(e)
        }})();
    // res.send("aSDA");
});


router.get('/flip',(req,res)=>{
    var u = req.body.url;
    (async () => {
        try {
            const browser = await puppeteer.launch({headless: true});
            console.log("Browser Opened");
            const page = await browser.newPage();
            console.log("Browser Opened Page Opened");
            await page.goto(u);
            console.log("Browser gone to page");
            var element = await page.$x(`//*[@id="container"]/div/div[3]/div[2]/div[1]/div[2]/div[2]/div/div[1]/h1/span`);
            console.log("This is Brought",element.innerText);
            // await page.goto(`https://www.flipkart.com/asus-rog-phone-ii-black-128-gb/p/itm99be8e028a908`); _//35KyD6 _1n1j36 DrZOea
            var element = await page.document.querySelectorAll(`._1n1j36`);
            console.log("This is Brought",element);
            // console.log(page);
            /***********
            const output = await page.evaluate(() => {
                console.log("Evaluation Started");
                // var l = page.$x('//*[@id="reviewsMedley"]/div/div[1]/div[2]/div[2]/span', span.a-size-base.a-color-secondary);
                // var ttotal = document.querySelectorAll('table#reviewsMedley');
                var tPro = document.querySelectorAll("._35KyD6");
                // var review = document.querySelectorAll("#cm-cr-dp-review-list");
                var review = document.querySelectorAll("._3nrCtb");
                var ttotal = document.querySelectorAll('._1n1j36.DrZOea');
                var rCount = document.querySelectorAll('._2yc1Qo');
                var pcategory = document.querySelectorAll( '._1HEvv0')
                var reviewArray=[];
                for (let i=0; i<review.length; i++){
                    reviewArray[i]= review[i];//.innerText;
                    //{// nameOfProduct:tPro[i].innerText.trim(),totalReview:ttotal[i].innerText};
                }
                var productsArray = {
                    "title": tPro[0],//.innerText,//.trim(),
                    "totalReview":ttotal[1],//.innerText,
                    "count":rCount[0],//.innerText,
                    "category":pcategory[1],//.innerText,
                    "comments":reviewArray
                };
                // ttotal = remove_linebreaks_ss( {str: ttotal});
                // var  reviewArray = [];
                console.log(reviewArray);
                // console.log("Product Array",productsArray);
                return productsArray;
            });
            ***/
            await browser.close();
            fs.writeFile("comments.json",JSON.stringify(output),(err)=>{
                if(err){
                    console.log(err);
                }
            });
            console.log("browser Closed Successfully");
            console.log(output);
            res.send(output)
        }catch (e) {
            console.log(e)
        }})();
    res.send("aSDA");
});


// *****************************************************
//
// router.get('/url',(req,res)=> {
//   var url = req.body.url;
//
//   axios.get(url)
//       .then((response) => {
//         if(response.status === 200) {
//           const html = response.data;
//           const $ = cheerio.load(html);
//           var title, count, p5,p4,p3,p2,p1;
//           // var product ={
//           //     title:$('#productTitle').text(),
//           //     count:"",
//           //     p5:"",
//           //     p4:"",
//           //     p3:"",
//           //     p2:"",
//           //     p1:"",
//           // };
//           // var title = $('#productTitle').text();
//           var count = $('span .a-size-base .a-color-secondary').text();
//           // var p = $('.histogramTable').text();
//           console.log(count);
//           console.log("sdfasdfasd")
//
// //         }
// //       }, (error) => console.log(error) );
//             res.send("Go back");
//         });

module.exports = router;
