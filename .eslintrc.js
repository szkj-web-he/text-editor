module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    env: {
        es2017: true,
        es2020: true,
        es2021: true,
        es6: true,
    },
    parserOptions: {
        project: "./tsconfig.json",
        // tsconfigRootDir: __dirname,
        // ecmaVersion: 2020,
        sourceType: "module",
        ecmaVersion: "latest",
        ecmaFeatures: {
            jsx: true,
        },
    },
    ignorePatterns: ["*.scss", "*.js"],
    plugins: ["react", "react-hooks", "@typescript-eslint", "unicorn"],
    settings: {
        react: {
            version: "17.0.2",
        },
        "import/resolver": {
            alias: {
                map: [["~", "./src/"]],
                extensions: [".ts", ".js", ".tsx"],
            },
        },
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",

        "prettier",
    ],
    rules: {
        "react/react-in-jsx-scope": "off",
        "react/react-in-jsx-scope": "off",
    },
    reportUnusedDisableDirectives: true,
    overrides: [
        {
            files: ["Webpack/*.ts"],
            rules: {
                "@typescript-eslint/no-unsafe-assignment": "off",
                "@typescript-eslint/no-unsafe-call": "off",
            },
        },
    ],
};
