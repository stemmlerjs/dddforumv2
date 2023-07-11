import { CompositionRoot } from '@dddforum/backend/dist/shared/composition/compositionRoot';
import { RESTfulAPIDriver } from '@dddforum/backend/dist/shared/http/restfulAPIDriver';
import { sharedRoot } from '@dddforum/shared/dist/paths';
import { UserBuilder } from '@dddforum/shared/dist/users/builders/userBuilder.shared';
import { CreateUserInput } from '@dddforum/shared/dist/users/dtos/usersDTOs.shared';
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path';

const feature = loadFeature(path.join(sharedRoot, 'users/e2e/registration.feature'));

defineFeature(feature, (test) => {
  test('Successful registration', ({ given, when, then, and }) => {
    let createUserInput: CreateUserInput;
    let restfulAPIDriver: RESTfulAPIDriver;
    const compositionRoot: CompositionRoot = new CompositionRoot();
    const server = compositionRoot.getWebServer();
    let response: any;

    beforeAll(async () => {
      await server.start();

      restfulAPIDriver = new RESTfulAPIDriver(server.getHttp());
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
      response = await restfulAPIDriver.post('/users/new', createUserInput);
    });

    then('I should be granted access to my account', async () => {
      expect(response.body.success).toBeTruthy();
      expect(response.body.error).toBeFalsy();
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.email).toEqual(createUserInput.email);
      expect(response.body.data.firstName).toEqual(createUserInput.firstName);
      expect(response.body.data.lastName).toEqual(createUserInput.lastName);
      expect(response.body.data.username).toEqual(createUserInput.username);
    });

    and('I should receive an email with login instructions', () => {
      // Can't test this at this level
    });

    afterAll(async () => {
      await server.stop();
    });
  });
});
