import React from 'react';

import { Layout } from '../../shared/components/layout/layout';
import { NotificationService } from '../../shared/notifications/notificationService';
import { RegistrationFormView } from './components/registrationFormView';
import { RegistrationPageController } from './registrationPage.controller';

type RegisterPageComponentProps = {
  controller: RegistrationPageController;
};

const RegistrationPageContainer = ({ controller }: RegisterPageComponentProps) => {
  const hook = controller.createHook();
  const { register } = hook.useRegistrationPageController();

  return (
    <Layout title="Register">
      {NotificationService.makeNotifiable(
        <div>
          <h1>Registration Page</h1>
          <RegistrationFormView onSubmit={(formState) => register(formState)} />
        </div>,
      )}
    </Layout>
  );
};

export default RegistrationPageContainer;
