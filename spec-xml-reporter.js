var fs = require('fs');

class XMLReporter {

    constructor(path) {
        this.path = path;
        this.jasmineTestsStarted = null;
        this.openFileSync(this.path);
        this.endTagStack = []
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
     * @desc Indent the string with tabs with given levels
     * @param { string } tag Takes Tag that needs to be indented
     * @param { number } level No of level the tab to indent
     * @return { string } returns indented string
     */
    indentTab(tag, level) {
        return Array(level).join('\t') + tag
    }

    /**
     * @desc Creates opening tag
     * @param { string } tagName Tag that needs to be created
     * @return { string } returns the created tag
     */
    beginTag(tagName) {
        return '<' + tagName + '>';   
    }
    /**
     * @desc Creates closing tag
     * @param { string } tagName Tag that needs to be created
     * @return { string } returns the created tag
     */
    closeTag(tagName) {
        return '</' + tagName + '>';
    }

    /**
     * @desc  Logs the stirng to file asynchroniously
     * @param { string } tagName String that need to be logged to file
     */
    log(string) {
        fs.appendFile(this.path, string, (err) => {
            if(err) throw err
        })
    }

    /**
     * @desc  Logs the stirng to file synchroniously
     * @param { string } tagName String that need to be logged to file
     */
    logSync(string) {
        fs.appendFileSync(this.path, string);
    }

    /**
     * @desc  Converts the given object to xml
     * @param { any } obj Based on the obj it retuns the generated xml
     * @param { number } currentTabIndent Current level of indentation of generating xml
     * @return { string } Returns generated xml
     */
     obj2XML(obj, currentTabIndent) {
        if(typeof(obj) === 'string') {
            return this.indentTab(this.createFullTag(key, obj[key]), currentTabIndent) + '\n';
        }
        else if(obj instanceof Array) {
            let str = ''
             obj.forEach((value) => {
                    if(typeof(value) === 'string') {
                        str += this.indentTab(this.createFullTag('value', value), currentTabIndent + 1) + '\n';
                    }
                    else if(value instanceof Array) {
                        str += this.indentTab(this.beginTag('values'), currentTabIndent + 1) + '\n';
                        str += this.obj2XML(value, currentTabIndent + 1)
                        str += this.indentTab(this.closeTag('values'), currentTabIndent + 1) + '\n';
                    }
                    else if(typeof(value) === 'object') {
                        str += this.indentTab(this.beginTag('expect'), currentTabIndent + 1) + '\n';
                        str += this.obj2XML(value, currentTabIndent + 1)
                        str += this.indentTab(this.beginTag('expect'), currentTabIndent + 1) + '\n';
                    }
                });
            return str;
        }
        else if(typeof(obj) === 'object') {
            let str = ''
            Object.keys(obj).forEach(key => {
                if(typeof(obj[key]) === 'string') {
                    str += this.indentTab(this.createFullTag(key, obj[key]), currentTabIndent + 1) + '\n';
                }
                else if(obj[key] instanceof Array) {
                    str += this.indentTab(this.beginTag(key), currentTabIndent + 1) + '\n';
                    str += this.obj2XML(obj[key], currentTabIndent + 1)
                    str += this.indentTab(this.closeTag(key), currentTabIndent + 1) + '\n';

                }
                else if(typeof(obj[key]) === 'object') {
                    str += this.indentTab(this.beginTag(key), currentTabIndent + 1) + '\n';
                    str += this.obj2XML(obj[key], currentTabIndent + 1)
                    str += this.indentTab(this.closeTag(key), currentTabIndent + 1) + '\n';
                }
            });
            return str;
        }
    }
    /**
     * @desc creates xml tag with opening and closing tag
     * @param { string } tagName Tag that needs to be generated
     * @param { string } value Text value of the tag
     * @return { string } returns the generated xml
     */
    createFullTag(tagName, value) {
        return this.beginTag(tagName) + value + this.closeTag(tagName);
    }

    //Jasmine methods starts from here 

    jasmineStarted(jasmine) {
        this.jasmineTestsStarted = new Date();
        this.logSync('<!-- -------------------------------- -->\n'+
                     '<!--    Begin of tests Run            -->\n'+
                     '<!-- -------------------------------- -->\n');
        this.logSync('<!-- Started Executing test cases @ ' + 
                        this.jasmineTestsStarted.toLocaleString() + 
                      ' -->'
                    );
        this.logSync('\n<!-- Total specs defined = ' + 
                        jasmine.totalSpecsDefined + 
                        ' -->' + '\n'
                    );
        this.logSync(this.indentTab(this.beginTag('xml'), 1) + '\n');
    }

    

    suiteStarted(suite) {
        this.logSync(this.indentTab(this.beginTag('suite'), 2) + '\n');
        this.logSync(this.indentTab(this.createFullTag('desc', suite.description), 3) + '\n');
    }

    specStarted(spec) {
       this.logSync(this.indentTab(this.beginTag('spec'), 3) + '\n');
    }

    specDone(spec) {
        this.logSync(this.obj2XML(spec, 3));
        this.logSync(this.indentTab(this.closeTag('spec'), 3) + '\n');
    }

    suiteDone(suite) {
        this.logSync(this.indentTab(this.closeTag('suite'), 2) + '\n');
    }

    jasmineDone() {
        let totalTime = (new Date() - this.jasmineTestsStarted) / 1000;
        this.logSync(this.closeTag('xml') +'\n')
        this.logSync('<!-- -------------------------------- -->\n'+
                     '<!--    End of tests Run              -->\n'+
                     '<!-- -------------------------------- -->\n');
        this.logSync('<!-- Finshed Executing test cases @ ' + new Date().toLocaleString() +' -->');
        this.logSync('\n<!-- Tota time taken = ' + totalTime + ' -->');
   
    }
}

module.exports = exports = XMLReporter