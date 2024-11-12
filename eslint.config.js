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
      "indent": [
        "error",
        2
      ],
      "linebreak-style": [
        "error",
        "unix"
      ],
      "quotes": [
        "error",
        "single"
      ],
      "semi": [
        "error",
        "never"
      ],
      "@stylistic/jsx-max-props-per-line": ["error", { "maximum": { "single": 3, "multi": 1 } }],
      "@stylistic/jsx-indent": ["error", 2],
      "@stylistic/jsx-one-expression-per-line": "error",
      "@stylistic/jsx-wrap-multilines": ["error", { "declaration": "parens-new-line", "logical": "parens-new-line", "return": "parens-new-line" }],
      "@stylistic/jsx-curly-newline": ["error", "consistent"],
      "@stylistic/jsx-first-prop-new-line": ["error", "multiline"],
      "@stylistic/jsx-closing-bracket-location": ["error", 'tag-aligned'],
      "@stylistic/jsx-closing-tag-location": ["error", 'tag-aligned'],
      "@stylistic/jsx-tag-spacing": ["error", { "beforeSelfClosing": "always" }],
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
      "@typescript-eslint/keyword-spacing": "off",
      "no-await-in-loop": "off",
      "guard-for-in": "off",
      "max-len": ["warn", 200],
      "no-plusplus": "off",
      "no-restricted-syntax": "off",
      "no-param-reassign": "off",
      "no-underscore-dangle": ["warn", { allow: ["_id", "_text"] }],
      "no-console": "off",
      "no-continue": "off",
      "no-cond-assign": ["error", "except-parens"],
      "no-multi-assign": "off",
      "func-names": ["warn", "as-needed"],
      "consistent-return": "off",
      "max-classes-per-file": ["error", 4],
      "import/no-mutable-exports": "off",
      "import/prefer-default-export": "off",
      "no-loop-func": "off",
      "@typescript-eslint/no-loop-func": "off",
      "class-methods-use-this": "warn",
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
      "@typescript-eslint/no-non-null-assertion": "warn",
      "import/order": [
        "warn",
        {
          "newlines-between": "always-and-inside-groups",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/no-named-as-default-member": "off",
      "import/no-named-as-default": "off",
      "@typescript-eslint/consistent-type-imports": "error",
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
          "import/namespace": "off",
          "prettier/prettier": "off",
        }
      ),
    },
  },
)
