import { WebDriver, By, until, Key } from "selenium-webdriver";

export default class Page {
  private driver: WebDriver;
  constructor(driver: WebDriver) {
    this.driver = driver;
  }
  protected async inputField(locator: string, message: string) {
    try {
      await this.driver.findElement(By.css(locator)).sendKeys(message);
    } catch (error) {
      console.log(`NOT FOUNDED: ${locator}`);
    }
  }
  protected async clearField(locator: string) {
    try {
      await this.driver
        .findElement(By.css(locator))
        .sendKeys(Key.CONTROL, "a", Key.BACK_SPACE);
    } catch (error) {
      console.log(`NOT FOUNDED: ${locator}`);
    }
  }
  protected async clickButton(locator: string) {
    try {
      let button = this.driver.findElement(By.css(locator));
      await button.click();
    } catch (error) {
      console.log(`NOT FOUNDED: ${locator}`);
    }
  }
  protected async getFieldValue(locator: string): Promise<string | Error> {
    try {
      const element = await this.driver.wait(
        until.elementLocated(By.css(locator)),
        5 * 1000
      );
      return await element.getText();
    } catch (error: any) {
      console.log(`NOT FOUNDED: ${locator}`);
      return error;
    }
  }
  protected async isElementDisplayed(locator: string): Promise<boolean> {
    return await this.driver
      .findElement(By.css(locator))
      .isDisplayed()
      .catch(() => {
        return false;
      });
  }
  protected async getElementAttributeValue(locator: string, attribute: string) {
    return await this.driver
      .findElement(By.css(locator))
      .getAttribute(attribute);
  }
  protected async getElementCssPropertyValue(
    locator: string,
    cssProperty: string
  ) {
    return await this.driver
      .findElement(By.css(locator))
      .getCssValue(cssProperty);
  }
}
