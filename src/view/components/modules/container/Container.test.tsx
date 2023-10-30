import { render, screen } from '@testing-library/react';
import Container from './Container';

describe('Container Component', () => {
  test('It should render correctly', () => {
    render(<Container label="this is a container">render test</Container>);
    const container = screen.getByText(/render test/i);
    expect(container).toBeInTheDocument();
  });
  test('It should render valid state correctly', () => {
    render(<Container valid>valid test</Container>);
    const container = document.getElementsByClassName('im-valid')[0];
    expect(container).toBeInTheDocument();
  });
  test('It should render error state correctly', () => {
    render(<Container error>error test</Container>);
    const container = document.getElementsByClassName('im-errored')[0];
    expect(container).toBeInTheDocument();
  });
  test('It should render disabled state correctly', () => {
    render(<Container disabled>disabled test</Container>);
    const container = document.getElementsByClassName('im-disabled')[0];
    expect(container).toBeInTheDocument();
  });
  test('It should render focus state correctly', () => {
    render(<Container focus>focus test</Container>);
    const container = document.getElementsByClassName('im-focused')[0];
    expect(container).toBeInTheDocument();
  });
  test('It should render warning state correctly', () => {
    render(<Container warning>warning test</Container>);
    const container = document.getElementsByClassName('im-warning')[0];
    expect(container).toBeInTheDocument();
  });
  test('It should render error message correctly', async () => {
    const { findByText } = render(
      <Container showError errorMessage="this in an error">
        error message test
      </Container>
    );
    const errorMessage = await findByText(/this in an error/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
