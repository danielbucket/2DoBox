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

newCardTest(driver_fx)
newCardTest(driver_chr)
// newCardTest(driver_saf)

upVoteTest(driver_fx)
upVoteTest(driver_chr)
// upVoteTest(driver_saf)

downVoteTest(driver_fx)
downVoteTest(driver_chr)
// downVoteTest(driver_saf)

filterTest(driver_fx)
filterTest(driver_chr)
// filterTest(driver_saf)

editIdeas(driver_fx)
editIdeas(driver_chr)
// editIdeas(driver_saf)

createCards(driver_fx)
createCards(driver_chr)
// createCards(driver_saf)

function newCardTest(driver) {
  driver.get('https://danielbucket.github.io/2DoPivot-Bucket-Kepner/')
  driver.findElement(By.id('idea-title')).sendKeys('Test Pass One - Title')
  driver.findElement(By.id('idea-content')).sendKeys('Test Pass One - Body')
  driver.findElement(By.id('save-button')).click()

  driver.sleep(2000).then(function() {
    driver.findElement(By.className('titleEdit')).getText().then(function(titleBody) {
      if (titleBody === 'Test Pass One - Title') {
        console.log('Title Content Population Test Passed')
      } else {
        console.log('Title Content Population Test Failed')
      }
    })
  })

  driver.sleep(2000).then(function() {
    driver.findElement(By.id('line-2')).getText().then(function(titleContent){
      if (titleContent === 'Test Pass One - Body') {
        console.log('Card Content Population Test Passed')
      } else {
        console.log('Card Content Population Test Failed')
      }
    })
  })
}

function upVoteTest(driver) {
  driver.findElement(By.id('upvote-button')).click()
  driver.sleep(2000).then(function() {
    driver.findElement(By.id('qual')).getText().then(function(quality) {
      if (quality === 'plausible') {
        console.log('Upvote To Plausible Test Passed')
      } else {
        console.log('Upvote To Plausible Test Failed')
      }
    })
  })

  driver.findElement(By.id('upvote-button')).click()
  driver.sleep(2000).then(function() {
    driver.findElement(By.id('qual')).getText().then(function(quality) {
      if (quality === 'genius') {
        console.log('Upvote To Genius Test Passed')
      } else {
        console.log('Upvote To Genius Test Failed')
      }
    })
  })
}

function downVoteTest(driver) {
  driver.findElement(By.id('downvote-button')).click()
  driver.sleep(2000).then(function() {
    driver.findElement(By.id('qual')).getText().then(function(quality) {
      if (quality === 'plausible') {
        console.log('Downvote To Plausible Test Passed')
      } else {
        console.log('Downvote to Plausible Test Failed')
      }
    })
  })

  driver.findElement(By.id('downvote-button')).click()
  driver.sleep(2000).then(function() {
    driver.findElement(By.id('qual')).getText().then(function(quality) {
      if (quality === 'swill') {
        console.log('Downvote To Swill Test Passed')
      } else {
        console.log('Downvote to Swill Test Failed')
      }
    })
  })
}

function filterTest(driver) {
  driver.findElement(By.id('idea-title')).sendKeys('Find Me 0123')
  driver.findElement(By.id('idea-content')).sendKeys('3210 eM dniF')
  driver.findElement(By.id('save-button')).click()
  driver.findElement(By.id('search')).sendKeys('eM d')

  driver.sleep(2000).then(function() {
    driver.findElement(By.id('line-2')).getText().then(function(search) {
      if (search === '3210 eM dniF') {
        console.log('filterTest Passed')
      } else {
        console.log('filterTest Failed');
      }
    })
  })
}
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
}

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
