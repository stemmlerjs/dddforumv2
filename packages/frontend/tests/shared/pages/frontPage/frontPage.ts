import { config } from '@dddforum/shared/dist/config/appConfig.shared';

import { PageComponents } from '../../pageComponents';
import { PuppeteerPageDriver } from '../../puppeteerPageDriver';

export class FrontPage {
  private baseUrl: string;
  private components: PageComponents;

  constructor(private driver: PuppeteerPageDriver) {
    this.driver = driver;
    this.baseUrl = config.frontend.url;
    this.components = new PageComponents(
      {
        menu: { selector: '.menu', type: 'div' },
      },
      driver,
    );
  }

  async open() {
    console.log('Open front page URL', this.baseUrl);
    await this.driver.page.goto(this.baseUrl);
  }

  public async isOnPage(): Promise<boolean> {
    const result = await this.driver.browser.waitForTarget((target) => {
      return target.url().includes(this.baseUrl);
    });

    if (result) return true;
    return false;
  }

  public async getUsernameFromMenuButton(): Promise<string | null> {
    const element = await this.driver.page.$('.menu');
    if (!element) throw new Error('could not find menu item,');
    return element?.evaluate((e) => e.textContent);
  }
}
