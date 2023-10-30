import { render } from '@testing-library/react';
import InjectHtml from './InjectedHTML';

const htmlString = '<div class="im-injected-div"><span class="im-injected-span">This is an Injected div</span></div>';

describe('InjectHtml Component', () => {
  test('It should render correctly the stringifiedHTML.', () => {
    const { getByText } = render(<InjectHtml html={htmlString} />);
    const injectedText = getByText(/This is an Injected div/i) as HTMLInputElement;
    expect(injectedText).toBeInTheDocument();

    const div = document.getElementsByClassName('im-injected-div')[0];
    const span = document.getElementsByClassName('im-injected-span')[0];
    expect(div).toBeInTheDocument();
    expect(span).toBeInTheDocument();

    const isDiv = document.querySelector('div');
    expect(isDiv).toBeInTheDocument();
  });
});
