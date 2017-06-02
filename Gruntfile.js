'use strict';

var shell = require('shelljs');

module.exports = function (grunt) {
    // grunt configuration
    grunt.initConfig({
        config: {},
        d: {
            test1: {
                message: 'yml、jsのファイルが存在するか確認します',
                type: 'ok',
                process: [
                    function () {
                        var build_check_command = 'git diff master..develop --name-only "*.js" "*.yml"';
                        var test = shell.exec(build_check_command);
                        grunt.config('config.build', test);
                        //console.log("bulidをする必要があります");
                        console.log("bulidのファイル一覧\n" + grunt.config('config.build.output'));
                    },
                ]
            },
        },
    });

    require('./tasks/d')(grunt);
};
