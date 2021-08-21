import Page from './page';

class Homepage extends Page {
  buttonNav(char) {
    return $(`//ul[@class="nav pull-left"]//a[text()="${char}"]`);
  }

  clickButton(char) {
    super.clickElement(this.buttonNav(char));
  }

  verifyButton(char) {
    super.waitElementDisplayed(this.buttonNav(char));
    super.elementShouldDisplayed(this.buttonNav(char));
  }
}

export default new Homepage();
