var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver_fx = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

var driver_saf = new webdriver.Builder()
    .forBrowser('safari')
    .build();

searchTest(driver_fx)
searchTest(driver_chr)
searchTest(driver_saf)

function searchTest(driver) {
  driver.get('file:///Users/danielbucket/Turing_Files/Mod1/2DoBox.1/index.html')
  driver.findElement(By.id('idea-title')).sendKeys('Test Pass One - Title')
  driver.findElement(By.id('idea-content')).sendKeys('Test Pass One - Body')
  driver.findElement(By.id('save-button')).click()

  driver.sleep(3000).then(function() {
    driver.getTitle().then(function(title) {
      if(title === 'idea-box') {
        console.log('Test passed')
      } else {
        console.log('Test failed')
      }
    });
  });

  driver.quit()
}
