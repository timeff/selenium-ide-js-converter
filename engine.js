// Load Dependencies
const fs = require('fs');

// Load Configs, Template
const config=require('./config'),
fileTemplate=require('./jsTemplate'),
{waitTime}=config;



function elementExtractor(tag,doc){
	let startTag = `<${tag}>`;
	let stopTag = `</${tag}>`;
	let tagLen = tag.length;
	let elem = [];
	

	while(doc.indexOf(startTag)!==-1){
		let startPos = doc.indexOf(startTag)+tagLen+2;
		let stopPos = doc.indexOf(stopTag);

		elem.push(doc.slice(startPos,stopPos));
		doc=doc.slice(stopPos+tagLen+3);
	}

	return elem;
}


function elementExtractorOrder(tag,doc){
	let docArray = elementExtractor(tag,doc);
	
	// Error handle---------------------------
	if(docArray.length!==3){
		throw `ERROR: Can't create order object (number of <td> element not equal 3)`;
	}

	let orderObject={
		order:docArray[0],
		selector:docArray[1],
		mis:docArray[2]
	};

	return orderObject;
}



function getAllOrder(doc){
	let allOrder = [];

	let tables = elementExtractor('tbody',doc);

	// Error handle---------------------------
	if (tables.length!==1) throw `ERROR: only one <tbody> element accept`;

	tables.forEach(table=>{
		tableEach = elementExtractor('tr',table);
		// Error handle---------------------------
		if (tableEach.length===0) throw `ERROR: need at least one command (<tr> element)`;

			tableEach.forEach(trs=>{
				trsEach=elementExtractorOrder('td',trs)
				allOrder.push(trsEach);
			})
	})

	return allOrder;
}

function convertXhtml(text){
	let entityMap = {
		'&amp;':'&',
		'&gt;':'>',
		'&lt;':'<',
		'&quot;':'"',
		'&nbsp;':' '
	};

	for(var e in entityMap){
		text=text.replace(new RegExp(e,'g'),entityMap[e]);
	}

	return text;
}



function interpretOrder(order){
	// use {-selector-},{-mis-}
	let findElementOrder=`driver.findElement({-selector-})`;
	let mappingOrder={
		'open':`driver.get(baseUrl+"{-selector-}");`,
		'click':`${findElementOrder}.click();`,
		'clickAndWait':`${findElementOrder}.click();`,

		'waitForElementPresent':`driver.wait(until.elementLocated({-selector-}),${waitTime});`,
		'waitForTitle':`driver.wait(until.titleIs({-selector-})),${waitTime});`,

		'type':`${findElementOrder}.sendKeys('{-mis-}');`,
		'typeAndWait':`${findElementOrder}.sendKeys('{-mis-}');`,
		
		'select':`${findElementOrder}.sendKeys('{-mis-}');`,

		'assertText':`${findElementOrder}.getText().then(text=>text.should.equal('{-mis-}'));`,

		'assertTitle':`driver.getTitle().then(title=>title.should.equal('{-selector-}'));`
	}


	if(!mappingOrder[order]) throw `ERROR: order type: '${order}' is not supported`;

	return mappingOrder[order];
}

function interpretSelector(selector){
	selector=convertXhtml(selector);
	let template;
	let startPos;

	if(selector.indexOf('css=')!==-1){
		template='By.css("{-body-}")';
		startPos=4;
	}

	if(selector.indexOf('id=')!==-1){
		template='By.id("{-body-}")';
		startPos=3;
	}

	if(selector.indexOf('//')!==-1){
		template='By.xpath("{-body-}")';
		startPos=0;
	}

	if(selector.indexOf('xpath=')!==-1){
		template='By.xpath("{-body-}")';
		startPos=6;
	}

	if(selector.indexOf('link=')!==-1){
		template='By.linkText("{-body-}")';
		startPos=5;
	}

	if(selector.indexOf('name=')!==-1){
		template='By.name("{-body-}")';
		startPos=5;
	}
	
	
	if(template){
		return template.replace('{-body-}',selector.slice(startPos));
	}

	return selector;
}

function interpretMis(mis){
	if(mis.indexOf('label=')!==-1){
		return mis.slice(6);
	}

	return mis;
}

function interpretActions(orderObj){
	let {order,selector,mis} = orderObj;
	let action;

	action=interpretOrder(order);
	action=action.replace('{-selector-}',interpretSelector(selector));
	action=action.replace('{-mis-}',interpretMis(mis));

	return action
}

function insertActions(fileTemplate,testHtml){
	allOrders=getAllOrder(testHtml);
	let actions='';

	allOrders.forEach(order=>{
		textOrder=interpretActions(order)+'\n		';
		actions+=textOrder;
	})

	if (fileTemplate.indexOf('{-actions-}') === -1) throw `ERROR: there should be '{-action-}' in jsTemplate.js file for order injection`;

	return fileTemplate.replace('{-actions-}',actions);
}

function writeFile(dirnameJs,filename,testHtml){
	fs.writeFile(dirnameJs+filename+'.js',insertActions(fileTemplate,testHtml),err=>{
		if (err) throw err;
		console.log('Created '+filename+'.js already');
	})
}


function readFiles(dirnameHtml,dirnameJs,onFileContent) {
  fs.readdir(dirnameHtml, (err, filenames)=>{
    if (err) throw err;
    filenames.forEach(filename=>{
      fs.readFile(dirnameHtml + filename, 'utf-8',(err, testHtml)=>{
        if (err) throw err;
        onFileContent(dirnameJs,filename,testHtml);
      });
    });
  });
}


// Init
function init(dirnameHtml,dirnameJs){
	readFiles(dirnameHtml,dirnameJs,writeFile);
}

init('./html/','./js/');