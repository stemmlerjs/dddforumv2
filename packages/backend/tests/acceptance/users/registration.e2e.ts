
import { CompositionRoot } from '@dddforum/backend/src/shared/composition/compositionRoot';
import { UserBuilder } from '@dddforum/shared/tests/users/builders/userBuilder.shared';
import { CreateUserInput } from '@dddforum/shared/src/users/dtos/usersDTOs.shared';
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path';
import { sharedTestRoot } from '@dddforum/shared/src/paths';
import { DDDForumAPI } from '@dddforum/shared/src/api/dddForumAPI'


const feature = loadFeature(path.join(sharedTestRoot, 'users/e2e/registration.feature'));

defineFeature(feature, (test) => {
  test('Successful registration', ({ given, when, then, and }) => {
    let createUserInput: CreateUserInput;
    let api: DDDForumAPI;
    const compositionRoot: CompositionRoot = new CompositionRoot();
    const server = compositionRoot.getWebServer();
    let response: any;

    beforeAll(async () => {
      // Todo: clean the database
      await server.start();
      api = new DDDForumAPI();
    });

    given('I am a new user', async () => {
      createUserInput = new UserBuilder()
        .withFirstName('Khalil')
        .withLastName('Stemmler')
        .withUsername('stemmlerjs')
        .withRandomEmail()
        .build();
    });

    when('I register with valid account details', async () => {
      response = await api.createNewUser(createUserInput);
    });

    then('I should be granted access to my account', async () => {
      expect(response.data.success).toBeTruthy();
      expect(response.data.error).toBeFalsy();
      expect(response.data.data.id).toBeDefined();
      expect(response.data.data.email).toEqual(createUserInput.email);
      expect(response.data.data.firstName).toEqual(createUserInput.firstName);
      expect(response.data.data.lastName).toEqual(createUserInput.lastName);
      expect(response.data.data.username).toEqual(createUserInput.username);
    });

    and('I should receive an email with login instructions', () => {
      // Can't test this at this level
    });

    afterAll(async () => {
      await server.stop();
      // Todo: clean the database
    });
  });

  test('Invalid account details', ({ given, when, then, and }) => {
    given('I am a new user', (details) => {
      
    });

    when('I register with invalid account details', () => {

    });

    then('I should see an error message', () => {

    });

    and('I should not be granted access to my account', () => {

    });
  });

  test('Account already exists', ({ given, and, when, then }) => {
    given('I am a new user', () => {

    });

    and('I have an existing account', () => {

    });

    when('I register with valid account details', () => {

    });

    then('I should see an error message', () => {

    });

    and('I should not be granted access to my account', () => {

    });
  });

  
});
