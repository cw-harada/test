module.exports = function(callback) {
	var pause = true;
	var sleep = require('sleep');
	var readline = require('readline');
	var rl = readline.createInterface({
	    input: process.stdin,
	    output: process.stdout,
	});

	rl.question("Press any key to continue...", function (answer) {
	    rl.close();
	    callback();
	});
};
