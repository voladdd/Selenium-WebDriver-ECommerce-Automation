import { expect } from "chai";
import { Builder, Browser } from "selenium-webdriver";
import LoginPage from "../pages/login.page";

let driver = new Builder().forBrowser(Browser.CHROME).build();

describe("SignUpPage Positive Test-Suite", () => {
  let loginPage = new LoginPage(driver);

  afterEach(async () => {
    await loginPage.clearLoginAndPassword();
  });

  it("First test", async () => {
    await driver.get("https://www.saucedemo.com/");
    await loginPage.inputLogin("Yo wassap");
    await loginPage.inputPassword("123");
    await loginPage.clickLoginButton();

    expect(await loginPage.getErrorMessage()).to.include("do not match");
  });
});
