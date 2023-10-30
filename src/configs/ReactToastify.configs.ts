import { ToastOptions } from 'react-toastify';

abstract class ReactToastifyConfigs {
  static default: ToastOptions = {
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  };

  static process: ToastOptions = { autoClose: false, position: 'top-right', closeOnClick: false, icon: false };

  static debug: ToastOptions = { autoClose: false, position: 'bottom-center', closeOnClick: false, icon: false };
}

export default ReactToastifyConfigs;
