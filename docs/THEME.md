# Theme System

This document describes the Emotion-based theme system with light and dark mode support.

## Overview

The application uses **Emotion** (CSS-in-JS) for styling with a comprehensive theme system that supports both light and dark modes. Theme state is managed via Redux and persisted in localStorage.

## Architecture

### Components

1. **Theme Types** (`src/theme/types.ts`) - TypeScript interfaces for type-safe theming
2. **Theme Constants** (`src/theme/constants.ts`) - Light and dark theme definitions
3. **Theme Slice** (`src/store/themeSlice.ts`) - Redux state management for theme mode
4. **ThemeProvider** (`src/theme/ThemeProvider.tsx`) - Emotion ThemeProvider with Redux integration
5. **Type Declarations** (`src/theme/emotion.d.ts`) - TypeScript declarations for Emotion

### Flow Diagram

```
┌─────────────────────┐
│  User toggles theme │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────┐
│  Redux action: toggleTheme  │
│  or setTheme('dark')        │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│  Theme state updated        │
│  state.theme.mode = 'dark'  │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│  Saved to localStorage      │
│  'theme_mode' = 'dark'      │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│  ThemeProvider selector     │
│  gets updated mode          │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│  Emotion ThemeProvider      │
│  provides darkTheme         │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│  All styled components      │
│  re-render with new theme   │
└─────────────────────────────┘
```

## Usage

### 1. Using the useTheme Hook

The `useTheme` hook provides access to the current theme in any component:

```tsx
import { useTheme } from '../../theme';

const MyComponent = () => {
  const theme = useTheme();

  return (
    <div
      style={{
        color: theme.colors.text.primary,
        backgroundColor: theme.colors.background.primary,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
      }}
    >
      Hello World
    </div>
  );
};
```

### 2. Using Styled Components

Create styled components with Emotion that automatically have access to the theme:

```tsx
import styled from '@emotion/styled';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  transition: all ${({ theme }) => theme.transitions.duration.normal}
    ${({ theme }) => theme.transitions.easing.easeInOut};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.brand.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const MyComponent = () => {
  return (
    <Container>
      <Title>Welcome</Title>
      <p>This is a themed component</p>
    </Container>
  );
};
```

### 3. Toggling Theme

Use Redux actions to change the theme:

```tsx
import { useDispatch } from 'react-redux';

import { setTheme, toggleTheme } from '../../store/themeSlice';

const ThemeToggle = () => {
  const dispatch = useDispatch();

  return (
    <div>
      {/* Toggle between light and dark */}
      <button onClick={() => dispatch(toggleTheme())}>Toggle Theme</button>

      {/* Set specific theme */}
      <button onClick={() => dispatch(setTheme('light'))}>Light Theme</button>
      <button onClick={() => dispatch(setTheme('dark'))}>Dark Theme</button>
    </div>
  );
};
```

### 4. Using css Prop

Emotion supports the `css` prop for inline styles with theme access:

```tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useTheme } from '../../theme';

const MyComponent = () => {
  const theme = useTheme();

  return (
    <div
      css={css`
        background-color: ${theme.colors.background.secondary};
        padding: ${theme.spacing.lg};
        border: 1px solid ${theme.colors.border.primary};

        &:hover {
          background-color: ${theme.colors.background.tertiary};
          border-color: ${theme.colors.border.focus};
        }
      `}
    >
      Hover me!
    </div>
  );
};
```

## Theme Structure

### Colors

```typescript
colors: {
  // Background colors
  background: {
    primary: string;    // Main background
    secondary: string;  // Secondary background (sidebars, cards)
    tertiary: string;   // Tertiary background (hover states)
  },

  // Text colors
  text: {
    primary: string;    // Main text color
    secondary: string;  // Secondary text (descriptions, captions)
    disabled: string;   // Disabled text
    inverse: string;    // Inverse text (on dark backgrounds)
  },

  // Brand colors
  brand: {
    primary: string;    // Primary brand color
    secondary: string;  // Secondary brand color
    accent: string;     // Accent color (darker/lighter variant)
  },

  // Status colors
  status: {
    success: string;    // Success messages, indicators
    warning: string;    // Warning messages
    error: string;      // Error messages
    info: string;       // Info messages
  },

  // Border colors
  border: {
    primary: string;    // Default border color
    secondary: string;  // Secondary border color
    focus: string;      // Focus/active border color
  },

  // Surface colors (cards, modals, etc)
  surface: {
    primary: string;    // Main surface color
    secondary: string;  // Secondary surface color
    tertiary: string;   // Tertiary surface color
  },
}
```

### Spacing

```typescript
spacing: {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
}
```

### Border Radius

```typescript
borderRadius: {
  sm: '4px',
  md: '8px',
  lg: '12px',
  full: '9999px',
}
```

### Typography

```typescript
typography: {
  fontFamily: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ...',
    mono: '"SF Mono", Monaco, "Cascadia Code", ...',
  },

  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '24px',
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },
}
```

### Shadows

