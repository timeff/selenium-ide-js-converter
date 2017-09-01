# Selenium IDE JS Converter
Javascript Converter for html file that is generated from Selenium IDE.

#Installation
```
npm i selenium-ide-js-converter
```

#Dependencies
I use these dependencies for the project. but you can change it to match your preference
```
selenium-webdriver
mocha
assert
```
Download latest version of geckodriver (Mozilla Firefox Webdriver). Put in main directory.

####Usage:
```
// Converter.js

    const seleniumConverter = require('selenium-ide-js-converter');

// -----Template for converted JavaScript file.---------
// Just put '{-actions-}' on this template
// and converter will inject JavaScript Selenium commands into it.

    let template = `
    const By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

    require('chai').should();

    module.exports = (driver)=>{
    return  ()=>{
            {-actions-}
        }
    }
    `;

// seleniumConverter takes 4 arguments ------------------------
// 1) the path to the folder where you put html files generated
//   by Selenium IDE
// 2) the path where you want to get converted JavaScript files
// 3) JavaScript Template
// 4) Base url for testing

// In this example, I've created two folders called 'html'
// (put Selenium html files in this folder) and 'js' in the
// same directory of this file.

    seleniumConverter('html','js',template,'https://www.google.co.th');
```

####Supported command:
```
open
click
clickAndWait
waitForElementPresent
waitForTitle
type
typeAndWait
select

// need -> require('chai').should();
assetText
assertTitle
```

####Modification:
To add more command or change some variables name in converted JavaScript files, you can checkout 'mappingOrder' variable in 'interpretOrder' function.
