import { useNavigate } from 'react-router-dom';

import { UserRepository } from '../../modules/users/repos/userRepo';
import { NotificationService } from '../../shared/notifications/notificationService';
import { UsersState } from '../../shared/persistence/globalState';
import { RegistrationForm, RegistrationFormProps } from './domainObjects/registrationForm';

export class RegistrationPageController {
  constructor(private notifications: NotificationService, private userRepo: UserRepository) {}

  createHook() {
    const notifications = this.notifications;
    const userRepo = this.userRepo;

    /**
     * React has silly rules about the 'use' phrase having to be at the
     * start of the hooks and stuff like that. We want to be able to do things
     * our way. The intention of the design here is to simplify what the view needs to
     * know about. Just `controllers` and `presenters`. That's it. Nothing else.
     *
     * The only reason I'm using a hook here is because I want the ability to
     * use the 'useNavigate' hook.
     *
     * This is a good start for our E2E tests, but when we get to testing this at
     * the application layer, we'll have to move things around.
     */

    function useRegistrationPageController() {
      const navigate = useNavigate();
      return {
        register: (registrationFormProps: RegistrationFormProps) => {
          // Validate the form
          const registrationFormOrError = RegistrationForm.create(registrationFormProps);

          if (registrationFormOrError instanceof Error) {
            // If the form is invalid, then we have to throw a failure toast
            notifications.showError('Oh, the form is invalid');
            return;
          }

          userRepo.createUser(
            registrationFormOrError,
            (_u: UsersState) => {
              notifications.showSuccess('Created! Good stuff.');
              setTimeout(() => navigate('/'), 2000);
            },
            (_error: unknown) => {
              notifications.showError('Ahh, something went wrong');
            },
          );
        },
      };
    }
    return { useRegistrationPageController };
  }
}
