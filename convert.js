// Converter.js

const seleniumConverter = require('./engine.js');

// -----Template for converted JavaScript file.---------
// Just put '{-actions-}' on this template
// and converter will inject JavaScript Selenium commands into it.

// let template = `
// var should = require('chai').should();
//
// var webdriver = require('selenium-webdriver'),
//     By = webdriver.By,
//     until = webdriver.until;
//
// var driver = new webdriver.Builder()
//     .forBrowser('firefox')
//     .build();
//
// {-actions-}
// `;

let template = `
const assert = require('assert');
const path = require('path');
const test = require('selenium-webdriver/testing');
const webdriver = require('selenium-webdriver'),
By = webdriver.By,
until = webdriver.until;

describe(path.basename(__filename), function() {
  test.it('should use the gaussian mode', function(done) {
    this.timeout(0);
    var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

    let examplesDirectory = __dirname.split(path.sep).concat(['examples']);

    // -----example get path of example test file-----
    // driver.findElement(By.id("study_1")).sendKeys(examplesDirectory.concat(['study2.txt']).join(path.sep)).then(function() {
    //   driver.sleep(1000);
    // });

    {-actions-}

    driver.close();
  });
})
`;

seleniumConverter('html_tests','tests', template, 'https://analysistools-sandbox.nci.nih.gov');
