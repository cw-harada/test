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
	// register task
	grunt.registerMultiTask('d', 'execute shell commands.', function () {
		// require
		var inquirer = require('inquirer');
		var shell = require('shelljs');
		// console.log(this.options());
		// initialize
		var _ = grunt.util._;
		var config = this.data;
		var done = this.async();
		// 
		var questions	= {
	    name: this.target,
	    type: config.type,
	    message: config.message,
		};
		// 
		inquirer.prompt(questions, function(answers) {
			console.log(answers);
			var answer = answers[questions.name];
			var process = config.process[answers] || config.process;
			// 
			_.each(process, function(command) {
				// log command
				grunt.verbose.oklns(command);
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