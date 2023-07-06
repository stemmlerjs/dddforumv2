
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path'
import { RegistrationPage } from '../../shared/pages/registrationPage/registrationPage';
import { FrontPage } from '../../shared/pages/frontPage/frontPage';
import { PuppeteerPageDriver } from '../../shared/puppeteerPageDriver';
import { CreateUserInput } from '../../../../shared/users/dtos/createUserInput';
import { UserBuilder } from '../../../../shared/users/builders/userBuilder';

const feature = loadFeature(path.join(__dirname, '../../../../shared/users/e2e/registration.feature'));

defineFeature(feature, test => {
  test('Successful registration', ({ given, when, then, and }) => {
    let puppeteerPageDriver: PuppeteerPageDriver;
    let registrationPage: RegistrationPage;
    let frontPage: FrontPage;
    let createUserInput: CreateUserInput;

    beforeAll(async() => {
      puppeteerPageDriver = await PuppeteerPageDriver.create();
      registrationPage = new RegistrationPage(puppeteerPageDriver);
      frontPage = new FrontPage(puppeteerPageDriver)
    })

    afterAll(async () => {
      await puppeteerPageDriver.browser.close();
    })


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
      expect(await frontPage.isOnPage()).toBeTruthy();
    });

    and('I should receive an email with login instructions', () => {
      // Can't test this at this level
    });
  });
});