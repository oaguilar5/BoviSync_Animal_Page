import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  render(<App />);
  const pElement = screen.getByText(/Thank you for trying out my site! Click on the link below to return to the Dashboard/i);
  expect(pElement).toBeInTheDocument();
});



