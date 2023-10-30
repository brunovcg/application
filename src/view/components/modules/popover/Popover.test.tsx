import { render, waitFor } from '@testing-library/react';
import Popover from './Popover';
import { act } from 'react-dom/test-utils';
import user from '@testing-library/user-event';

const popover = (
  <div>
    <Popover trigger={<div>trigger</div>} content={<span>this is a content</span>} title="popover title" />
    <div id="im-app-popover-root" />
  </div>
);

describe('Popover Component', () => {
  test('It should render trigger correctly', () => {
    const { getByText } = render(popover);
    const trigger = getByText(/trigger/i);
    expect(trigger).toBeInTheDocument();
  });
  test('It should render content and title when trigger is clicked', async () => {
    const { getByText } = render(popover);
    const trigger = getByText(/trigger/i);
    act(() => {
      user.click(trigger);
    });
    await waitFor(() => {});

    const content = getByText(/this is a content/i);
    const title = getByText(/popover title/i);

    expect(content).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
