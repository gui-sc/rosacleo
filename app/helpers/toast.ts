import { toast, ToastPosition } from 'react-toastify';

// Funções para exibir os toasts
export const showToast = (message: string, type = 'default') => {
  const toastOptions = {
    position: 'top-right' as ToastPosition,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    // Custom styles based on the type of toast
    style: {
      backgroundColor:  'white',
      color: 'black',
    },
  };

  switch (type) {
    case 'success':
      toast.success(message, toastOptions);
      break;
    case 'error':
      toast.error(message, toastOptions);
      break;
    case 'info':
      toast.info(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
      break;
  }
};
