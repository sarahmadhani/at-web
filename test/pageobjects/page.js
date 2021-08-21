import reporter from '@wdio/allure-reporter';
import { readFileSync } from 'fs';
import { expect } from 'chai';
import mergeImg from 'merge-img';

const timeout = 30000;

const methodOptions = {
  returnAllCompareData: true,
};
export default class Page {
  open(path) {
    browser.url(path);
  }

  waitElementDisplayed(element) {
    if (!this.isElementDisplayed(element)) {
      element.waitForDisplayed({ timeout });
    }
  }

  waitElementEnabled(element) {
    if (!element.isEnabled()) {
      element.waitForEnabled({ timeout });
    }
  }

  waitElementDisabled(element) {
    if (element.isEnabled()) {
      element.waitForDisabled({ timeout });
    }
  }

  waitElementExist(element) {
    if (!element.isExisting()) {
      element.waitForExist({ timeout });
    }
  }

  clickElement(element) {
    this.waitElementDisplayed(element);
    element.click();
  }

  inputElement(element, value) {
    this.waitElementDisplayed(element);
    element.clearValue();
    element.setValue(value);
  }

  inputElementNotClearValue(element, value) {
    this.waitElementDisplayed(element);
    element.setValue(value);
  }

  clearTextElement(element) {
    element.clearValue();
  }

  titleShouldEquals(value) {
    browser.getTitle().should.equal(value);
  }

  urlShouldEquals(value) {
    browser.getUrl().should.equals(value);
  }

  urlShouldContains(value) {
    browser.getUrl().should.contains(value);
  }

  isElementDisplayed(element) {
    element.waitForDisplayed({ timeout });
    return element.isDisplayed();
  }

  isElementExisting(element) {
    this.waitElementExist(element);
    return element.isExisting();
  }

  isElementEnabled(element) {
    this.waitElementEnabled(element);
    return element.isEnabled();
  }

  isElementClickable(element) {
    this.waitElementDisplayed(element);
    return element.isClickable();
  }

  elementShouldDisplayed(element) {
    this.isElementDisplayed(element).should.be.true;
  }

  elementShouldNotDisplayed(element) {
    this.isElementDisplayed(element).should.be.false;
  }

  elementShouldNotEnabled(element) {
    this.isElementEnabled(element).should.be.false;
  }

  elementShouldNotExisting(element) {
    this.isElementExisting(element).should.be.false;
  }

  elementScrollIntoView(element) {
    element.scrollIntoView();
  }

  clickScrollElement(element) {
    this.elementScrollIntoView(element);
    this.clickElement(element);
  }

  elementScrollShouldDisplayed(element) {
    element.scrollIntoView();
    this.waitElementDisplayed(element);
    this.isElementDisplayed(element).should.be.true;
  }

  elementShouldHaveText(element, text) {
    this.waitElementDisplayed(element);
    const res = this.getElementText(element);
    expect(res).to.equal(text);
  }

  elementShouldContainsText(element, text) {
    this.waitElementDisplayed(element);
    const res = this.getElementText(element);
    expect(res).to.contains(text);
  }

  elementShouldNotContainsText(element, text) {
    const res = this.getElementText(element);
    expect(res).to.not.contains(text);
  }

  elementShouldHaveValue(element, value) {
    const res = this.getElementValue(element);
    expect(res).to.equal(value);
  }

  elementScrollInputText(element, value) {
    element.scrollIntoView();
    this.waitElementDisplayed(element);
    element.clearValue();
    element.setValue(value);
  }

  elementShouldHaveAttributeValue(element, attributeName, value) {
    this.waitElementDisplayed(element);
    const res = this.getAttributeValue(element, attributeName);
    expect(res).contains(value);
  }

  elementShouldHaveAttributeValueOnly(element, attributeName, value) {
    const res = this.getAttributeValue(element, attributeName);
    expect(res).contains(value);
  }

  elementShouldNotHaveAttributeValue(element, attributeName, value) {
    this.waitElementDisplayed(element);
    const res = this.getAttributeValue(element, attributeName);
    expect(res).not.contains(value);
  }

  waitElementNotDisplayed(element) {
    if (!this.isElementDisplayed(element)) {
      browser.waitUntil(() => this.isNotElementDisplayed(element), { timeout });
    }
  }

  waitElementClickable(element) {
    if (!this.isElementDisplayed(element)) {
      browser.waitUntil(() => this.isElementClickable(element).should.be.true, { timeout });
    }
  }

