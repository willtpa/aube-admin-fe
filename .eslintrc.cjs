/** @type { import("eslint").Linter.Config } */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    'eslint-comments/no-restricted-disable': [
      'error',
      '@typescript-eslint/no-explicit-any'
    ],
    'indent': ['error', 4], // Enforce 4-space indentation
    // 'prettier/prettier': ['error', {
    //   'tabWidth': 4,
    //   'useTabs': false
    // }],
    "@typescript-eslint/explicit-function-return-type": ["error"],
    "@typescript-eslint/explicit-module-boundary-types": ["error"],
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/array-type": ["error", { "default": "array" }],
    "@typescript-eslint/no-extra-non-null-assertion": "error",
    "@typescript-eslint/no-this-alias": "error",
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-unsafe-return": "error",
    "no-var": "error",
    "prefer-const": "error",
    "no-unused-expressions": "error",
    "no-console": "warn",
    "no-debugger": "error",
    "no-magic-numbers": ["warn", { "ignore": [0, 1], "ignoreArrayIndexes": true }]
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'eslint-comments'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte'],
    project: './tsconfig.json'
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: './tsconfig.eslint.json'  // Use the new tsconfig for ESLint
      },
      // rules: {
      //   'indent': ['error', 4], // Enforce 4-space indentation for .svelte files
      //   'prettier/prettier': ['error', {
      //     'tabWidth': 4,
      //     'useTabs': false
      //   }]
      // }
    }
  ]
};