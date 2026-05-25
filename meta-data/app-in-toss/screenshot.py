import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1932, "height": 828})
        await page.goto("file:///Users/keewon/Documents/pi_finder/meta-data/screenshot-memorize.html")
        await page.wait_for_timeout(2000)
        await page.screenshot(path="/Users/keewon/Documents/pi_finder/meta-data/screenshot-memorize.png")
        await browser.close()
        print("Saved: screenshot-memorize.png")

asyncio.run(main())
