module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "boundaries"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:boundaries/recommended"
  ],
  settings: {
    "boundaries/elements": [
      {
        "type": "controllers",
        "pattern": "src/controllers"
      },
      {
        "type": "services",
        "pattern": "src/services"
      },
      {
        "type": "middlewares",
        "pattern": "src/middlewares"
      },
      {
        "type": "repositories",
        "pattern": "src/repositories",
      },
      {
        "type": "routers",
        "pattern": "src/routers",
      },
      {
        "type": "config",
        "pattern": "src/config",
      }
    ]
  },
  rules: {
    indent: ["error", 2],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "comma-spacing": ["error", { before: false, after: true }],
    "comma-dangle": ["error", "never"],
    "no-console" : "warn",
    "boundaries/element-types": [2, {
      "default": "disallow",
      "message": "${file.type} can't import ${dependency.type}",
      "rules": [
        {
          "from": ["controllers"],
          "allow": ["services", "middlewares"],
        },
        {
          "from": ["middlewares"],
          "allow": ["services", "controllers", "config"],
        },
        {
          "from": ["services"],
          "allow": ["repositories"],
        },
        {
          "from": ["routers"],
          "allow": ["controllers", "middlewares"],
        },
        {
          "from": ["repositories"],
          "allow": ["config"],
        },
      ]
    }]
  }
};