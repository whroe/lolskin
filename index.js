const puppeteer = require('puppeteer');
const fs = require('fs');
const {
    createInflate
} = require('zlib');
(async () => {
    const browser = await puppeteer.launch({
        // args: ['--no-sandbox'],
        // args: ['--no-sandbox', '--disable-setuid-sandbox'],
        //  ignoreDefaultArgs: ['--disable-extensions'],
        executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
        headless: true,
        defaultViewport: {
            width: 1920,
            height: 937
        },
        timeout: 300000

    });
    const page = await browser.newPage();
    await page.goto('https://lolskin.pro/', {
        waitUntil: 'domcontentloaded'
    });
    const hrefArr = await page.evaluate(() => {
        let arr = [];
        const aNodes = document.querySelectorAll('.wp-block-button__link');
        aNodes.forEach(function (item) {
            arr.push(item.href)
        })
        return arr
    });
    console.log();
    await getFile(hrefArr[0])
    await rar()
    await browser.close()

    function getFile(fileLink) {
        //文件下载
        var thumb = [fileLink];
        var fs = require("fs");
        var path = require("path");
        var request = require("request");

        //创建文件夹目录
        var dirPath = path.join(__dirname, "file");
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
            console.log("文件夹创建成功");
        } else {
            console.log("文件夹已存在");
        }
        let i = 0
        let timer = setInterval(() => {
            let url = thumb[i];
            i++;
            let fileName = url.split('/').pop();
            let stream = fs.createWriteStream(path.join(dirPath, fileName));
            request(url).pipe(stream).on("close", function (err) {
                console.log("第" + i + "个文件[" + fileName + "]下载完毕");
            });
            if (i >= thumb.length) clearInterval(timer)
        }, 500 + Math.random() * 1000)
    }
    
    function rar() {
        var adm_zip = require('adm-zip');
        var unzip = new adm_zip('C:/Users/Administrator/Desktop/lolSkinUpdate/lolskonUpdate/puppeteer-pdf/file/'+ hrefArr[0].substr(hrefArr[0].lastIndexOf('/') + 1));  
        unzip.extractAllTo("C:/Users/Administrator/Desktop/lolskin/", /*overwrite*/true);
    }
})()