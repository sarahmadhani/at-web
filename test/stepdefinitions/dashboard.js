import dashboard from '../pageobjects/dashboard';
import { Then, Given } from '@cucumber/cucumber';

Given(/^Admin open dashboard and login$/, () => {
  dashboard.open('');
});

Then(/^User can see data on Dashboar Admin like database$/, (dataTable) => {
  const respDataTable = dataTable.hashes();
  for (const {
    Line,
    ID,
    userName,
    sourceBank,
    destinationBank,
    Amount,
  } of respDataTable) {
    dashboard.verifyIndex(
      Line,
      ID,
      userName,
      sourceBank,
      destinationBank,
      Amount
    );
  }
});
