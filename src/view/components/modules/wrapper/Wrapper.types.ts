import { ComponentType, ReactNode } from 'react';

export type AttributesOptionalChildren = Omit<JSX.IntrinsicAttributes, 'children'> & {
  children?: ReactNode;
};

export type WrapperProps<ComponentProps> = {
  component: ComponentType<ComponentProps>;
  props: ComponentProps;
  children?: ReactNode;
};
