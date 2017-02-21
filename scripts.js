function Idea(id, title, body, rating) {
  this.id = id
  this.title = title
  this.body = body
  this.rating = rating
}

function prependCard($id, $ideaTitle, $ideaContent, rating) {
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
        <p id='rating-line'>importance: <span id="qual">${rating}</span></p>
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
    var rating = parsedObj.rating
    prependCard($id, $ideaTitle, $ideaContent, rating)
  }
})

$('#save-btn').on('click', function() {
  var ideaTitle = $('#item-title').val()
  var ideaContent = $('#item-content').val()
  var id = $.now()
  var rating = 'normal'
  var newIdea = new Idea(id,ideaTitle,ideaContent)
  localStorage.setItem(id, JSON.stringify(newIdea))
  prependCard(id,ideaTitle,ideaContent,rating)
  $('#item-title').val('')
  $('#item-content').val('')
})

$('#card-box').on('click', '#upvote-btn', function() {
  var ratingText = $(this).siblings('#rating-line').children()
    switch(ratingText.text()) {
      case 'critical':
      ratingText.text('critical');
      break;
      case 'high':
      ratingText.text('critical');
      break;
      case 'normal':
      ratingText.text('high');
      break;
      case 'low':
      ratingText.text('normal');
      break;
      case 'none':
      ratingText.text('low');
      break;
    }
  var thisCardObj = $(this).closest('.idea-card')
  var idValue = thisCardObj.attr('id')
  var lsItem = JSON.parse(localStorage.getItem(idValue))
  lsItem.rating = ratingText.text()
  localStorage.setItem(idValue, JSON.stringify(lsItem))
})

$('#card-box').on('click', '#downvote-btn', function() {
  var ratingText = $(this).siblings('#rating-line').children()
  switch(ratingText.text()) {
    case 'critical':
    ratingText.text('high');
    break;
    case 'high':
    ratingText.text('normal');
    break;
    case 'normal':
    ratingText.text('low');
    break;
    case 'low':
    ratingText.text('none');
    break;
    case 'none':
    ratingText.text('none');
    break;
  }
  var thisCardObj = $(this).closest('.idea-card')
  var idValue = thisCardObj.attr('id')
  var lsItem = JSON.parse(localStorage.getItem(idValue))
  lsItem.rating = ratingText.text()
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
