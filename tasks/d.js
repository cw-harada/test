/*
 * grunt-d
 * https://github.com/k-kinzal/grunt-d
 *
 * Copyright (c) 2014 k-kinzal
 * Licensed under the MIT license.
 */
'use strict';

// definition grunt plugin
module.exports = function (grunt) {
	// require
	var inquirer = require('inquirer');
	var shell = require('shelljs');
	var pause = require('./libs/pause');
  var basePath = shell.pwd();
	// register task
	grunt.registerMultiTask('d', 'execute shell commands.', function () {
		// initialize
		var _ = grunt.util._;
		var config = this.data;
		var done = this.async();
		// create question
		var questions	= {
	    name: this.target,
	    type: config.type,
	    message: config.message,
		};
		// execute question and commands
		inquirer.prompt(questions, function(answers) {
			// initialize
			var answer = answers[questions.name];
			var process = config.process[answer] || config.process;
			if (!_.isArray(process)) {
				process = [];
			}
			// change diretory to base path
			shell.cd(basePath);
			//
			var wait = false;
			(function run() {
				// is wait
				if (wait) {
					setTimeout(run, 100);
					return;
				}
				// execute commands
				var command;
				while (command = process.shift()) {
					if (_.isFunction(command)) {
						grunt.verbose.oklns(command.name);
						if (command(answer) === false) {
							throw new Error('process execute error');
						}
						continue;
					}
					// log command
					grunt.verbose.oklns(command);
					// pause
					if (/^pause$/.test(command)) {
						wait = true;
				    pause(function() {
				    	wait = false;
				    });
				    setTimeout(run, 100);
						return;
					}
					// change directory
					if (/^cd/.test(command)) {
						var match = command.match(/^cd (.*)/);
						match[1] && shell.cd(match[1]);
						continue;
					}
					// execute command
					if (shell.exec(command).code) {
						throw new Error('command execute error');
					}
				}
				done();
			})();
			
		});
	});
};