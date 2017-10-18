var fs = require('fs');

class JSONReporter {

    constructor(path) {
        this.path = path;
        this.jasmineTestsStarted = null;
        this.JSONObj = {};
        this.openFileSync(this.path);
    }

    /**
     * @desc Opens the file in write mode (truncate the file if already exitst)
     * @param { string } path Takes file path as an input
     */
    openFileSync(path) {
        fs.openSync(path, 'w', (err, fd) => {
            if(err) throw err;            
        });
    }

    /**
     * @desc  Logs the stirng to file  asynchroniously
     * @param { string } tagName String that need to be logged to file
     */
    log(string) {
        fs.appendFile(this.path, string, (err) => {
            if(err) throw err
        })
    }

    /**
     * @desc  Logs the stirng to file  synchroniously
     * @param { string } tagName String that need to be logged to file
     */
    logSync(string) {
        fs.appendFileSync(this.path, string);
    }

    //Jasmine methods starts from here

    jasmineStarted(jasmine) {
        this.jasmineTestsStarted = new Date();
        this.logSync('//--------------------------------\n'+
                    '//     Begin of tests Run         \n'+
                    '//--------------------------------\n');
        this.logSync('//Started Executing test cases @ ' + this.jasmineTestsStarted.toLocaleString());
        this.logSync('\n//Total specs defined = ' + jasmine.totalSpecsDefined +'\n');
    }

    suiteStarted(suite) {
        this.JSONObj[suite.description.trim()] = []
    }

    specStarted(spec) {
       
    }

    specDone(spec) {
        var suite = spec.fullName.replace(spec.description, '').trim();     
        this.JSONObj[suite].push(spec);
    }

    jasmineDone() {
        let totalTime = (new Date() - this.jasmineTestsStarted) / 1000;
        this.logSync(JSON.stringify(this.JSONObj, null, 2)+'\n');
        this.logSync('//--------------------------------\n'+
                    '//     End of tests Run           \n'+
                    '//--------------------------------\n');
        this.logSync('//Finshed Executing test cases @ ' + new Date().toLocaleString());
        this.logSync('\n//Tota time taken = ' + totalTime);
   
    }
}

module.exports = exports = JSONReporter