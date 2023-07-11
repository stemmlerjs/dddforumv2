import { sharedRoot } from '@dddforum/shared/dist/paths';
import { UserBuilder } from '@dddforum/shared/dist/users/builders/userBuilder.shared';
import { CreateUserInput } from '@dddforum/shared/dist/users/dtos/usersDTOs.shared';
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path';

import { FrontPage } from '../../shared/pages/frontPage/frontPage';
import { RegistrationPage } from '../../shared/pages/registrationPage/registrationPage';
import { PuppeteerPageDriver } from '../../shared/puppeteerPageDriver';

const feature = loadFeature(path.join(sharedRoot, 'users/e2e/registration.feature'));

defineFeature(feature, (test) => {
  test('Successful registration', ({ given, when, then, and }) => {
    let puppeteerPageDriver: PuppeteerPageDriver;
    let registrationPage: RegistrationPage;
    let frontPage: FrontPage;
    let createUserInput: CreateUserInput;

    beforeAll(async () => {
      puppeteerPageDriver = await PuppeteerPageDriver.create();
      registrationPage = new RegistrationPage(puppeteerPageDriver);
      frontPage = new FrontPage(puppeteerPageDriver);
    });

    afterAll(async () => {
      await puppeteerPageDriver.browser.close();
    });

    given('I am a new user', async () => {
      createUserInput = new UserBuilder()
        .withFirstName('Khalil')
        .withLastName('Stemmler')
        .withUsername('stemmlerjs')
        .withRandomEmail()
        .build();

      await registrationPage.open();
    });

    when('I register with valid account details', async () => {
      await registrationPage.registerWithAccountDetails(createUserInput);
    });

    then('I should be granted access to my account', async () => {
      expect(await registrationPage.isSuccessToastVisible()).toBeTruthy();
      await puppeteerPageDriver.page.waitForTimeout(4000);
      expect(await frontPage.getUsernameFromMenuButton()).toContain(createUserInput.username);
    });

    and('I should receive an email with login instructions', () => {
      // Can't test this at this level
    });
  });
});
