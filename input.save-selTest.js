var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver_fx = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

// var driver_saf = new webdriver.Builder()
//     .forBrowser('safari')
//     .build();

searchTest(driver_fx)
searchTest(driver_chr)
// searchTest(driver_saf)

function searchTest(driver) {
  driver.get('https://danielbucket.github.io/2DoPivot-Bucket-Kepner/')
  driver.findElement(By.id('idea-title')).sendKeys('Test Pass One - Title')
  driver.findElement(By.id('idea-content')).sendKeys('Test Pass One - Body')
  driver.findElement(By.id('save-button')).click()

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('titleEdit')).getText().then(function(titleBody) {
      if (titleBody === 'Test Pass One - Title') {
        console.log('Title Test Passed')
      } else {
        console.log('Title Test Failed')
      }
    })
  })

  driver.sleep(3000).then(function() {
    driver.findElement(By.id('line-2')).getText().then(function(titleContent){
      if (titleContent === 'Test Pass One - Body') {
        console.log('Content Test Passed')
      } else {
        console.log('Content Test Failed')
      }
    })
  })

  driver.quit()
}
