import pluginJs from '@eslint/js'

export default [
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
    rules: {
      'no-console': 'off'
    }
  },
  pluginJs.configs.recommended
]
