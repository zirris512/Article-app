import puppeteer from "puppeteer";

export const scraper = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://blog.logrocket.com");
    await page.waitForSelector(".featured-posts");
    const data = await page.$$eval(".featured-posts .card", (els) => {
        return els.map((el) => {
            const title = el.querySelector(".card-title a")?.textContent;
            const description = el.querySelector(".card-text")?.textContent;
            const link = el.querySelector<HTMLAnchorElement>(".card-title a")?.href;
            return {
                title,
                description,
                link,
            };
        });
    });
    return data;
};
