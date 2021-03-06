// Copyright 2013 Selenium committers
// Copyright 2013 Software Freedom Conservancy
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview An example test that may be run using Mocha. To run, you must
 * set the path to the standalone Selenium server jar through the SELENIUM
 * environment variable:
 *     SELENIUM=path/to/selenium-server-standalone.jar \
 *         mocha selenium-webdriver/example/google_search_test.js
 */

var assert = require('assert'),
    fs = require('fs');

var webdriver = require('selenium-webdriver'),
    test = require('selenium-webdriver/testing'),
    remote = require('selenium-webdriver/remote'),
    optimist = require('optimist');


test.describe('IE Google Search', function() {
  var driver, server;
  
  test.before(function() {   
    var jar = optimist.demand('selenium').argv.selenium;
    var iedriver = optimist.demand('iedriver').argv.iedriver;
    
    assert.ok(!!jar, 'SELENIUM environment variable not set');
    assert.ok(fs.existsSync(jar), 'The specified jar does not exist: ' + jar);

    assert.ok(!!iedriver, 'IEDRIVER environment variable not set');
    assert.ok(fs.existsSync(iedriver), 'The iedriver EXE does not exist: ' + iedriver);

     server = new remote.SeleniumServer({jar: jar, jvmArgs: ['-Dwebdriver.ie.driver='+iedriver]});
     server.start();

    driver = new webdriver.Builder().
        usingServer(server.address()).
        withCapabilities({'browserName': 'internet explorer'}).
        build();
  });

  test.it('should append query to title', function() {
    driver.get('http://www.google.com');
    driver.findElement(webdriver.By.name('q')).sendKeys('webdriver');
    driver.findElement(webdriver.By.name('btnG')).click();
    driver.wait(function() {
      return driver.getTitle().then(function(title) {
        return 'webdriver - Google Search' === title;
      });
    }, 1000);
  });

  test.after(function() { driver.quit(); });
  test.after(function() { server.stop(); });
});
