import { containerClasses, containerVariants } from '../Container.types';

export default {
  label: {
    control: 'text',
  },
  disabled: {
    control: 'boolean',
  },
  variant: {
    control: 'select',
    options: containerVariants,
  },
  className: {
    control: 'check',
    options: containerClasses,
  },
  errorMessage: {
    control: 'text',
  },
  showError: {
    control: 'boolean',
  },
  width: {
    control: 'text',
  },
  requiredLabel: {
    control: 'boolean',
  },
  optionalLabel: {
    control: 'boolean',
  },
};
