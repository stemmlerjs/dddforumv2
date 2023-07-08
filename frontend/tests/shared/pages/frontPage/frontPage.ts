

import { PageComponents } from "../../pageComponents";
import { PuppeteerPageDriver } from "../../puppeteerPageDriver";
import { config } from '../../../../src/shared/config'

export class FrontPage {

  private baseUrl: string;
  private components: PageComponents;

  constructor (private driver: PuppeteerPageDriver) {
    this.driver = driver;
    this.baseUrl = config.frontend.url as string;
    this.components = new PageComponents({
      menu: { selector: '.menu', type: 'div' },
    }, driver);
  }

  async open () {
    await this.driver.page.goto(this.baseUrl);
  }

  public async isOnPage(): Promise<boolean> {
    console.debug(this.baseUrl, 'base url')
    let result = await this.driver.browser.waitForTarget(
      target => {
        return target.url().includes(this.baseUrl)
      }, 
    );

    if (result) return true;
    return false;
  }

  public async getUsernameFromMenuButton (): Promise<string | null> {
    let element = await this.driver.page.$('.menu');
    if (!element) throw new Error('could not find menu item,');
    return element?.evaluate((e) => e.textContent);
  }
}