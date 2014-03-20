/*global module*/

module.exports = function (config) {
    'use strict';
    var browserToTestIn = ['PhantomJS'];
    if (process.env.TRAVISCI) {
        browserToTestIn = ['Firefox'];
    }
    // if (require('os').platform() === 'darwin') You are running mac

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
        reporters: ['progress'],
        // port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
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
        singleRun: false
    });
};
