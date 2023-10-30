import { render } from '@testing-library/react';
import Video from './Video';

describe('Video Component', () => {
  test('It should render correctly', () => {
    render(<Video src="http://theinvestormachine.com" title="im" />);
    const video = document.getElementsByClassName('im-video')[0];
    expect(video).toBeInTheDocument();
  });
});