```typescript
shadows: {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), ...',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), ...',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), ...',
}
```

### Transitions

```typescript
transitions: {
  duration: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
  },

  easing: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
}
```

### Breakpoints

```typescript
breakpoints: {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
}
```

## Light vs Dark Theme

### Light Theme

- **Background**: White (#FFFFFF), light grays
- **Text**: Dark grays to black
- **Shadows**: Light, subtle shadows
- **Brand**: Vibrant blues (#0066FF)

### Dark Theme

- **Background**: Dark blues/blacks (#0D1117, #161B22)
- **Text**: Light grays to white (#E6EDF3)
- **Shadows**: Darker, more pronounced shadows
- **Brand**: Lighter blues (#3385FF) for better contrast

## Advanced Usage

### Responsive Styles

Use breakpoints for responsive design:

```tsx
import styled from '@emotion/styled';

const ResponsiveContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;
```

### Dynamic Styles Based on Props

```tsx
import styled from '@emotion/styled';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button = styled.button<ButtonProps>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all ${({ theme }) => theme.transitions.duration.fast};

  ${({ theme, variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.brand.primary};
          color: ${theme.colors.text.inverse};
        `;
      case 'secondary':
        return `
          background-color: ${theme.colors.surface.secondary};
          color: ${theme.colors.text.primary};
        `;
      case 'danger':
        return `
          background-color: ${theme.colors.status.error};
          color: ${theme.colors.text.inverse};
        `;
    }
  }}

  &:hover {
    opacity: 0.9;
  }
`;

// Usage
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Delete</Button>
```

### Theme-aware Utilities

Create reusable style utilities:

```tsx
import { css } from '@emotion/react';

// Usage
import { useTheme } from '../../theme';
import type { Theme } from '../theme/types';

export const cardStyles = (theme: Theme) => css`
  background-color: ${theme.colors.surface.primary};
  border: 1px solid ${theme.colors.border.primary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
`;

export const inputStyles = (theme: Theme) => css`
  background-color: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.border.primary};
  color: ${theme.colors.text.primary};
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};

  &:focus {
    border-color: ${theme.colors.border.focus};
    outline: none;
  }
`;

const MyComponent = () => {
  const theme = useTheme();

  return (
    <div css={cardStyles(theme)}>
      <input css={inputStyles(theme)} />
    </div>
  );
};
```

## Persistence

Theme preference is automatically persisted to localStorage:

- **Key**: `theme_mode`
- **Values**: `'light'` | `'dark'`
- **Behavior**:
  - On app load, theme is restored from localStorage
  - If no saved preference, defaults to `'light'`
  - Every theme change is automatically saved

## Testing with Themes

When writing tests, wrap components with ThemeProvider:

```tsx
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { render } from '@testing-library/react';

import { lightTheme } from '../theme/constants';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<EmotionThemeProvider theme={lightTheme}>{component}</EmotionThemeProvider>);
};

// Usage
test('renders correctly', () => {
  const { getByText } = renderWithTheme(<MyComponent />);
  expect(getByText('Hello')).toBeInTheDocument();
});
```

## Best Practices

### 1. Always use theme values

❌ **Bad**:

```tsx
const Component = styled.div`
  color: #333;
  padding: 16px;
  border-radius: 8px;
`;
```

✅ **Good**:

```tsx
const Component = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;
```

### 2. Use semantic color names

❌ **Bad**:

```tsx
background-color: ${({ theme }) => theme.colors.brand.primary};
// For a delete button background
```

✅ **Good**:

```tsx
background-color: ${({ theme }) => theme.colors.status.error};
// For a delete button background
```

### 3. Extract reusable styles

❌ **Bad**: Repeating the same styles across multiple components

✅ **Good**: Create utility functions or base styled components

### 4. Use transitions for smooth theme switching

```tsx
const Component = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  transition:
    background-color ${({ theme }) => theme.transitions.duration.normal},
    color ${({ theme }) => theme.transitions.duration.normal};
`;
```

## Related Files

- **Theme Types**: `src/theme/types.ts`
- **Theme Constants**: `src/theme/constants.ts`
- **Theme Slice**: `src/store/themeSlice.ts`
- **ThemeProvider**: `src/theme/ThemeProvider.tsx`
- **Type Declarations**: `src/theme/emotion.d.ts`
- **Integration**: `src/apps/Dashboard/bootstrap.tsx`

## Troubleshooting

### Issue: TypeScript errors when accessing theme

**Solution**: Make sure you have the emotion.d.ts declaration file and it's included in your tsconfig.json

### Issue: Theme not updating when toggling

**Solution**: Ensure:

1. Component is wrapped in ThemeProvider
2. Using theme values from `useTheme()` or styled components
3. Redux store is properly configured with theme slice

### Issue: localStorage not persisting

**Solution**: Check browser console for errors. Ensure localStorage is available (not in incognito mode)

### Issue: Styled components not getting theme types

**Solution**: Import from `@emotion/styled` and ensure emotion.d.ts is in your project
