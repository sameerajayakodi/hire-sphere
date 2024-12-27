import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
  {
    ignores: ["dist", "node_modules"], // Ignored directories
  },
  {
    files: ["**/*.{js,jsx}"], // Target JS and JSX files
    languageOptions: {
      ecmaVersion: "latest", // Use the latest ECMAScript features
      sourceType: "module", // Module type
      globals: globals.browser, // Use browser global variables
      parserOptions: {
        ecmaFeatures: { jsx: true }, // Enable JSX
      },
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
    plugins: {
      react, // React plugin
      "react-hooks": reactHooks, // React Hooks plugin
      "react-refresh": reactRefresh, // React Refresh plugin
    },
    rules: {
      ...js.configs.recommended.rules, // JavaScript best practices
      ...react.configs.recommended.rules, // React best practices
      ...react.configs["jsx-runtime"].rules, // JSX Runtime rules
      ...reactHooks.configs.recommended.rules, // React Hooks rules
      // Customize your ESLint rules
      "react/jsx-no-target-blank": "off", // Disable `target="_blank"` warnings
      "react/prop-types": "off", // Disable prop-types requirement (if using TypeScript)
      "react/react-in-jsx-scope": "off", // Not needed with React 17+
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ], // Enforce rules for components with Refresh
      "no-unused-vars": "off", // Disable unused variables rule
    },
  },
];
