import puppeteer, { Browser, Page, PuppeteerLaunchOptions } from 'puppeteer';

export class PuppeteerPageDriver {
  constructor(public browser: Browser, public page: Page) {}

  public static async create(_options?: PuppeteerLaunchOptions) {
    const browserInstance = await puppeteer.launch();
    const page = await browserInstance.newPage();
    return new PuppeteerPageDriver(browserInstance, page);
  }
}
