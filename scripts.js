function Idea(id, title, body, quality, complete) {
  this.id = id
  this.title = title
  this.body = body
  this.quality = quality
  this.complete = complete
}

function prependCard($id, $ideaTitle, $ideaContent, quality, complete) {
  $('#card-box').prepend(
    `<div class='idea-card ${complete}' id="${$id}">
      <div class='title-line'>
        <div id='line-1'>
          <h2 class='title-edit' contenteditable>${$ideaTitle}</h2>
        <div class="status-btn-box">
          <button id='complete-btn' class="status-btn" type="button" name="complete button"></button>
          <button id='delete-btn' class="status-btn" type="button" name="delete button"></button>
        </div>
        </div>
        <p id='line-2' contenteditable>${$ideaContent}</p>
      </div>
      <div id='line-3'>
        <button id='upvote-btn'>
        </button>
        <button id='downvote-btn'>
        </button>
        <p id='quality-line'>quality:<span id="qual">${quality}</span></p>
      </div>
    </div>`
   )
}

function printCard() {
  for (var i=0;i<localStorage.length;i++) {
    var obj = localStorage.getItem(localStorage.key(i))
    var parsedObj = JSON.parse(obj)
    var $ideaTitle = parsedObj.title
    var $ideaContent = parsedObj.body
    var $id = parsedObj.id
    var quality = parsedObj.quality
    var complete = parsedObj.complete
    prependCard($id, $ideaTitle, $ideaContent, quality, complete)
  }
}

$('#save-btn').on('click', function() {
  var id = $.now()
  var ideaTitle = $('#item-title').val()
  var ideaContent = $('#item-content').val()
  var quality = 'swill'
  var complete = "notComplete"
  var newIdea = new Idea(id,ideaTitle,ideaContent,quality,complete)
  localStorage.setItem(id, JSON.stringify(newIdea))
  prependCard(id,ideaTitle,ideaContent,quality,complete)
  $('#item-title').val('')
  $('#item-content').val('')
})

$('#card-box').on('click', '#upvote-btn', function() {
  var qualityText = $(this).siblings('#quality-line').children()
  if (qualityText.text() === 'swill') {
    qualityText.text('plausible')
  } else if (qualityText.text() === 'plausible') {
    qualityText.text('genius')
  }
  var thisCardObj = $(this).closest('.idea-card')
  var idValue = thisCardObj.attr('id')
  var lsItem = JSON.parse(localStorage.getItem(idValue))
  lsItem.quality = qualityText.text()
  localStorage.setItem(idValue, JSON.stringify(lsItem))
})

$('#card-box').on('click', '#downvote-btn', function() {
  var qualityText = $(this).siblings('#quality-line').children()
  if (qualityText.text() === 'genius') {
    qualityText.text('plausible')
  } else if (qualityText.text() === 'plausible') {
    qualityText.text('swill')
  }

  var thisCardObj = $(this).closest('.idea-card')
  var idValue = thisCardObj.attr('id')
  var lsItem = JSON.parse(localStorage.getItem(idValue))
  lsItem.quality = qualityText.text()
  localStorage.setItem(idValue, JSON.stringify(lsItem))
})

$('#card-box').on('click', '#complete-btn', function() {
  var completeTask = $(this).closest('.idea-card')
  var thisCardId = completeTask.attr('id')
  var thisCard = JSON.parse(localStorage.getItem(thisCardId))
  if (thisCard.complete === "notComplete") {
    thisCard.complete = 'complete'
  } else if (thisCard.complete === 'complete') {
    thisCard.complete = "notComplete"
  }
  localStorage.setItem(thisCardId,JSON.stringify(thisCard))
  printCard()
  }
)

$('#card-box').on('click', '#delete-btn', function() {
  var $whatIsDeleted = $(this).closest('.idea-card')
  $whatIsDeleted.remove()
  var idValue = $whatIsDeleted.attr('id')
  localStorage.removeItem(idValue)
})

$('#card-box').on('blur', '.title-edit', function() {
  var $ideaTitle = $(this).text()
  var whatIsGrabbed = $(this).closest('.idea-card')
  var idValue = whatIsGrabbed.attr('id')
  var lsItem = localStorage.getItem(idValue)
  var parseLsItem = JSON.parse(lsItem)
  parseLsItem.title = $ideaTitle
  var stringedit = JSON.stringify(parseLsItem)
  localStorage.setItem(idValue, stringedit)
})

$('#card-box').on('blur', '#line-2', function() {
  var $ideaContent = $(this).text()
  var whatIsGrabbed = $(this).closest('.idea-card')
  var idValue = whatIsGrabbed.attr('id')
  var lsItem = localStorage.getItem(idValue)
  var parseLsItem = JSON.parse(lsItem)
  parseLsItem.body = $ideaContent
  var stringedit = JSON.stringify(parseLsItem)
  localStorage.setItem(idValue, stringedit)
})

$('#search').on('keyup', function() {
    var searchInput = $(this).val().toLowerCase();
    $('.title-line').each(function() {
      var searchText = $(this).text().toLowerCase()
      if (!!searchText.match(searchInput)) {
        $(this).closest('.idea-card').toggle(true)
      } else {
        $(this).closest('.idea-card').toggle(false)
      }
    })
})

$('#item-title, #item-content').on('keyup', function() {
  var $ideaTitle = $('#idea-title')
  var $ideaContent = $('#item-content')
  if ($ideaTitle.val() !== "" && $ideaContent.val() !== ""){
    $('#save-btn').prop('disabled', false)
  } else {
    $('#save-btn').prop('disabled', true)
  }
})

printCard()
