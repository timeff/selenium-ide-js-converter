# Selenium IDE JS Converter
Converter for html file that is generated from Selenium IDE.


####How to use:
- create folders to store html files and js output files
- Put html files in 'html' folder
- Modify 'node_modules/selenium-ide-js-converter/jsTemplate.js' to match your requirement

```
I have attached some default template along with this package. 
I'm now using webdriver and chai for this test. You can freely modify this template.
Just don't forget to put '{-actions-}' which is where your test actions will be put on.
```

- use the command "require('selenium-ide-js-converter')('html folder name','js folder name')" and you will get js file in js output folder


#Installation
```
npm i selenium-ide-js-converter
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
assetText
assertTitle
```

To add more command you can put it in 'mappingOrder' variable in 'interpretOrder' function.

