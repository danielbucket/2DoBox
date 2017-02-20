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

  driver.quit()
}
