import { render } from '@testing-library/react';
import Tooltip from './Tooltip';

describe('Tooltip Component', () => {
  test('It should render correctly', async () => {
    const { getByTestId } = render(
      <div data-testid="im-tooltip-wrapper-wrapper">
        <Tooltip trigger={<div data-testid="im-trigger-test">trigger</div>} content="this is a test" delay={0} />
      </div>
    );
    const tooltip = document.getElementsByClassName('im-tooltip')[0];
    expect(tooltip).toBeInTheDocument();

    const trigger = getByTestId('im-trigger-test');

    expect(trigger).toBeInTheDocument();
  });
});
