import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintPluginImport from 'eslint-plugin-import'
import stylisticJs from '@stylistic/eslint-plugin'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintPluginImport.flatConfigs.recommended,
      eslintPluginImport.flatConfigs.typescript
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic': stylisticJs
    },
    rules: {
      // Core Rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "curly": ["error", "all"],

      // Typescript Rules
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/keyword-spacing": "off",
      "@typescript-eslint/no-loop-func": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],
      "@typescript-eslint/no-non-null-assertion": "warn",
      ...(process.env.NODE_ENV === "lint" || process.env.CI
        ? {
          "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],
          "@typescript-eslint/no-unsafe-argument": "warn",
          "@typescript-eslint/no-unnecessary-type-assertion": "warn",
        }
        : {
          // These rules are all very slow
          "@typescript-eslint/unbound-method": "off",
          "@typescript-eslint/no-misused-promises": "off",
          "@typescript-eslint/no-unsafe-argument": "off",
          "@typescript-eslint/no-unnecessary-type-assertion": "off",
        }
      ),

      // Stylistic Rules
      "prefer-template": "error",
      "template-curly-spacing": ["error", "never"],
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/object-curly-newline": ["error", { "multiline": true }],
      "@stylistic/array-bracket-newline": ["error", { "multiline": true }],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/array-bracket-spacing": ["error", "always"],
      "@stylistic/key-spacing": ["error", { "afterColon": true }],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/eol-last": ["error", "always"],
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/comma-spacing": ["error", { "before": false, "after": true }],
      "@stylistic/block-spacing": ["error", "always"],
      "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: false }],
      "@stylistic/indent": ["error", 2],
      "@stylistic/linebreak-style": ["error", "unix"],
      "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
      "@stylistic/semi": ["error", "always"],
      "max-len": ["warn", 200],
      "max-classes-per-file": ["error", 4],
      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
          maxEOF: 0,
          maxBOF: 0,
        },
      ],
      ...(
        process.env.NODE_ENV !== "lint" && !process.env.CI && {
          "prettier/prettier": "off",
        }
      ),

      // Best Practices
      "no-await-in-loop": "off",
      "guard-for-in": "off",
      "no-plusplus": "off",
      "no-restricted-syntax": "off",
      "no-param-reassign": "off",
      "no-continue": "off",
      "no-multi-assign": "off",
      "func-names": ["warn", "as-needed"],
      "consistent-return": "off",
      "class-methods-use-this": "warn",

      // Possible Errors
      "no-cond-assign": ["error", "except-parens"],
      "no-loop-func": "off",

      // React Rules
      "@stylistic/jsx-max-props-per-line": ["error", { "maximum": { "single": 3, "multi": 1 } }],
      "@stylistic/jsx-indent": ["error", 2],
      "@stylistic/jsx-one-expression-per-line": ["error", { "allow": "non-jsx" }],
      "@stylistic/jsx-wrap-multilines": ["error", {
        "declaration": "parens-new-line",
        "logical": "parens-new-line",
        "return": "parens-new-line",
        "arrow": "parens-new-line",
        "condition": "parens-new-line",
        "prop": "parens-new-line"
      }],
      "@stylistic/jsx-curly-newline": ["error", "consistent"],
      "@stylistic/jsx-first-prop-new-line": ["error", "multiline"],
      "@stylistic/jsx-closing-bracket-location": ["error", 'tag-aligned'],
      "@stylistic/jsx-closing-tag-location": ["error", 'tag-aligned'],
      "@stylistic/jsx-tag-spacing": ["error", { "beforeSelfClosing": "always" }],

      // Accessibility Rules

      // Import Rules
      "import/no-mutable-exports": "off",
      "import/prefer-default-export": "off",
      "import/order": [
        "error",
        {
          "groups": [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "type",
          ],
          "newlines-between": "always-and-inside-groups",
          "alphabetize": { order: "asc", caseInsensitive: true },
        },
      ],
      "import/no-duplicates": "error",
      "import/no-extraneous-dependencies": "error",
      "no-restricted-imports": [
        "error",
        {
          "paths": [{
            "name": "react",
            "importNames": ["default"],
            "message": "Do not import React in React 17+ projects where it's not needed.",
          }, {
            "name": 'lodash',
            "message": "Please use `import {[package]} from 'utils/lodash.utils'` instead.",
          }, {
            "name": 'react-use',
            "message": "Please use `import {[package]} from 'utils/react-use.utils'` instead.",
          }],
          "patterns": [{
            "group": ["lodash/*"],
            "message": "Please use `import {[package]} from 'utils/lodash.utils'` instead."
          }, {
            "group": ["react-use/*"],
            "message": "Please use `import {[package]} from 'utils/react-use.utils'` instead."
          }]
        }
      ],
      ...(
        process.env.NODE_ENV !== "lint" && !process.env.CI && {
          "import/namespace": "off",
        }
      ),
    },
  },
)
