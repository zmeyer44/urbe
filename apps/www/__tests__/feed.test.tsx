import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Page from '../app/(main)/page';

test('Sign In Page', () => {
  render(<Page />);
  expect(
    screen.getByRole('heading', {
      level: 3,
      name: 'Welcome back',
    })
  ).toBeDefined();
});
