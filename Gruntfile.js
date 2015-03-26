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
          'pause',
          function name1(answer) {
            console.log('answer:', answer);
          }
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
      },
      test3: {
        message: 'run execute message3.',
        type: 'ok',
        process: [
          'fluentd -vv -c ~/.fluentd/fluent.conf &',
          'pause',
          'pwd',
        ]
      },
      test4: {
        message: 'run execute message4',
        type: 'ok',
        process: [
          'wait echo 1 | grep 1',
        ]
      }
	  },
  });

  require('./tasks/d')(grunt);
};
