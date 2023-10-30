import { ReactNode } from 'react';
import { ToastOptions, toast } from 'react-toastify';
import { ReactToastifyConfigs } from '../../../configs';
import DOMHelper from './DOM.helper';

abstract class Alert {
  private static handleZIndex(toastInstance: typeof toast) {
    toastInstance?.onChange((event) => {
      if (event.status === 'added') {
        const toasts = document.getElementsByClassName('Toastify__toast-container');
        const currentToast = toasts[toasts.length - 1] as HTMLDivElement;
        currentToast.style.zIndex = `${DOMHelper.windowNextZIndex()}`;
      }
    });
  }

  private static handleConfigs(normalizedConfig: keyof typeof ReactToastifyConfigs, instanceConfig?: ToastOptions) {
    return {
      style: { zIndex: DOMHelper.windowNextZIndex() },
      ...ReactToastifyConfigs[`${normalizedConfig}`],
      ...(instanceConfig ?? {}),
    };
  }

  static info(data: ReactNode | string, instanceConfig?: ToastOptions) {
    toast.info(data, Alert.handleConfigs('default', instanceConfig));
    Alert.handleZIndex(toast);
  }

  static error(data: ReactNode | string, instanceConfig?: ToastOptions) {
    toast.error(data, Alert.handleConfigs('default', instanceConfig));
    Alert.handleZIndex(toast);
  }

  static process(data: ReactNode | string, instanceConfig?: ToastOptions) {
    toast.error(data, Alert.handleConfigs('process', instanceConfig));
    Alert.handleZIndex(toast);
  }

  static debug(data: ReactNode | string, instanceConfig?: ToastOptions) {
    toast.warning(data, Alert.handleConfigs('debug', instanceConfig));
    Alert.handleZIndex(toast);
  }
}

export default Alert;
