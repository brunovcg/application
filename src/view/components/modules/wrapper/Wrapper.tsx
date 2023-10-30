import { AttributesOptionalChildren, WrapperProps } from './Wrapper.types';

export default function Wrapper<ComponentProps extends AttributesOptionalChildren>({
  component: Component,
  props,
  children,
}: WrapperProps<ComponentProps>) {
  return (
    <Component className="im-wrapper" {...props}>
      {children}
    </Component>
  );
}
