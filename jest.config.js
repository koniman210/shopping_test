// jestでtypescriptのファイルをテストするのに必要：https://typescriptbook.jp/tutorials/jest
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
