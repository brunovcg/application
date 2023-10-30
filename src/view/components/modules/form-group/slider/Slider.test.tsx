import { render, waitFor } from '@testing-library/react';
import Slider from './Slider';
import { act } from 'react-dom/test-utils';
import user from '@testing-library/user-event';

const sliderInput = 'im-slider-input-number';
const increaseArrowId = 'im-input-number-increase';
const decreaseArrowId = 'im-input-number-decrease';

describe('Slider Component', () => {
  test('It should hide the arrows if it is not possible to increase or decrease based on max and min values', () => {
    const { getByTestId, queryByTestId } = render(<Slider max={10} min={0} initialValue={0} />);

    const decreaseArrow = queryByTestId(decreaseArrowId);
    const increaseArrow = queryByTestId(increaseArrowId);

    expect(decreaseArrow).toHaveStyle({ visibility: 'hidden' });
    expect(increaseArrow).toHaveStyle({ visibility: 'visible' });

    const inputNumber = getByTestId(sliderInput);

    act(() => {
      user.type(inputNumber, '10');
    });
    waitFor(() => {});

    const decreaseArrowAfterChange = queryByTestId(decreaseArrowId);
    const increaseArrowAfterChange = queryByTestId(increaseArrowId);

    expect(increaseArrowAfterChange).toHaveStyle({ visibility: 'hidden' });
    expect(decreaseArrowAfterChange).toHaveStyle({ visibility: 'visible' });
  });
  test('It should correct the inserted value to max if the insertion is greater than max prop', () => {
    const { getByTestId } = render(<Slider max={10} min={0} initialValue={0} />);

    const inputNumber = getByTestId(sliderInput) as HTMLInputElement;

    act(() => {
      user.type(inputNumber, '12');
    });
    waitFor(() => {});

    expect(inputNumber.value).toBe('10');
  });
  test('It should not increase if there is no available sum', () => {
    const { queryByTestId } = render(<Slider max={10} min={3} availableSum={0} initialValue={4} maxSum={3} setAvailableSum={() => {}} />);

    const increaseArrow = queryByTestId(increaseArrowId);
    expect(increaseArrow).toHaveStyle({ visibility: 'hidden' });
  });
  test('It should not increase if there is no available sum', () => {
    const { getByTestId } = render(<Slider max={10} min={3} initialValue={4} value={5} />);

    const resetButton = getByTestId('im-slider-reset');

    act(() => {
      user.click(resetButton);
    });
    waitFor(() => {});
    const slider = getByTestId(sliderInput) as HTMLInputElement;

    expect(slider.value).toBe('4');
  });
  test('It should render increase or decrease by the correct step', () => {
    const { getByTestId } = render(<Slider max={10} min={3} step={2} />);

    const increaseArrow = getByTestId(increaseArrowId) as HTMLButtonElement;

    act(() => {
      user.click(increaseArrow);
    });
    waitFor(() => {});
    const slider = getByTestId(sliderInput) as HTMLInputElement;
    expect(slider.value).toBe('5');
  });
});
