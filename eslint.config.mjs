import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import react from '@eslint-react/eslint-plugin';
import hooks from 'eslint-plugin-react-hooks';
import testingLibrary from 'eslint-plugin-testing-library';
import unusedImports from 'eslint-plugin-unused-imports';
import prettier from 'eslint-config-prettier';

export default [
  {ignores: ['dist/**', 'node_modules/**']},
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {jsx: true},
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        performance: 'readonly',
        console: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        Element: 'readonly',
        HTMLElement: 'readonly',
        HTMLInputElement: 'readonly',
        SVGSVGElement: 'readonly',
        Node: 'readonly',
        React: 'readonly',
        JSX: 'readonly',
      },
    },
    settings: {react: {version: 'detect'}},
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@eslint-react': react,
      'react-hooks': hooks,
      'unused-imports': unusedImports,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      // Keep existing component patterns; these migration suggestions are unrelated to lint compatibility.
      '@eslint-react/no-context-provider': 'off',
      '@eslint-react/no-use-context': 'off',
      '@eslint-react/naming-convention-ref-name': 'off',
      '@eslint-react/set-state-in-effect': 'off',
      ...tsPlugin.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      ...prettier.rules,
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
    },
  },
  {
    files: ['**/*.{spec,test}.{ts,tsx}', '**/__tests__/**/*.{ts,tsx}'],
    plugins: {'testing-library': testingLibrary},
    rules: testingLibrary.configs.react.rules,
  },
];
