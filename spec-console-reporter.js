colors = {
    pass: () => '\033[32m', //Green
    fail: () => '\033[31m', //Red
    neutral: () => '\033[0m', // black
    heading: () => '\033[1;34m', //Light blue
    sub_heading: () => '\033[1;30m', // Dark Gray
    highlight: () => '\033[1;33m' //Yellow
}
var StatsD = require('node-dogstatsd').StatsD
var log = console.log;

var consoleReporter = {
    statsDHost: undefined,
    statsDPort: undefined,
    statsDServiceName: undefined,
    
    specStarted: undefined,
    jasmineTestsStarted: undefined,

    jasmineStarted: (jasmine) => {
        if(jasmine.spec === null) {
            log(colors.fail() + spec.expectation)
        } else {
            log('Total specs defined = ' + jasmine.totalSpecsDefined);
        }
    },

    specDone: (spec) => {
        var wdog = new StatsD(consoleReporter.statsDHost, consoleReporter.statsDPort);

        if(!spec.failedExpectations.length){
            log(colors.pass() + spec.fullName.trim());
            wdog.increment(consoleReporter.statsDServiceName.trim() + spec.description.trim(), ['status:passed']);
        } else {
            log(colors.fail() + spec.fullName.trim());
            wdog.increment(consoleReporter.statsDServiceName.trim() + spec.description.trim(), ['status:failed']);
            spec.failedExpectations.forEach((expectation) => {
                log('\tFailed spec reasons' +
                     '\n\t\tReason: ' + expectation.message + 
                     '\n\t\tTrace : ' + expectation.stack.split('\n')[1].trim()
                );
            })
        }
        log(colors.neutral());
    },
}

module.exports = exports = consoleReporter
