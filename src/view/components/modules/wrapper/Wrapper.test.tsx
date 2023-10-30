import { render } from '@testing-library/react';
import Wrapper from './Wrapper';
import { ComponentType, ReactNode } from 'react';
import { AttributesOptionalChildren } from './Wrapper.types';

const WrappedText = ({ children, color }: { color: string; children: ReactNode }) => (
  <div data-testid="im-wrapper-component" style={{ color }}>
    {children}
  </div>
);

const wrapper = {
  component: WrappedText as unknown as ComponentType<AttributesOptionalChildren>,
  props: { color: 'red', text: 'This is a wrapped component' } as AttributesOptionalChildren,
};

describe('Wrapper Component', () => {
  test('It should be able to pass a component and its props as prop of another component.', () => {
    const { getByText } = render(
      <Wrapper component={wrapper.component} props={wrapper.props}>
        This is a wrapped text
      </Wrapper>
    );

    const text = getByText(/This is a wrapped text/i);

    expect(text.style.color).toBe('red');
  });
});
