import { render, act, waitFor } from '@testing-library/react';
import DatePicker from './high-order-components/DatePicker';
import user from '@testing-library/user-event';

const getCalendar = () => document.getElementsByClassName('p-datepicker-calendar')[0] ?? null;

describe('DatePicker Component', () => {
  test('It should render correctly and open the calendar after a click', () => {
    const { getByPlaceholderText } = render(<DatePicker placeholder="Placeholder calendar" />);

    const datePicker = getByPlaceholderText(/Placeholder calendar/i);

    expect(getCalendar()).not.toBeInTheDocument();

    expect(datePicker).toBeInTheDocument();

    act(() => {
      user.click(datePicker);
    });

    waitFor(() => {});

    expect(getCalendar()).toBeInTheDocument();
  });
});
