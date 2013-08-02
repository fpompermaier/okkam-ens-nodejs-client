#!/usr/bin/env node

var host = 'api.okkam.org';
var port = 80;
var http = require('http');
var name = 'Flavio Pompermaier';
var usage = 'Usage: $0 [-v|-a|-e|-r|-d] [--type [person|location|organization]]';
usage += ' [--matching-module=[fbem|jm]] --name \"keywords\"'
querystring = require('querystring')
optimist = require('optimist')

var argv = optimist
			.boolean(['v','a', 'e','r','d'])
			.alias('v', 'verbose')
    			.describe('v', 'Show all possible infos')
			.alias('a', 'alternative-ids')
    			.describe('a', 'Show entity\'s alternative ids')
			.alias('e', 'equivalent-ids')
				.describe('e', 'Show entity\'s equivalent ids')
			.alias('r', 'show-refs')
				.describe('r', 'Show entity\'s references')
			.alias('d', 'show-attributes')
				.describe('d', 'Show entity\'s attributes details')
				.describe('type', 'Set query entity type (default: any)')
				.describe('name', 'Set query keywords')
				.describe('mm', 'Set query matching module (default: fbem)')
			.default('type', 'any')
			.default('mm', 'fbem')
			.demand(['type','name','mm'])
			.usage(usage)
			.argv;
var args = argv._;



if(args.length > 0){
	console.log('\n\t Invalid arguments! '+ args+ '\n');
	optimist.showHelp()
	process.exit(code=0)
}

var verbose = argv.v;
var show_alternatives = argv.a; // OK
var show_equivalents = argv.e; // OK
var show_profile_references = argv.r; // OK
var show_profile_attributes = argv.d; // OK

console.log('-----------------------------------');
console.log('\t DEBUG INFO');	
console.log('-----------------------------------');
console.log('\t Verbose: '+ verbose);
console.log('\t Aid: '+ show_alternatives);
console.log('\t Eid: '+ show_equivalents);
console.log('\t Profile refs: '+ show_profile_references);
console.log('\t Profile attr: '+ show_profile_attributes);
//-------------------------------------------------------

jsearch(argv.type, argv.name, argv.mm);

function jsearch(type, name, mm){
	
	var	ensquery = 'QUERY{"'+name+'"} METADATA{entityType='+type+' matchingModule='+mm+'}';
	var q = querystring.stringify({'q': ensquery, 'verbose' : 'true'});

	//console.log('\n-----------------------------------');
    console.log('\t Running jsearch for '+name+', type='+type+', mm='+mm);
	console.log('\t q='+ensquery+'&verbose=true');
	console.log('-----------------------------------');

	var options = {
  		host: host,
  		port: port,
  		path: '/okkam-core/jsearch?'+q,
  		headers: {"content-type": "application/x-www-form-urlencoded"}
	};
	
	http.get(options, function(response) {
		var str = '';
		
		// Create the listener for data being returned.
		response.on('data', function (chunk) {
			str += chunk;
		});
	
		// Create the listener for the end of the GET.
		response.on('end', function (){
			//console.log(str);
			var jsonResult = JSON.parse(str);
	
			jsonResult.forEach(function (val, index, array) {
			  //console.log("val:   " + val);
			  //console.log("index: " + index);
			  //console.log("array: " + array);
			  var paddedIndex = String('000'+index).slice(-3);
			  console.log("["+paddedIndex+"] OID: " + val.o+ " [p=" + val.p + "]");
			  var entity = val.e;
			  var alternatives = entity.al;
			  var equivalents = entity.e;
			  var profileAttributes = entity.pr.a;
			  var profileRefs = entity.pr.r;
			  
			  if(verbose || show_alternatives){
			  	console.log("\t -- ALTERNATIVE IDs: ");
			  	alternatives.forEach(printVals);
			  }
			  if(verbose || show_equivalents){
			  	console.log("\t -- EQUIALENT IDs: ");
			  	equivalents.forEach(printVals);
			  }
			  if(verbose || show_profile_references){
			  	console.log("\t -- Profile References: ");
			  	profileRefs.forEach(printProfileReferences);
			  }
			  if(verbose || show_profile_attributes){
			  	console.log("\t -- Profile Attributes: ");
			  	profileAttributes.forEach(printProfileAttributes);
			  }
			});
		});
	});
}

function printVals(val, index, array) {
	console.log("\t\t " +val);
}

function printProfileReferences(val, index, array) {
	var c = val.c;
	var p = val.p;
	console.log("\t\t ["+c+"] " +p);	  
}

function printProfileAttributes(val, index, array) {
	var v = val.v;
	var vi = val.vi;
	var n = val.n;
	console.log("\t\t "+n+": " +v);	  
}
