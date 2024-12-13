import Page from '@/app/(main)/page';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

test('Sign In Page', () => {
  render(<Page />);
  expect(
    screen.getByRole('heading', {
      level: 3,
      name: 'Welcome back',
    })
  ).toBeDefined();
});
