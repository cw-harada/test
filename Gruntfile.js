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
        message: 'run execute message.',
        type: 'confirm',
        process: [
          'ls -la .',
          'sleep 1',
          'echo "aaaaa"',
          'git status',
          'echo "bbbb"'
        ]
      }
	  },
  });
  // tasks
  grunt.registerTask('d', function() {
  	require('./tasks/d')(grunt);
    grunt.task.run([
      'd:test1',
    ]);
  });
};
