var http = require('http');
querystring = require('querystring')
var name = 'Flavio Pompermaier'
var	ensquery = 'QUERY{"'+name+'"} METADATA{entityType=person matchingModule=fbem}'

var q = querystring.stringify({'q': ensquery, 'verbose' : 'true'})

var options = {
  host: 'api.okkam.org',
  port: 80,
  path: '/okkam-core/jsearch?'+q,
  headers: {"content-type": "application/x-www-form-urlencoded"}
};

//print process.argv
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

http.get(options, function(response) {
var str = '';
	
	// Create the listener for data being returned.
	response.on('data', function (chunk) {
		str += chunk;
	});

	// Create the listener for the end of the GET.
	response.on('end', function (){
		console.log(str);
	//		var jsonResult = JSON.parse(str);
	//		console.log("OID: " + jsonResult.oid);      
	});
});
