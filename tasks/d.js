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
			shell.cd(basePath);
			// initialize
			var answer = answers[questions.name];
			var process = config.process[answer] || config.process;
			if (!_.isArray(process)) {
				process = [];
			}
			// execute commands
			_.each(process, function(command) {
				// log command
				grunt.verbose.oklns(command);
				// 
				if (/^cd/.test(command)) {
					var match = command.match(/^cd (.*)/);
					match[1] && shell.cd(match[1]);
					return;
				}
				// execute command
				if (shell.exec(command).code) {
					throw new Error('command execute error');
				}
			});
			// 
			done();
		});
	});
};