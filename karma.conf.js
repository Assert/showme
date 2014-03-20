
module.exports = function (config) {
//console.log(process);
//console.log(require('os').platform()); // darwin
    'use strict';
    var browserToTestIn = ['PhantomJS'];
    //browserToTestIn = ['Chrome']; // Use when we need debug 8It would be nice to detect debug mode)
    if (process.env.TRAVISCI) {
        browserToTestIn = ['Firefox'];
    }

    config.set({
        basePath: '',
        frameworks: ['jasmine'],

        browsers: browserToTestIn,

        files: [
            'lib/angular/angular.min.js',
            'lib/angular/angular-mocks.js',
            'js/*.js',
            'test/*.js'
        ],

        // possible values: 'dots', 'progress'
        reporters: ['progress'],

        // web server port
        // port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        plugins : [
            'karma-phantomjs-launcher',
            'karma-junit-reporter',
            'karma-firefox-launcher',
            'karma-chrome-launcher',
            'karma-jasmine'
        ],

        junitReporter: {
            outputFile: 'unit.xml',
            suite: 'unit'
        },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
