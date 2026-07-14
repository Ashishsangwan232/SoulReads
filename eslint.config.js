import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Without this, no-unused-vars can't tell that e.g. `motion` is "used" by
      // <motion.div>/<S.Button> (JSX member-expression tags) and flags it as
      // dead code -- this was producing real false positives across the app.
      'react/jsx-uses-vars': 'error',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    // Context files intentionally export both a Provider component and its
    // paired useXyz() hook from the same file -- the standard React context
    // pattern. This only costs dev-mode Fast Refresh granularity (editing a
    // context file remounts more than just that component), which isn't worth
    // splitting all of these into two files each to avoid.
    files: ['src/context/**/*.{js,jsx}', 'src/components/UIFeedback/**/*.{js,jsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
]
