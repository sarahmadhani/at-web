import Page from './page';

class Dashboarde extends Page {
  idListByIndex(char) {
    return $(`${char}`);
  }
  userNameListByIndex(char) {
    return $(`${char}`);
  }
  sourceBankListByIndex(char) {
    return $(`${char}`);
  }
  destinationBankListByIndex(char) {
    return $(`${char}`);
  }
  AmountListByIndex(char) {
    return $(`${char}`);
  }

  verifyIndex(Line, ID, userName, sourceBank, destinationBank, Amount) {
    super.elementShouldHaveText(this.idListByIndex(Line), ID);
    super.elementShouldHaveText(this.userNameListByIndex(Line), userName);
    super.elementShouldHaveText(this.sourceBankListByIndex(Line), sourceBank);
    super.elementShouldHaveText(
      this.destinationBankListByIndex(Line),
      destinationBank
    );
    super.elementShouldHaveText(this.AmountListByIndex(Line), Amount);
  }
}

export default new Dashboarde();
