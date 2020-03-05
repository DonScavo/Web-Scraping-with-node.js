const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page =  await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="landingImage"]');
    const src = await el.getProperty('src');
    const imgUrl = await src.jsonValue();

    const [el2] = await page.$x('//*[@id="productTitle"]');
    const txt = await el2.getProperty('textContent');
    const title = await txt.jsonValue();

    const [el3] = await page.$x('//*[@id="mbc-price-1"]');
    const txt2 = await el3.getProperty('textContent');
    const price = await txt2.jsonValue();

    console.log({imgUrl, title, price});

    browser.close();
}

scrapeProduct('https://www.amazon.es/Apple-iPhone-11-64-GB-en-Malva/dp/B07XS4J1XS/ref=sr_1_1_sspa?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&keywords=iphone&qid=1583370482&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUExVksxRFIyV0VOWkQ3JmVuY3J5cHRlZElkPUEwMTYyNTY5MkZWUUtIT1ZJRk8zQiZlbmNyeXB0ZWRBZElkPUEwMjUwOTA4M1MwWU5JQk5MUjRCQyZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU=');
