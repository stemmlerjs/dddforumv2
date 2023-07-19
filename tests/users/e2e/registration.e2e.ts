
import { defineFeature, loadFeature } from 'jest-cucumber';
import { RESTfulAPIDriver } from '../../../src/shared/http/restfulAPIDriver';
import { CreateUserInput } from '../../../src/modules/users/dtos/userDTOs'
import path from 'path';
import { UserBuilder } from '../builders/userBuilder';
import { Server } from 'http';
import { CompositionRoot } from '../../../src/shared/composition/compositionRoot'

const feature = loadFeature(path.join(__dirname, './registration.feature'));

defineFeature(feature, (test) => {
  test('Successful registration', ({ given, when, then, and }) => {

    let root = new CompositionRoot()
    let webServer = root.getWebServer();
    
    let driver: RESTfulAPIDriver;
    let createUserInput: CreateUserInput;
    let response;
    
    beforeAll(async () => {
      // Start the server
      await webServer.start()
      driver = new RESTfulAPIDriver(webServer.getHttp() as Server)

      // Clear out the database (reset it)
    })

    afterAll(async () => {
      // Stop the server
      await webServer.stop()
    })

    given('I am a new user', () => {
      createUserInput = new UserBuilder()
        .withFirstName('Khalil')
        .withLastName('Stemmler')
        .withRandomUsername()
        .withRandomEmail()
        .build()
    });

    when('I register with valid account details', async () => {
      response = await driver.post('/users/new', createUserInput)
    });

    then('I should be granted access to my account', () => {
      expect(response.body.success).toBeTruthy();
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.email).toEqual(createUserInput.email)
      expect(response.body.data.firstName).toEqual(createUserInput.firstName)
      expect(response.body.data.lastName).toEqual(createUserInput.lastName)
      expect(response.body.data.username).toEqual(createUserInput.username)
    });

    and('I should receive an email with login instructions', () => {
      // Can't test at this level, let's verify this at a deeper level
    });
  });
});