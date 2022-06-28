import Page from "./page";

export default class LoginPage extends Page {
  private loginLocator = "input[type='text']";
  private passwordLocator = "input[type='password']";
  private loginButtonLocator = "input[id='login-button']";
  private errorLocator = "h3[data-test='error']";

  async inputLogin(login: string) {
    this.inputField(this.loginLocator, login);
  }
  async inputPassword(password: string) {
    this.inputField(this.passwordLocator, password);
  }
  async clearLoginAndPassword() {
    this.clearField(this.loginLocator);
    this.clearField(this.passwordLocator);
  }
  async clickLoginButton() {
    this.clickButton(this.loginButtonLocator);
  }
  async getErrorMessage(): Promise<string | Error> {
    let message = await this.getFieldValue(this.errorLocator);
    return message;
  }
}
