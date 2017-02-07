
const By = require('selenium-webdriver').By,
until = require('selenium-webdriver').until;

require('chai').should();

const {baseUrl} = require('../../configs/config');

module.exports = (driver)=>{
  return  ()=>{
        driver.get(baseUrl+"/nter-typeselect/");
		driver.findElement(By.xpath("//div[@id='fn-pages']/div/div/div/div[2]/div[3]/a/div/div/img")).click();
		driver.wait(until.elementLocated(By.xpath("//a[@id='onedaybuyClick']/button")),10000);
		driver.findElement(By.xpath("//a[@id='onedaybuyClick']/button")).click();
		driver.wait(until.elementLocated(By.id("ltf-title")),10000);
		driver.findElement(By.id("ltf-title")).click();
		driver.wait(until.elementLocated(By.css("span.fund-title-card.")),10000);
		driver.findElement(By.css("span.fund-title-card.")).click();
		driver.wait(until.elementLocated(By.id("amount")),10000);
		driver.findElement(By.id("amount")).sendKeys('200000');
		driver.findElement(By.id("submit-fund")).click();
		driver.wait(until.elementLocated(By.css("span.mdl-button__ripple-container")),10000);
		driver.findElement(By.css("span.mdl-button__ripple-container")).click();
		
    }
}
