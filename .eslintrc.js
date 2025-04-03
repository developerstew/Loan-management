/* eslint-env node */
module.exports = {
  root: true,
  ignores: ['.next/*', 'node_modules/*', 'dist/*', 'build/*', 'coverage/*'],
  extends: [
    'next/core-web-vitals',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'tailwindcss'],
  parser: '@typescript-eslint/parser',
  rules: {
    'tailwindcss/classnames-order': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
        projectService: true,
        tsconfigRootDir: __dirname,
      },
      extends: [
        'next/core-web-vitals',
        'plugin:@typescript-eslint/recommended',
        'plugin:tailwindcss/recommended',
        'prettier',
      ],
      rules: {
        'tailwindcss/classnames-order': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
      },
    },
  ],
};
