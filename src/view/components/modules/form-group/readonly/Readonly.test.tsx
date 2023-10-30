import { render } from '@testing-library/react';
import Readonly from './Readonly';

describe('Readonly Component', () => {
  test('It should render correctly, its text and label content.', () => {
    const { getByText } = render(<Readonly text="im a text" label="im a label" />);
    const text = getByText(/im a text/i) as HTMLInputElement;
    const label = getByText(/im a label/i);

    expect(text).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });
});
