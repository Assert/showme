
module.exports = function(grunt) {

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
        watch: {
            karma: {
                files: ['js/*.js', 'test/*.js', 'lib/*.js'],
                tasks: ['karma:unit:run']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('devmode', ['karma:unit', 'watch']);

    // Add a new task for travis
    grunt.registerTask('test', ['karma:travis']);
};