  elementShouldNotClickable(element) {
    this.isElementClickable(element).should.be.false;
  }

  alertShouldDisplayed() {
    browser.isAlertOpen();
    browser.acceptAlert();
  }

  alertShouldHaveText(text) {
    this.alertShouldDisplayed();
    const alertText = browser.getAlertText();
    expect(alertText).to.have.text(text);
  }

  elementDragAndDrop(element, target) {
    element.dragAndDrop(target);
  }

  enterBrowser() {
    browser.keys(['\ue007']);
  }

  switchWindowViaUrl(url) {
    browser.waitUntil(() => browser.switchWindow(url), {
      timeout: timeout,
      timeoutMsg: 'expected window to be show after 10s',
    });
  }
  
  setValueElementQtField(elementSelector, value){
    this.elementScrollIntoView(elementSelector);
    this.clickElement(elementSelector);
    browser.keys('End');
    let value2 = this.getAttributeValue(elementSelector, 'value');
    value2 = value2.split('');
    if (value2.length > 0) {
      value2.forEach((element) => {
        browser.keys('Backspace');
      });
    }
    elementSelector.setValue(value);
  };

  getElementValue(element) {
    return element.getValue();
  }

  getAttributeValue(element, attributeName) {
    return element.getAttribute(attributeName);
  }

  getElementText(element) {
    return element.getText();
  }

  convertToAngka(valueEelement){
    return parseInt(valueEelement.replace(/[^0-9]/g, ''), 10);
  }

  deleteValue(element) {
    const long = this.getElementValue(element).length;
    let loop;
    for (loop = 0; loop < long; loop++) {
      this.clickElement(element);
      browser.keys('Backspace');
    }
  }

  elementIsDisable(element) {
    expect(element.isEnabled()).to.equal(false);
  }

  elementIsEnable(element) {
    expect(element.isEnabled()).to.equal(true);
  }

  vtCheck(checkScreenMethod, name) {
    let res;
    try {
      browser.waitUntil(
        () => (() => {
          res = browser[checkScreenMethod](name, methodOptions);
          return res.misMatchPercentage;
        })() === 0,
        {
          timeout: timeout,
          timeoutMsg: `took more than ${timeout} to get the right screenshot`,
          interval: 7000,
        }
      );
    } catch (err) {
      console.error(err);
    };
    reporter.addAttachment('baseline path', res.folders.baseline, 'text/plain');
    if (res.misMatchPercentage !== 0) {
      browser.waitUntil(
        () => mergeImg([res.folders.baseline, res.folders.diff, res.folders.actual])
          .then((img) => img.getBuffer('image/png', (err, buffer) =>
            reporter.addAttachment('diff', buffer, 'image/png')
          )),
        {
          timeout: timeout,
          timeoutMsg: `took more than ${timeout} to attach diff screenshot`
        }
      );
    }
    expect(res.misMatchPercentage).equal(0);
  }

  visualTesting(name) {
    this.vtCheck('checkScreen', name);
  }

  visualTestingFullpage(name) {
    this.vtCheck('checkFullPageScreen', name);
  }

  attachToAllureReport(title, json, mimetype) {
    reporter.addAttachment(title, json, mimetype);
  }

  reduceQuantity(elementSelectorReduce, elementValue, valueChange){
    this.elementShouldDisplayed(elementSelectorReduce);
    this.elementScrollIntoView(elementSelectorReduce);
    let currentItems = this.getAttributeValue(elementValue, 'value');
    let index1 = valueChange;
    for (let index = parseInt(currentItems); index > index1; index--) {
      this.clickElement(elementSelectorReduce);
    }
  };

  addQuantity(elementSelectorReduce, elementValue, valueChange){
    this.elementShouldDisplayed(elementSelectorReduce);
    this.elementScrollIntoView(elementSelectorReduce);
    let currentItems = this.getAttributeValue(elementValue, 'value');
    let index1 = valueChange;
    for (let index = parseInt(currentItems); index < index1; index++) {
      this.clickElement(elementSelectorReduce);
    }
  };

  rupiahPlain(elementSelector) {
    elementScrollIntoView(elementSelector);
    let textPolos = getStringText(elementSelector).replace(/\D+/g, '');
    // textPolos = textPolos.replace('Rp', '');
    return textPolos;
  }

  getElementsLength(locator) {
    let getLength;
    browser.$$(locator, (result) => {
      getLength = result.value.length;
    });
    return getLength;
  }

}
