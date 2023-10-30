import { render } from '@testing-library/react';
import AddressField from './AddressField';

describe('AddressDetailDialog > AddressField Component', () => {
  test('AddressField renders correctly', () => {
    render(<AddressField text="im a address" label="im a label" />);
    const addressField = document.getElementsByClassName('im-address-field')[0];
    expect(addressField).toBeInTheDocument();
  });
});
