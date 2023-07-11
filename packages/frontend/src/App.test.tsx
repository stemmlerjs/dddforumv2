import { prettyDOM } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './App';

test('renders front page', async () => {
  render(<App />);
  const frontPageElement = await screen.getByText(/front page/i);
  console.log(prettyDOM(frontPageElement));
  expect(frontPageElement).toBeDefined();
});
