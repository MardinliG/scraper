const puppeteer = require('puppeteer');

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Utilisez un en-tête User-Agent personnalisé
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    await page.goto('https://www.imdb.com/chart/top/?ref_=nv_mv_250',);
    await page.click('.ipc-title-link-wrapper')  
    const movies = await page.evaluate(() => 
    Array.from(document.querySelectorAll('.ipc-metadata-list-summary-item__tc'), (e) => {
        const titleElement = e.querySelector('.ipc-title');
        const yearElement = e.querySelector('.cli-title-metadata-item:first-child');
        const dureeElement = e.querySelector('.cli-title-metadata-item:nth-child(2)');
        const ratingElement = e.querySelector('.cli-title-metadata-item:nth-child(3)');
        const starsElement = e.querySelector('.ipc-rating-star');
       // ----------------------------------------------------------------------------------------
        const realisateurElement = e.querySelector('.ipc-link--baseAlt');
        const caractersElement = e.querySelector('.ipc-inline-list');
        const synopsisElement = e.querySelector('.sc-d3701649-2 cPgMft');


        return {
            title: titleElement ? titleElement.innerText.trim() : null,
            year: yearElement ? yearElement.innerText.trim() : null,
            duree: dureeElement ? dureeElement.innerText.trim() : null,
            pegi: ratingElement ? ratingElement.innerText.trim() : null,
            rating : starsElement ? starsElement.innerText.trim() : null,
            realisateur : realisateurElement ? realisateurElement.innerText.trim() : null,
            caracters : caractersElement ? caractersElement.innerText.trim() : null,
            synopsis : synopsisElement ? synopsisElement.innerText.trim() : null

        };
    })
);


    console.log(movies);

    await browser.close();
}

run();
