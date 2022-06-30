import Page from "./page";

export default class InventoryPage extends Page {
  private headerSecondaryContainerLocator = ".header_secondary_container";
  private headerSecondaryTittle = `${this.headerSecondaryContainerLocator} > span`;
  private headerSecondarySort = `${this.headerSecondaryContainerLocator} > select`;

  async getHeaderSecondaryTittle(): Promise<string | Error> {
    return await this.getFieldValue(this.headerSecondaryTittle);
  }
}
