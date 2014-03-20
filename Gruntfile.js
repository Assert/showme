/*global module*/

module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                background: true
            },
            travis: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['Firefox']
            }
        },

        jshint: {
            all: ['js/*.js', 'test/*.js', 'karma.conf.js', 'Gruntfile.js']
        },

        concat: {
            options: {
                separator: ';' //separates scripts
            },
            dist: {
                src: ['js/*.js', 'lib/**/*.js'],
                dest: 'bin/script.js'
            }
        },

        uglify: {
            js: {
                files: {
                    'bin/script.js': ['bin/script.js'] //save over the newly created script
                }
            }
        },

        'string-replace': {
            inline: {
                files: {
                    'index.htm': 'index.htm'
                },
                options: {
                    replacements: [
                        {
                            pattern: '<!--start PROD imports',
                            replacement: '<!--start PROD imports-->'
                        },
                        {
                            pattern: 'end PROD imports-->',
                            replacement: '<!--end PROD imports-->'
                        },
                        {
                            pattern: '<!--start DEV imports-->',
                            replacement: '<!--start DEV imports'
                        },
                        {
                            pattern: '<!--end DEV imports-->',
                            replacement: 'end DEV imports-->'
                        }
                    ]
                }
            }
        },

        watch: {
            karma: {
                files: ['js/*.js', 'test/*.js', 'lib/*.js'],
                tasks: ['karma:unit:run']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-string-replace');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('devmode', ['karma:unit', 'watch']);

    // Tasks Travis will run
    grunt.registerTask('test', ['karma:travis']);
    grunt.registerTask('development', ['jshint']);
    grunt.registerTask('production', ['jshint', 'concat', 'uglify', 'string-replace']);

};