import * as React from 'react';
import { toast, ToastContainer } from 'react-toastify';

export class NotificationService {
  showSuccess(message: string, id?: string) {
    toast.success(message, {
      toastId: id ? id : 'success-toast',
    });
  }

  showError(message: string, id?: string) {
    toast.error(message, {
      toastId: id ? id : 'error-toast',
    });
  }

  public static makeNotifiable(children: JSX.Element) {
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {children}
      </>
    );
  }
}
