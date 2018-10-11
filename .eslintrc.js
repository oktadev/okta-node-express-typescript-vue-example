module.exports = {
	extends: [ "leankit", "leankit/es6" ],
	plugins: [
		"typescript"
	],
	parserOptions: {
		ecmaVersion: 7,
		sourceType: "module"
	},
	parser: "typescript-eslint-parser",
	env: {
		node: true
	},
	rules: {
		"arrow-parens": [ "error", "always" ],
		"typescript/no-unused-vars": "warn",
	},
	overrides: {
		files: [ "**/*.ts" ],
		parser: "typescript-eslint-parser",
		rules: {
			"no-undef": "off"
		}
	}
};