var env = process.env.NODE_ENV;

var spawn    = require('child_process').spawn;


var cmd = spawn('npm', ['install', 'grunt-cli', '-g']);

var grunt = spawn('grunt', ['production']);

return;
/*
if (env === 'development') {
    // Spawn a process or require the Gruntfile directly for the default task.
    return;
}

if (env === 'production') {
    // Spawn a process or require the Gruntfile directly to the prod task.
    return;
}

console.error('No task for environment:', env);
*/
//process.exit(1);