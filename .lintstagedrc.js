export default {
  '*.{ts,tsx}': [
    'eslint --fix',
    'prettier --write',
    () => 'tsc -b',
    () => 'vitest run --passWithNoTests',
  ],
  '*.{json,md,html,css}': 'prettier --write',
};
