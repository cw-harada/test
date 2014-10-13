/*
 * grunt-dgeni
 * https://github.com/k-kinzal/grunt-dgeni
 *
 * Copyright (c) 2014 k-kinzal
 * Licensed under the MIT license.
 */
module.exports = function (grunt) {
  'use strict';
  // grunt configuration
  grunt.initConfig({
	  d: {
	    test1: {
        message: 'run execute message1.',
        type: 'confirm',
        process: [
          'cd node_modules',
          'pwd',
          'ls -la .',
        ]
      },
      test2: {
        message: 'run execute message2.',
        type: 'confirm',
        process: {
          false: [
            'cd tasks',
            'pwd',
            'ls -la .',
          ]
        }
      }
	  },
  });
  // tasks
  grunt.registerTask('d', function() {
  	require('./tasks/d')(grunt);
    grunt.task.run([
      'd:test1',
      'd:test2',
    ]);
  });
};
