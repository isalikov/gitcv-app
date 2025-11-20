import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

describe('Example Test', () => {
  it('should render a simple component', () => {
    const TestComponent = () => <div>Hello, Vitest!</div>;

    render(<TestComponent />);

    expect(screen.getByText('Hello, Vitest!')).toBeInTheDocument();
  });

  it('should pass a simple assertion', () => {
    expect(1 + 1).toBe(2);
  });
});
