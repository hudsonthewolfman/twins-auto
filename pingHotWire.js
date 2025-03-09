const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--disable-http2'], // Force HTTP/1.1 if needed
    });
    const page = await browser.newPage();

    // Set user-agent and headers
    await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
    );
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-US,en;q=0.9',
    });

        const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}/${day}/${year}`;
        // return `${year}-${month}-${day}`;
    };
    
    const currentDate = new Date();
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    
    const formattedCurrentDate = formatDate(currentDate);
    const formattedTomorrowDate = formatDate(tomorrowDate);
    
    const url = `https://www.hotwire.com`;
    // const url = `https://www.hotwire.com/car-rentals/search?origin=LIH&originLocation=Lihue%2C%20HI%2C%20United%20States%20of%20America%20(LIH)&originType=AIRPORT&start=2024-11-28T10%3A00%3A00&end=2024-11-29T10%3A00%3A00`;
    // const url = `https://www.hotwire.com/car-rentals/search?origin=Lihue%20(LIH%20-%20Lihue)&destination=&d1=${formattedCurrentDate}&d2=${formattedTomorrowDate}&start=${formattedCurrentDate}T10:00:00&end=${formattedTomorrowDate}T10:00:00`;
    
    await page.goto(url, { waitUntil: 'networkidle2' });

    // // Click the element with data-bdd="farefinder-option-cars"
    await page.click('[data-bdd="farefinder-option-cars"]');

    const location = 'Lihue, HI, United States of America (LIH)'
    await page.type(
        "input[placeholder='Enter city, address or airport']",
        location
      );
    // await page.type(
    //     "input[name='pickupDate']",
    //     formattedCurrentDate
    // )
    // await page.type(
    //     "input[name='dropoffDate']",
    //     formattedTomorrowDate
    // )

    await page.click('[data-bdd="farefinder-car-search-button"]');

    // try {
    //     // Wait for the element to appear
    //     await page.waitForSelector('.price-blocks__price.price-blocks__price--retail', { timeout: 60000 });

    //     // Extract the inner HTML of the first matching element
    //     const priceHtml = await page.evaluate(() => {
    //         const priceElement = document.querySelector('.price-blocks__price.price-blocks__price--retail');
    //         return priceElement ? priceElement.innerHTML.trim() : null;
    //     });

    //     console.log('Inner HTML of the first price block:', priceHtml);
    // } catch (error) {
    //     console.error('Error finding or extracting the price block:', error);
    // } finally {
    //     await browser.close(); // Ensure the browser closes even on error
    // }
})();