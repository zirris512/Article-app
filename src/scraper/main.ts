import puppeteer from "puppeteer";

export const scraper = async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto("https://blog.logrocket.com");
    await page.waitForSelector(".featured-posts .card");
    const data = await page.$$eval(".featured-posts .card", (els) => {
        return els.map((el) => el.querySelector(".card-title a")?.textContent);
    });
    return data;
};
