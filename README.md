# jasmine-custom-reporters
  Jasmine reporters are used to report the results of the test case executed. Jasmine or protractor can be configured so that the result of the tests excution are customized as per our need. More on this in the following sections.

# Installation 
  To install use `npm i jasmine-custom-reporters`

# Module structure
```bash
  jasmine-custom-reporters
    ├──spec-console-reporter # Module .js file to report the tests result to console
    ├──spec-json-reporter # Module .js file to report the tests result to JSON file
    ├──spec-xml-reporter # Module .js file to report the tests result to XML file
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
### Resulted console output

```bash
  --------------------------------------
          Begin of tests Run
  --------------------------------------

  Started Executing test cases @ 10/18/2017, 4:27:09 PM

  Total specs defined = 2
  Current testing suite = angularjs homepage todo list

          should add a todo       3.307s

  Current testing suite = angularjs homepage todo list 2

          should add a todo       1.898s

  End of executing test cases @ 10/18/2017, 4:27:15 PM

  Finished in 5.218

  --------------------------------------
          End of tests Run
  --------------------------------------


```

## Using Json reporter

  Json reporter is used to report the tests result to json file

  ```js
    var JSONReporter = require(`jasmine-custom-reporters/spec-json-reporter`);
    var jsonReporter = new JSONReporter('path-to-your-file.json');
    //jasmine.getEnv().clearReporters() // use this statement to clear default reporters
    jasmine.getEnv().addReporter(jsonReporter); // Add this statement to proctractor config file in onPrepare function
  ```

### Resulted JSON

  ```json
    //--------------------------------
    //     Begin of tests Run         
    //--------------------------------
    //Started Executing test cases @ 10/18/2017, 4:27:09 PM
    //Total specs defined = 2
    {
      "angularjs homepage todo list": [
        {
          "id": "spec0",
          "description": "should add a todo",
          "fullName": "angularjs homepage todo list should add a todo",
          "failedExpectations": [],
          "passedExpectations": [
            {
              "matcherName": "toEqual",
              "message": "Passed.",
              "stack": "",
              "passed": true
            },
            {
              "matcherName": "toEqual",
              "message": "Passed.",
              "stack": "",
              "passed": true
            },
            {
              "matcherName": "toEqual",
              "message": "Passed.",
              "stack": "",
              "passed": true
            }
          ],
          "pendingReason": "",
          "status": "passed"
        }
      ],
      "angularjs homepage todo list 2": [
        {
          "id": "spec1",
          "description": "should add a todo",
          "fullName": "angularjs homepage todo list 2 should add a todo",
          "failedExpectations": [],
          "passedExpectations": [
            {
              "matcherName": "toEqual",
              "message": "Passed.",
              "stack": "",
              "passed": true
            },
            {
              "matcherName": "toEqual",
              "message": "Passed.",
              "stack": "",
              "passed": true
            },
            {
              "matcherName": "toEqual",
              "message": "Passed.",
              "stack": "",
              "passed": true
            }
          ],
          "pendingReason": "",
          "status": "passed"
        }
      ]
    }
    //--------------------------------
    //     End of tests Run           
    //--------------------------------
    //Finshed Executing test cases @ 10/18/2017, 4:27:15 PM
    //Tota time taken = 5.214
  ```
  
## Using XML reporter

  XML reporter is used to report the tests result to XML file

  ```js
    var XMLReporter = require(`jasmine-custom-reporters/spec-XML-reporter`);
    var xmlReporter = new JSONReporter('path-to-your-file.xml');
    //jasmine.getEnv().clearReporters() // use this statement to clear default reporters
    jasmine.getEnv().addReporter(xmlReporter); // Add this statement to proctractor config file in onPrepare function
  ```

### Resulted JSON

  ```xml
    <!-- -------------------------------- -->
    <!--    Begin of tests Run            -->
    <!-- -------------------------------- -->
    <!-- Started Executing test cases @ 10/18/2017, 4:27:09 PM -->
    <!-- Total specs defined = 2 -->
    <xml>
      <suite>
        <desc>angularjs homepage todo list</desc>
        <spec>
          <id>spec0</id>
          <description>should add a todo</description>
          <fullName>angularjs homepage todo list should add a todo</fullName>
          <failedExpectations>
          </failedExpectations>
          <passedExpectations>
            <expect>
              <matcherName>toEqual</matcherName>
              <message>Passed.</message>
              <stack></stack>
            <expect>
            <expect>
              <matcherName>toEqual</matcherName>
              <message>Passed.</message>
              <stack></stack>
            <expect>
            <expect>
              <matcherName>toEqual</matcherName>
              <message>Passed.</message>
              <stack></stack>
            <expect>
          </passedExpectations>
          <pendingReason></pendingReason>
          <status>passed</status>
        </spec>
      </suite>
      <suite>
        <desc>angularjs homepage todo list 2</desc>
        <spec>
          <id>spec1</id>
          <description>should add a todo</description>
          <fullName>angularjs homepage todo list 2 should add a todo</fullName>
          <failedExpectations>
          </failedExpectations>
          <passedExpectations>
            <expect>
              <matcherName>toEqual</matcherName>
              <message>Passed.</message>
              <stack></stack>
            <expect>
            <expect>
              <matcherName>toEqual</matcherName>
              <message>Passed.</message>
              <stack></stack>
            <expect>
            <expect>
              <matcherName>toEqual</matcherName>
              <message>Passed.</message>
              <stack></stack>
            <expect>
          </passedExpectations>
          <pendingReason></pendingReason>
          <status>passed</status>
        </spec>
      </suite>
    </xml>
    <!-- -------------------------------- -->
    <!--    End of tests Run              -->
    <!-- -------------------------------- -->
    <!-- Finshed Executing test cases @ 10/18/2017, 4:27:15 PM -->
    <!-- Tota time taken = 5.214 -->
  ```

