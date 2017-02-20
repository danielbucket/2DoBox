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

editIdeas(driver_fx)
editIdeas(driver_ch)
// editIdeas(driver_saf)


function editIdeas(driver){
  driver.get('https://danielbucket.github.io/2DoPivot-Bucket-Kepner/')
  driver.findElement(By.id('idea-title')).sendKeys(' ')
  driver.findElement(By.id('idea-content')).sendKeys('Not quite right content')
  driver.findElement(By.id('save-button')).click()
  driver.findElement(By.className('titleEdit')).sendKeys('The perfect title')

  driver.sleep(3000).then( function(){
    driver.findElement(By.className('titleEdit')).getText().then( function(text){
      if (text == 'The perfect title'){
        console.log('Existing idea changed, test passed.');
      } else {
        console.log('Idea not changed, test failed');
      }
    })
  })

  driver.quit()
}
