import js from '@eslint/js'
import globals from 'globals'
import json from '@eslint/json'
import eslintPluginYml from 'eslint-plugin-yml'

export default [
    { ignores: ['**/*.min.js'] },
    {
        files: ['**/*.js', '**/*.mjs'],
        languageOptions: { ecmaVersion: 'latest', sourceType: 'script', globals: { ...globals.browser }},
        rules: {
            ...js.configs.recommended.rules,
            'indent': 'off', 'no-unexpected-multiline': 'off', // allow whitespace anywhere
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
    { files: ['**/*.yaml, **/*.yml'], ...eslintPluginYml.configs['flat/standard'][1] }
]
