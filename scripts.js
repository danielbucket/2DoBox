function Idea(id, title, body, quality) {
  this.id = id
  this.title = title
  this.body = body
  this.quality = quality
}

function prependCard($id, $ideaTitle, $ideaContent, quality) {
  $('#card-box').prepend(
    `<div class='idea-card' id=${$id}>
      <div class='title-line'>
        <div id='line-1'>
          <h2 class='title-edit' contenteditable='true'>${$ideaTitle}</h2>
          <button id='delete-btn'>
          </button>
        </div>
        <p id='line-2' contenteditable='true'>${$ideaContent}</p>
      </div>
      <div id='line-3'>
        <button id='upvote-btn'>
        </button>
        <button id='downvote-btn'>
        </button>
        <p id='quality-line'>quality:  <span id="qual">${quality}</span></p>
      </div>
     </div>`
   )
}

$(document).ready(function() {
  for(var i=0;i<localStorage.length;i++) {
    var obj = localStorage.getItem(localStorage.key(i))
    var parsedObj = JSON.parse(obj)
    var $ideaTitle = parsedObj.title
    var $ideaContent = parsedObj.body
    var $id = parsedObj.id
    var quality = parsedObj.quality
    prependCard($id, $ideaTitle, $ideaContent, quality)
  }
})

$('#save-btn').on('click', function() {
  var ideaTitle = $('#item-title').val()
  var ideaContent = $('#item-content').val()
  var id = $.now()
  var quality = 'swill'
  var newIdea = new Idea(id,ideaTitle,ideaContent)
  localStorage.setItem(id, JSON.stringify(newIdea))
  prependCard(id,ideaTitle,ideaContent,quality)
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
