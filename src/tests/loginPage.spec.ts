import { expect } from "chai";
import { Builder, Browser } from "selenium-webdriver";
import LoginPage from "../pages/loginPage";
import InventoryPage from "../pages/inventoryPage";

let driver = new Builder().forBrowser(Browser.CHROME).build();

describe("TS0001 - Поверка страницы логина", () => {
  let loginPage = new LoginPage(driver);

  function itTCInvalidInput(
    TC: string,
    login: string,
    password: string,
    errorExpected: string
  ) {
    it(TC, async () => {
      await loginPage.inputLoginPassword(login, password);
      await loginPage.clickLoginButton();
      expect(await loginPage.getErrorMessage()).to.equal(errorExpected);
      expect(await loginPage.isErrorMessageHaveRedColor()).to.be.true;
      await loginPage.clearLoginAndPassword();
      await loginPage.closeErrorMessage();
    });
  }

  it("TC0001 - Открытие страницы авторизации", async () => {
    await driver.get("https://www.saucedemo.com/");
    expect(await loginPage.isLoginFormDisplayed()).to.be.true;
  });

  itTCInvalidInput(
    "TC0003 - Ввод некорректных данных, отсутствует пароль",
    "standard_user",
    "",
    "Epic sadface: Password is required"
  );
  itTCInvalidInput(
    "TC0004 - Ввод некорректных данных, неправильный пароль",
    "standard_user",
    "123",
    "Epic sadface: Username and password do not match any user in this service"
  );
  itTCInvalidInput(
    "TC0005 - Ввод некорректных данных, отсутствует логин",
    "",
    "secret_sauce",
    "Epic sadface: Username is required"
  );
  itTCInvalidInput(
    "TC0006 - Ввод некорректных данных, неправильный логин",
    "aaa",
    "secret_sauce",
    "Epic sadface: Username and password do not match any user in this service"
  );
  itTCInvalidInput(
    "TC0007 - Ввод некорректных данных, неправильный логин и пароль",
    "&asd123",
    "sd456&",
    "Epic sadface: Username and password do not match any user in this service"
  );
  itTCInvalidInput(
    "TC0008 - Ввод некорректных данных, отсутствует логин и пароль",
    "",
    "",
    "Epic sadface: Username is required"
  );

  it("TC0009 - Закрытие предупреждающего сообщения", async () => {
    await loginPage.inputLoginPassword("&&5aaa", "secret_sauce");
    await loginPage.clickLoginButton();
    await loginPage.clearLoginAndPassword();
    await loginPage.closeErrorMessage();
    expect(await loginPage.isErrorMessageDisplayed()).to.be.false;
  });

  it("TC0010 - Вывод * вместо символов пароля", async () => {
    expect(await loginPage.getPasswordType()).to.equal("password");
  });

  it("TC0002 - Вход в систему с валидными данными", async () => {
    await loginPage.inputLoginPassword("standard_user", "secret_sauce");
    await loginPage.clickLoginButton();
    expect(await new InventoryPage(driver).getHeaderSecondaryTittle()).to.equal(
      "PRODUCTS"
    );
    await driver.quit();
  });
});
