import js from '@eslint/js'
import globals from 'globals'
import stylisticJS from '@stylistic/eslint-plugin-js'
import json from '@eslint/json'
import regexp from 'eslint-plugin-regexp'
import yml from 'eslint-plugin-yml'

export default [
    { ignores: ['**/*.min.js'] },
    {
        files: ['**/*.js', '**/*.mjs'],
        languageOptions: { ecmaVersion: 'latest', sourceType: 'script', globals: { ...globals.browser }},
        plugins: { regexp, 'js-styles': stylisticJS },
        rules: {
            ...js.configs.recommended.rules, ...regexp.configs['flat/recommended'].rules,
            'indent': 'off', 'no-unexpected-multiline': 'off', // allow whitespace anywhere
            'js-styles/no-trailing-spaces': 'error', // ...except at ends of lines
            'quotes': ['error', 'single', { 'allowTemplateLiterals': true }], // enforce single quotes except backticks to avoid escaping quotes
            'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }], // enforce spacing in object properties
            'comma-dangle': ['error', 'never'], // enforce no trailing commas in arrays or objects
            'no-async-promise-executor': 'off', // allow promise executor functions to be async (to accomodate await lines)
            'no-constant-condition': 'off', // allow constant conditions
            'no-empty': 'off', // allow empty blocks
            'no-inner-declarations': 'off', // allow function declarations anywhere
            'no-useless-escape': 'off', // allow all escape chars cause ESLint sucks at detecting truly useless ones
            'no-unused-vars': ['error', { 'caughtErrors': 'none' }] // allow unused named args in catch blocks
        }
    },
    { files: ['**/*.mjs'], languageOptions: { sourceType: 'module' }},
    { files: ['**/*.json'], ignores: ['**/package-lock.json'], language: 'json/json', ...json.configs.recommended },
    { files: ['**/*.yaml, **/*.yml'], ...yml.configs['flat/standard'][1] }
]
