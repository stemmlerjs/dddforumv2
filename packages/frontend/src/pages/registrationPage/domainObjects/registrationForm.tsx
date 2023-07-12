import { CreateUserInput } from '@dddforum/shared/dist/users/dtos/usersDTOs.shared';

export interface RegistrationFormProps {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
}

/**
 * @type Domain object
 * @description Domain objects are the decision-makers. They decide whether you
 * should continue with requests or not. They encapsulate validation logic and so on.
 * Anytime you intend to perform a state-changing, command-like behaviour by sending
 * a request to the backend, know that it must typically first pass through a domain object
 * to determine if we should even continue with the request or not.
 */

export class RegistrationForm {
  private props: RegistrationFormProps;

  constructor(props: RegistrationFormProps) {
    this.props = props;
  }

  public static create(props: RegistrationFormProps): RegistrationForm | Error {
    // Validate basically
    if (!props.email.includes('@')) return new Error('Invalid email');
    if (props.firstName.length < 1 || props.firstName.length > 20) return new Error('Invalid firstName');
    if (props.lastName.length < 1 || props.lastName.length > 20) return new Error('Invalid lastName');
    if (props.username.length < 1 || props.lastName.length > 20) return new Error('Invalid username');

    return new RegistrationForm(props);
  }

  public toCreateUserDTO(): CreateUserInput {
    return {
      username: this.props.username,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
    };
  }
}
