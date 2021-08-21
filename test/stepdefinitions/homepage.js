import homepage from '../pageobjects/homepage';
import { When, Then, Given } from '@cucumber/cucumber';

Given(/^a web browser is at Flip.id$/, () => {
  homepage.open('https://flip.id/');
});

Then(/^User can see '([^"]*)'$/, (char) => {
  homepage.verifyButton(char);
});

Then(/^User is in '([^"]*)'$/, (char) => {
  browser.pause(5000);
  homepage.urlShouldEquals(char);
});

Then(/^User can click '([^"]*)'$/, (char) => {
  homepage.clickButton(char);
});
