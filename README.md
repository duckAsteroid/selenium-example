selenium-example
================

This example project shows how to use Selenium JavaScript and the InternetExplorer driver.

To run the JS

1. Install Node.js from http://nodejs.org/download/ (use the MSI - it sets environment variables)
2. Download the latest Selenium standalone web driver JAR from https://code.google.com/p/selenium/downloads/list
3. Download the latest IE Web Driver executable (for your version of windows) from https://code.google.com/p/selenium/downloads/list
4. Extract the IE Driver EXE into some *well known* directory (e.g. `C:\Selenium\`).
3. Open a command prompt
4. Install the Selenium WebDriver for JS `npm install selenium-webdriver`
5. Install the mocha test framework `npm install -g mocha`
6. Install the optimist command line processor for JS `npm install optimist`

To run the example you then use the command line:

`mocha -R list ie_test.js --selenium "C:\Selenium\selenium-server-standalone-2.33.0.jar" --iedriver "C:\Selenium\IEDriverServer.exe"`

Where you can substitute the paths to the JAR you downloaded in step 2, and the EXE from step 4 above.
