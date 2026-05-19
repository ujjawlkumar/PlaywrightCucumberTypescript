module.exports = {

  default: {

    require: [
      'src/steps/**/*.ts',
      'src/hooks/**/*.ts'
    ],

    requireModule: ['ts-node/register'],

    format: [
      'progress',
      'allure-cucumberjs/reporter'
    ],

    formatOptions: {
      resultsDir: 'allure-results'
    },

    publishQuiet: true
  }
};