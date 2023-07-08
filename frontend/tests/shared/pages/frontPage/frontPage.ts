

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
    let result = await this.driver.browser.waitForTarget(
      target => target.url() === this.baseUrl
    );

    if (result) return true;
    return false;
  }

  public async getUsernameFromMenuButton (): Promise<string | null> {
    await this.components.load();
    return this.components.get('menu').evaluate((e) => e.textContent);
  }
}