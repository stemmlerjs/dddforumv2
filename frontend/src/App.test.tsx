import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {prettyDOM} from '@testing-library/dom'

test('renders front page', async () => {
  render(<App />);
  let frontPageElement = await screen.getByText(/front page/i);
  console.log(prettyDOM(frontPageElement))
  expect(frontPageElement).toBeDefined();
});
