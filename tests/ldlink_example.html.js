
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
		driver.findElement(By.linkText("LDLink")).click();
		driver.sleep(3000);
		driver.findElement(By.id("ldassoc-tab-anchor")).click();
		driver.sleep(3000);
		driver.findElement(By.css("span.slider.round")).click();
		driver.sleep(3000);
		driver.findElement(By.id("ldassoc")).click();
		driver.sleep(7000);
		driver.findElement(By.id("new-ldassoc_info")).getText().then(text=> {
			assert(text == 'Showing 1 to 10 of 141 entries');
			done();
		});


    // ----example assert text and end test-----
    // driver.findElement(By.id("message")).getText()
    // .then(text => {
    //   assert(text == 'The request has been received. An email will be sent when the calculation has completed.');
    //   done();
    // })

    driver.close();
  });
})
