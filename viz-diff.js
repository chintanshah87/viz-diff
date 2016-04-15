var BlinkDiff = require("blink-diff")
var config = require('./config.json');
var fs = require('fs');
var path = require('path');
var now = new Date();

//List all files in imageAPath
var fileListObj=fileList(config.BaselineImagePath);

//Object to string array 
var arrOfVals = fileListObj.map(function (item){ return item; });

//Function for Strint Replace. This is being used for 
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

//Reomove directory value from string array to get file name 
for(i=0; i<arrOfVals.length;i++){
	arrOfVals[i]=escape(arrOfVals[i]).replaceAll(escape(config.BaselineImagePath),'');
	arrOfVals[i]=arrOfVals[i].replaceAll("%5C","\\");
	arrOfVals[i]=arrOfVals[i].replaceAll("%20"," ");
	arrOfVals[i]=arrOfVals[i].replaceAll("%28","(");
	arrOfVals[i]=arrOfVals[i].replaceAll("%29",")");
	arrOfVals[i]=arrOfVals[i].substring((config.BaselineImagePath).length-1,(arrOfVals[i].length) )
}


arrOfVals.forEach(function(item) { 

var fileName=item;
	//Object declaration for execution. Values are set from config.json file. This will be used during diff.run().
	var diff = new BlinkDiff({
		imageAPath : config.BaselineImagePath+"\\"+ fileName,
		imageBPath : config.WebImagePath+"\\"+ fileName,
		imageOutputPath : config.OutputPath+"\\"+ fileName,
		verbose : true,
		debug: true,
		thresholdType : BlinkDiff.THRESHOLD_PERCENT,
		threshold : ((config.Threshold)/100),
		delta: config.Delta,
		outputMaskAlpha : 255,
		hShift: config.hShift,
		vShift: config.vShift,
		hideShift: config.hideShift,
		perceptual: config.perceptual,
		gamma: config.gamma,

		copyImageBToOutput : config.OutputPath+"\\"+ fileName
	});
	console.log("filename = " + fileName);
	console.log("Execution in progress...");
	console.log("Log will be generated under "+ "\""+config.OutputPath +"\""+ " folder")
	diff.run(function(error, result) {
		console.log('diff executed');
		if (error) {
			throw error;
		} else {	
			console.log(diff.hasPassed(result.code) ? 'Passed' : 'Failed');
			console.log('Differences:', result.differences, '(' + Math.round((result.differences / result.dimension) * 10000) / 100 + '%)');
			BlinkDiff.log("["+now+"] "+ fileName + "\n" + "Execution Completed with threshold: "+ config.Threshold+'%' + "\n"+ "Delta: " + config.Delta + "\n" + "Found "
					+ result.differences + '(' + Math.round((result.differences / result.dimension) * 10000) / 100 + '%)'+ " differences." + "\n"
					+ (diff.hasPassed(result.code) ? "Passed" : "Failed")
					+ "\n" + "\n" + "\n");
		}
	});
});

//Get list of files from Baseline directory
function fileList(imageAPath) {
  return fs.readdirSync(imageAPath).reduce(function(list, file) {
    var name = path.join(imageAPath, file);
    var isDir = fs.statSync(name).isDirectory();
    return list.concat(isDir ? fileList(name) : [name]);
  }, []);
}

//Log function to log execution data to a ExecutionLog file in Output directory. Can be called from within diff.run() method.
BlinkDiff.log = function(log) {
	fs.appendFile(config.OutputPath+"\\"+'ExecutionLog.log', log, function(err) {
		if (err)
			throw err;
		console.log('The "data to append" was appended to file!');
	});
};
