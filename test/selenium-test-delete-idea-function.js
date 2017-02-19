var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

var driver_fx = new webdriver.Builder()
  .forBrowser('firefox')
  .build();

var driver_ch = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

// var driver_saf = new webdriver.Builder()
//   .forBrowser('safari')
//   .build();

  createCards(driver_fx)
  createCards(driver_ch)
  // createCards(driver_saf)


//Create two cards, Delete one card.
function createCards(driver) {
    driver.get('https://danielbucket.github.io/2DoPivot-Bucket-Kepner/')
    driver.findElement(By.id('idea-title')).sendKeys('New Title')
    driver.findElement(By.id('idea-content')).sendKeys('New Body')
    driver.findElement(By.id('save-button')).click()


    driver.sleep(3000).then(function() {
      driver.findElement(By.className('titleEdit')).getText().then(function(title) {
          if (title === 'New Title') {
          console.log('Card Exists.');
        } else {
          console.log('Card does not exist.')
        }
      })
})

    driver.findElement(By.id('idea-title')).sendKeys('Second New Title')
    driver.findElement(By.id('idea-content')).sendKeys('Second New Body')
    driver.findElement(By.id('save-button')).click()

    driver.sleep(3000).then(function() {
      driver.findElement(By.className('titleEdit')).getText().then(function(title) {
          if (title === 'Second New Title') {
          console.log('Card 2 Exists.');
        } else {
          console.log('Card does not exist.')
        }
      })
    })

driver.findElement(By.id('delete-button')).click()

driver.sleep(3000).then(function(){
  driver.findElement(By.className('titleEdit')).getText().then(function(title) {
    if (title === 'New Title') {
      console.log('test passed, card deleted');
    } else {
      console.log('test failed, card not deleted.')
    }
  })
})


  driver.quit()
}
