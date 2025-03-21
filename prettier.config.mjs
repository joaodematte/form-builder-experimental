/** @type {import("prettier").Config} */
export default {
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  tabWidth: 2,
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'none',
  bracketSameLine: false,
  semi: true,
  quoteProps: 'consistent',
  importOrder: ['<BUILTIN_MODULES>', '<THIRD_PARTY_MODULES>', '', '^@neomind/', '', '^@/', '', '^[../]', '^[./]'],
  importOrderTypeScriptVersion: '5.8.2',
  tailwindFunctions: ['clsx', 'cn', 'cva']
};
