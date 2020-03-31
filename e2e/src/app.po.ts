import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  isLoginPage(): Promise<boolean> {
    return element(by.css('sector-root sector-login-form')).isDisplayed() as Promise<boolean>;
  }
}
