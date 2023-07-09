import React, { useState } from "react";
import { RegistrationFormProps } from "./domainObjects/registrationForm";
import { Layout } from "../../shared/components/layout/layout";
import { NotificationService } from "../../shared/notifications/notificationService";
import { RegistrationPageController } from "./registrationPage.controller";

type RegisterPageComponentProps = {
  controller: RegistrationPageController;
};

const RegistrationPageContainer = ({
  controller,
}: RegisterPageComponentProps) => {
  
  const hook = controller.createHook();
  const { register } = hook.useRegistrationPageController();

  const [formState, setFormState] = useState<RegistrationFormProps>({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
  });

  function onFormStateChanged(newState: string, field: string) {
    setFormState({
      ...formState,
      [field]: newState,
    });
  }

  return (
    <Layout title="Register">
      {NotificationService.makeNotifiable(
        <div>
          <h1>Registration Page</h1>
          <input
            onChange={(e) => onFormStateChanged(e.target.value, "email")}
            value={formState.email}
            className="email registration"
            type="email"
          />
          <input
            onChange={(e) => onFormStateChanged(e.target.value, "firstName")}
            value={formState.firstName}
            className="first-name registration"
            type="text"
          />
          <input
            onChange={(e) => onFormStateChanged(e.target.value, "lastName")}
            value={formState.lastName}
            className="last-name registration"
            type="text"
          />
          <input
            onChange={(e) => onFormStateChanged(e.target.value, "username")}
            value={formState.username}
            className="username registration"
            type="text"
          />
          <button
            onClick={() => register(formState)}
            className="submit registration"
          >
            Submit
          </button>
        </div>
      )}
    </Layout>
  );
};

export default RegistrationPageContainer;
