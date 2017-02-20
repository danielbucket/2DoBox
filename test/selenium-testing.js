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

refreshTest(driver_fx)
refreshTest(driver_chr)
// refreshTest(driver_saf)

function newCardTest(driver) {
  driver.get('https://danielbucket.github.io/2DoPivot-Bucket-Kepner/')
  driver.findElement(By.id('idea-title')).sendKeys('Test Pass One - Title')
  driver.findElement(By.id('idea-content')).sendKeys('Test Pass One - Body')
  driver.findElement(By.id('save-button')).click()

  driver.sleep(2000).then(function() {
    driver.findElement(By.className('titleEdit')).getText().then(function(titleBody) {
      if (titleBody === 'Test Pass One - Title') {
        console.log('newCardTest, New Card Title Population, TEST PASSED')
      } else {
        console.log('newCardTest, New Card Title Population, TEST FAILED')
      }
    })
  })

  driver.sleep(2000).then(function() {
    driver.findElement(By.id('line-2')).getText().then(function(titleContent){
      if (titleContent === 'Test Pass One - Body') {
        console.log('newCardTest, New Card Body Population, TEST PASSED')
      } else {
        console.log('newCardTest, New Card Body Population, TEST FAILED')
      }
    })
  })
}

function upVoteTest(driver) {
  driver.findElement(By.id('upvote-button')).click()
  driver.sleep(2000).then(function() {
    driver.findElement(By.id('qual')).getText().then(function(quality) {
      if (quality === 'plausible') {
        console.log('upVoteTest, Up Vote To "Plausible", TEST PASSED')
      } else {
        console.log('upVoteTest, Up Vote To "Plausible", TEST FAILED')
      }
    })
  })

  driver.findElement(By.id('upvote-button')).click()
  driver.sleep(2000).then(function() {
    driver.findElement(By.id('qual')).getText().then(function(quality) {
      if (quality === 'genius') {
        console.log('upVoteTest, Up Vote To "Genius", TEST PASSED')
      } else {
        console.log('upVoteTest, Up Vote To "Genius", TEST FAILED')
      }
    })
  })
}

function downVoteTest(driver) {
  driver.findElement(By.id('downvote-button')).click()
  driver.sleep(2000).then(function() {
    driver.findElement(By.id('qual')).getText().then(function(quality) {
      if (quality === 'plausible') {
        console.log('downVoteTest, Vote Down To "Plausible", TEST PASSED')
      } else {
        console.log('downVoteTest, Vote Down To "Plausible", TEST FAILED')
      }
    })
  })

  driver.findElement(By.id('downvote-button')).click()
  driver.sleep(2000).then(function() {
    driver.findElement(By.id('qual')).getText().then(function(quality) {
      if (quality === 'swill') {
        console.log('downVoteTest, Vote Down To "Swill", TEST PASSED')
      } else {
        console.log('downVoteTest, Vote Down To "Swill", TEST FAILED')
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
        console.log('filterTest, TEST PASSED')
      } else {
        console.log('filterTest, TEST FAILED')
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

  driver.sleep(2000).then( function(){
    driver.findElement(By.className('titleEdit')).getText().then( function(text){
      if (text == 'The perfect title'){
        console.log('editIdeas, TEST PASSED')
      } else {
        console.log('editIdea, TEST FAILED')
      }
    })
  })
}

function createCards(driver) {
  driver.get('https://danielbucket.github.io/2DoPivot-Bucket-Kepner/')
  driver.findElement(By.id('idea-title')).sendKeys('New Title')
  driver.findElement(By.id('idea-content')).sendKeys('New Body')
  driver.findElement(By.id('save-button')).click()

  driver.sleep(2000).then(function() {
    driver.findElement(By.className('titleEdit')).getText().then(function(title) {
        if (title === 'New Title') {
        console.log('createCards, 1st New Card Verification, TEST PASSED')
      } else {
        console.log('createCards, 1st New Card Verification, TEST FAILED')
      }
    })
  })

  driver.findElement(By.id('idea-title')).sendKeys('Second New Title')
  driver.findElement(By.id('idea-content')).sendKeys('Second New Body')
  driver.findElement(By.id('save-button')).click()

  driver.sleep(2000).then(function() {
    driver.findElement(By.className('titleEdit')).getText().then(function(title) {
        if (title === 'Second New Title') {
        console.log('createCards, 2nd New Card Verification, TEST PASSED')
      } else {
        console.log('createCards, 2nd New Card Verification, TEST FAILED')
      }
    })
  })

  driver.findElement(By.id('delete-button')).click()
  driver.sleep(2000).then(function(){
    driver.findElement(By.className('titleEdit')).getText().then(function(title) {
      if (title === 'New Title') {
        console.log('createCards, 1st Card Deleted, TEST PASSED')
      } else {
        console.log('createCards, 1st Card Deleted, TEST FAILED')
      }
    })
  })
}

function refreshTest(driver) {
  driver.get('https://danielbucket.github.io/2DoPivot-Bucket-Kepner/')
  driver.findElement(By.id('idea-title')).sendKeys('First New Idea.')
  driver.findElement(By.id('idea-content')).sendKeys('First New Idea Body.')
  driver.findElement(By.id('save-button')).click()
  driver.navigate().refresh()

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('titleEdit')).getText().then(function (title) {
      if (title === "First New Idea." ) {
        console.log('refreshTest, Data Persisted, TEST PASSED');
      } else {
        console.log('refreshTest, Data Lost, TEST FAILED');
      }
    })
  })
  driver.quit()
}
