import React from 'react';
import { useSnackbar, VariantType, WithSnackbarProps, OptionsObject, SnackbarKey } from "notistack";

let useSnackbarRef: WithSnackbarProps;

export const SnackbarUtilsConfigurator = () => {
  useSnackbarRef = useSnackbar();
  return null;
}

export default {
  success(msg: string, options: OptionsObject = {}) {
    this.toast(msg, { ...options, variant: 'success' })
  },
  warning(msg: string, options: OptionsObject = {}) {
    this.toast(msg, { ...options, variant: 'warning' })
  },
  info(msg: string, options: OptionsObject = {}) {
    this.toast(msg, { ...options, variant: 'info' })
  },
  error(msg: string, options: OptionsObject = {}) {
    this.toast(msg, { ...options, variant: 'error' })
  },
  toast(msg: string, options: OptionsObject = {}) {
    useSnackbarRef.enqueueSnackbar(msg, options)
  },
  closeSnackbar(snackbarId?: SnackbarKey) {
    if (snackbarId === undefined) {
      useSnackbarRef.closeSnackbar();
    } else {
      useSnackbarRef.closeSnackbar(snackbarId);
    }
  }
}