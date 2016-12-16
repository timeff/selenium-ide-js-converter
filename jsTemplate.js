const config=require('./config'),
{configLocation}=config;

module.exports=`
const By = require('selenium-webdriver').By,
until = require('selenium-webdriver').until;

require('chai').should();

const {baseUrl} = require('${configLocation}');

module.exports = (driver)=>{
  return  ()=>{
        {-actions-}
    }
}
`;