import Page from "./page";

export default class LoginPage extends Page {
  private loginLocator = "input[type='text']";
  private passwordLocator = "input[type='password']";
  private loginButtonLocator = "input[id='login-button']";
  private errorMessageLocator = "h3[data-test='error']";
  private loginFormLocator = "#login_button_container";

  async inputLoginPassword(login: string, password: string) {
    await this.inputField(this.loginLocator, login);
    await this.inputField(this.passwordLocator, password);
  }
  async clearLoginAndPassword() {
    await this.clearField(this.loginLocator);
    await this.clearField(this.passwordLocator);
  }
  async clickLoginButton() {
    await this.clickButton(this.loginButtonLocator);
  }
  async getErrorMessage(): Promise<string | Error> {
    return await this.getFieldValue(this.errorMessageLocator);
  }
  async closeErrorMessage() {
    await this.clickButton(`${this.errorMessageLocator} > button`);
  }
  async isErrorMessageDisplayed(): Promise<boolean> {
    return await this.isElementDisplayed(this.errorMessageLocator);
  }
  async isLoginFormDisplayed(): Promise<boolean> {
    return await this.isElementDisplayed(this.loginFormLocator);
  }
  async getPasswordType(): Promise<string | Error> {
    return await this.getElementAttributeValue(this.passwordLocator, "type");
  }
}
