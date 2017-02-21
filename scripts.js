function Idea(id, title, body, rating, complete) {
  this.id = id
  this.title = title
  this.body = body
  this.rating = rating
  this.complete = complete
}

function prependCard(i) {
  $('#card-box').prepend(
    `<article class='item-card ${i.complete}' id="${i.id}">
      <section class='title-line'>
        <div id='line-1'>
          <h2 class='title-edit' contenteditable>${i.title}</h2>
        </div>
        <div class="status-btn-box">
          <button id='complete-btn' class="status-btn" type="button" name="complete button"></button>
          <button id='delete-btn' class="status-btn" type="button" name="delete button"></button>
        </div>
        <div>
          <p id='line-2' contenteditable>${i.body}</p>
        </div>
      </section>
      <section id='line-3'>
        <button id='upvote-btn'></button>
        <button id='downvote-btn'></button>
        <p id='rating-line'>importance: <span id="qual">${i.rating}</span></p>
      </section>
    </article>`
   )
}

function printCard() {
  $('#card-box').html('')
  for (var i=0;i<localStorage.length;i++) {
    prependCard(JSON.parse(localStorage.getItem(localStorage.key(i))))
  }
}

//save button
$('#save-btn').on('click', function() {
  var id = $.now()
  var title = $('#item-title').val()
  var content = $('#item-content').val()
  var rating = 'normal'
  var complete = "notComplete"
  var newItem = new Idea(id,title,content,rating,complete)
  localStorage.setItem(id, JSON.stringify(newItem))
  $('#item-title').val('')
  $('#item-content').val('')
  printCard()
})

//up vote button
$('#card-box').on('click', '#upvote-btn', function() {
  var ratingText = $(this).siblings('#rating-line').children()
    switch(ratingText.text()) {
      case 'critical': ratingText.text('critical'); break
      case 'high': ratingText.text('critical'); break
      case 'normal': ratingText.text('high'); break
      case 'low': ratingText.text('normal'); break
      case 'none': ratingText.text('low'); break
    }
  var thisCard = JSON.parse(localStorage.getItem($(this).closest('.item-card').attr('id')))
  thisCard.rating = ratingText.text()
  localStorage.setItem(thisCard.id, JSON.stringify(thisCard))
})

//down vote button
$('#card-box').on('click', '#downvote-btn', function() {
  var ratingText = $(this).siblings('#rating-line').children()
  switch(ratingText.text()) {
    case 'critical': ratingText.text('high'); break
    case 'high': ratingText.text('normal'); break
    case 'normal': ratingText.text('low'); break
    case 'low': ratingText.text('none'); break
    case 'none': ratingText.text('none'); break
  }
  var thisCard = JSON.parse(localStorage.getItem($(this).closest('.item-card').attr('id')))
  thisCard.rating = ratingText.text()
  localStorage.setItem(thisCard.id, JSON.stringify(thisCard))
})

//task complete button
$('#card-box').on('click', '#complete-btn', function() {
  var thisCard = JSON.parse(localStorage.getItem($(this).closest('.item-card').attr('id')))
  switch(thisCard.complete) {
    case 'notComplete': thisCard.complete = 'complete'; break
    case 'complete': thisCard.complete = 'notComplete'; break
  }
  localStorage.setItem(thisCard.id,JSON.stringify(thisCard))
  printCard()
})

//delete button
$('#card-box').on('click', '#delete-btn', function() {
  localStorage.removeItem($(this).closest('.item-card').attr('id'))
  printCard()
})

//content editable title
$('#card-box').on('blur', '.title-edit', function() {
  var parseItem = JSON.parse(localStorage.getItem($(this).closest('.item-card').attr('id')))
  parseItem.title = $(this).text()
  localStorage.setItem(parseItem.id,JSON.stringify(parseItem))
})

//content editable body
$('#card-box').on('blur', '#line-2', function() {
  var thisCard = JSON.parse(localStorage.getItem($(this).closest('.item-card').attr('id')))
  thisCard.body = $(this).text()
  localStorage.setItem(thisCard.id, JSON.stringify(thisCard))
})

//search function
$('#search').on('keyup', function() {
  var searchInput = $(this).val().toLowerCase()
  $('.title-line').each(function() {
    var searchText = $(this).text().toLowerCase()
    if (!!searchText.match(searchInput)) {
      $(this).closest('.item-card').toggle(true)
    } else {
      $(this).closest('.item-card').toggle(false)
    }
  })
})

//disable button function
$('#item-title, #item-content').on('keyup', function() {
  var itemTitle = $('#item-title').val()
  var itemContent = $('#item-content').val()
  if (itemTitle !== "" && itemContent !== ""){
    $('#save-btn').prop('disabled', false)
  } else {
    $('#save-btn').prop('disabled', true)
  }
})

printCard()
