import React from 'react';
import { useState } from 'react';

import { RegistrationFormProps } from '../domainObjects/registrationForm';

export const RegistrationFormView = ({ onSubmit }: { onSubmit: (props: RegistrationFormProps) => void }) => {
  const [formState, setFormState] = useState<RegistrationFormProps>({
    email: '',
    firstName: '',
    lastName: '',
    username: '',
  });

  function onFormStateChanged(newState: string, field: string) {
    setFormState({
      ...formState,
      [field]: newState,
    });
  }
  return (
    <>
      <input
        onChange={(e) => onFormStateChanged(e.target.value, 'email')}
        value={formState.email}
        className="email registration"
        type="email"
        placeholder="Email"
      />
      <input
        onChange={(e) => onFormStateChanged(e.target.value, 'firstName')}
        value={formState.firstName}
        className="first-name registration"
        type="text"
        placeholder="First name"
      />
      <input
        onChange={(e) => onFormStateChanged(e.target.value, 'lastName')}
        value={formState.lastName}
        className="last-name registration"
        type="text"
        placeholder="Last name"
      />
      <input
        onChange={(e) => onFormStateChanged(e.target.value, 'username')}
        value={formState.username}
        className="username registration"
        type="text"
        placeholder="Username"
      />
      <button onClick={() => onSubmit(formState)} className="submit registration">
        Submit
      </button>
    </>
  );
};
