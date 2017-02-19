var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

var driver_fx = new webdriver.Builder()
  .forBrowser('firefox')
  .build();

var driver_ch = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

var driver_saf = new webdriver.Builder()
  .forBrowser('safari')
  .build();

  searchTest(driver_fx)
  searchTest(driver_ch)
  searchTest(driver_saf)

  function seachTest(driver) {
    driver.get('file:///Users/danielbucket/Turing_Files/Mod1/2DoBox/index.html')
    driver.findElement(By.name('idea-title')).sendKeys('Test Pass One - Title')
    driver.findElement(By.name('idea-content')).sendKeys('Test Pass One - Body')
    driver.findElements(By.name('save-button')).click()

    driver.sleep(3000).then(function() {
      driver.getTitle().then(function(title) {

      })
    })
  driver.quit()
  }
