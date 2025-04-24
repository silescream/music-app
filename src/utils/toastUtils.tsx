import { toast } from 'react-toastify';

export const showSuccessToast = (text: string) => {
  toast.success(
    <div data-testid='toast-success'>{text}</div>
  );
};

export const showErrorToast = (text: string) => {
  toast.error(
    <div data-testid='toast-error'>{text}</div>
  );
};