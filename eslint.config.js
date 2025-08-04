/**
 * eslint.config.js
 * ESLint configuration for a React (JSX) project using Vite.
 *
 * Author: Yumi Takuma
 */

import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  // Ignore build output
  { ignores: ["dist"] },

  // JavaScript + JSX config
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ...js.configs.recommended.languageOptions,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // Base JS recommended rules
      ...js.configs.recommended.rules,

      // React rules
      ...react.configs.recommended.rules, // e.g., no-unused-prop-types, no-direct-mutation-state, etc.

      // React hooks rules
      ...reactHooks.configs.recommended.rules,

      // React refresh (HMR)
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Allow unused uppercase vars (for components or constants)
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
  },

  // Vitest test file config
  {
    files: ["**/*.{test,spec}.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.vitest,
        ...globals.node,
      },
    },
  },
];
