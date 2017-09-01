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

    // -----example pause for 3 seconds-----
    // driver.findElement(By.linkText("Pathway Analysis Tool")).click().then(function() {
    //   driver.sleep(3000);
    // });
    // -----example get path of example test file-----
    // driver.findElement(By.id("study_1")).sendKeys(examplesDirectory.concat(['study2.txt']).join(path.sep)).then(function() {
    //   driver.sleep(1000);
    // });

    driver.get("https://analysistools-sandbox.nci.nih.gov"+"/");
		driver.findElement(By.linkText("Pathway Analysis Tool")).click();
		driver.sleep(3000);
		driver.findElement(By.id("ui-id-3")).click();
		driver.findElement(By.id("deleteStudy_1")).click();
		driver.findElement(By.xpath("(//button[@type='button'])[6]")).click();


    // ----example assert text and end test-----
    driver.findElement(By.id("message")).getText()
    .then(text => {
      assert(text != 'The request has been received. An email will be sent when the calculation has completed.');
      done();
    })

    driver.close();
  });
})
