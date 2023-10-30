import { render, screen } from '@testing-library/react';
import Section from './Section';

describe('Section Component', () => {
  test('It should render correctly', () => {
    render(
      <Section sectionTitle="This is a title">
        <div className="im-section-children">Testing</div>
      </Section>
    );
    const title = screen.getByText(/This is a title/i);
    expect(title).toBeInTheDocument();
    const content = screen.getByText(/Testing/i);
    expect(content).toBeInTheDocument();
  });
});
