# jasmine-custom-reporters
  Jasmine reporters are used to report the results of the test case executed. Jasmine or protractor can be configured so that the result of the tests excution are customized as per our need. More on this in the following sections.

# Installation 
  To install use `npm i jasmine-custom-reporters`

# Module structure
```bash
  jasmine-custom-reporters
    ├──spec-console-reporter # Module .js file to report the tests result to console
    ├──spec-json-reporter # Module .js file to report the tests result to console
    ├──package.json # Config .json file for the module
```

# Import
  To import the specific custom reporter use `require(jasmine-custom-reporters/[**])` for example to import ***json reporter*** use `require(jasmine-custom-reporters/spec-console-reporter)` similary remaining reporters

# Usage 
  
  ## Using Console reporter
  Console reporter is used to report the tests result to the console. 

  ```js
    var consoleReporter = require(`jasmine-custom-reporters/spec-console-reporter`);
    //jasmine.getEnv().clearReporters() # use this statement to clear default reporters 
    jasmine.getEnv().addReporter(consoleReporter); //  Add this statement to proctractor config file in onPrepare function
  ```

  ## Using Json reporter
  Json reporter is used to report the tests result to json file

  ```js
    var JSONReporter = require(`jasmine-custom-reporters/spec-json-reporter`);
    var jsonReporter = new JSONReporter('path-to-your-file.json');
    //jasmine.getEnv().clearReporters() // use this statement to clear default reporters
    jasmine.getEnv().addReporter(jsonReporter); // Add this statement to proctractor config file in onPrepare function
  ```
  
  
