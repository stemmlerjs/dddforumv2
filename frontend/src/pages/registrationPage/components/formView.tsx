
import React from 'react';
import { useState } from "react";
import { RegistrationFormProps } from "../domainObjects/registrationForm";

export const FormView = ({ onSubmit }: { onSubmit: (props: RegistrationFormProps) => void }) => {
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
    <>
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
        onClick={() => onSubmit(formState)}
        className="submit registration"
      >
        Submit
      </button>
    </>
  );
};
