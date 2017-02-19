function Idea(id, title, body, quality="swill") {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality;
}

function prependCard($id, $ideaTitle, $ideaContent, $quality) {
  $('#display-side').prepend(
    `<div class='idea-card' id=${$id}>
      <div class='title-line'>
        <div  id='line-1'>
          <h2 class='titleEdit' contenteditable='true'>${$ideaTitle}</h2>
          <button id='delete-button'>
          </button>
        </div>
        <p id='line-2' contenteditable='true'>${$ideaContent}</p>
      </div>
      <div id='line-3'>
        <button id='upvote-button'>
        </button>
        <button id='downvote-button'>
        </button>
        <p id='quality-line'>quality:  <span id="qual">${$quality}</span></p>
      </div>
     </div>`);
}

$(document).ready(function () {
  for(var i=0;i<localStorage.length;i++) {
      var obj = localStorage.getItem(localStorage.key(i));
      var parsedobj = JSON.parse(obj);
      var $ideaTitle = parsedobj.title;
      var $ideaContent = parsedobj.body;
      var $id = parsedobj.id;
      var $quality = parsedobj.quality;
      prependCard($id, $ideaTitle, $ideaContent, $quality);
  }
});

$('#save-button').on('click', function() {
  var $ideaTitle = $('#idea-title').val();
  var $ideaContent = $('#idea-content').val();
  var $id = $.now();
  var $quality = 'swill';
  var newIdea = new Idea($id, $ideaTitle, $ideaContent);
  var stringifiedIdea = JSON.stringify(newIdea);
  localStorage.setItem($id, stringifiedIdea);
  prependCard($id, $ideaTitle, $ideaContent, $quality);
  $('#idea-title').val('');
  $('#idea-content').val('');
});

$('#display-side').on('click', '#upvote-button', function () {
  var $qualityText = $(this).siblings('#quality-line').children();
  if ($qualityText.text() === 'swill') {
    $qualityText.text('plausible');
  } else if ($qualityText.text() === 'plausible') {
    $qualityText.text('genius');
  }
  var $whatIsGrabbed = $(this).closest('.idea-card');
  var idValue = $whatIsGrabbed.attr('id');
  var lsitem = localStorage.getItem(idValue);
  var parselsitem = JSON.parse(lsitem);
  var $quality = $qualityText.text();
  parselsitem.quality = $quality;
  var stringedit = JSON.stringify(parselsitem);
  localStorage.setItem(idValue, stringedit);
});

$('#display-side').on('click', '#downvote-button', function () {
  var $qualityText = $(this).siblings('#quality-line').children();
  if ($qualityText.text() === 'genius') {
    $qualityText.text('plausible');
  } else if ($qualityText.text() === 'plausible') {
    $qualityText.text('swill');
  }
  var $whatIsGrabbed = $(this).closest('.idea-card');
  var idValue = $whatIsGrabbed.attr('id');
  var lsitem = localStorage.getItem(idValue);
  var parselsitem = JSON.parse(lsitem);
  var $quality = $qualityText.text();
  parselsitem.quality = $quality;
  var stringedit = JSON.stringify(parselsitem);
  localStorage.setItem(idValue, stringedit);
});

$('#display-side').on('click', '#delete-button', function() {
  var $whatIsDeleted = $(this).closest('.idea-card');
  $whatIsDeleted.remove();
  var idValue = $whatIsDeleted.attr('id');
  localStorage.removeItem(idValue);
});

$('#display-side').on('blur', '.titleEdit', function () {
  var $ideaTitle = $(this).text();
  var $whatIsGrabbed = $(this).closest('.idea-card');
  var idValue = $whatIsGrabbed.attr('id');
  var lsitem = localStorage.getItem(idValue);
  var parselsitem = JSON.parse(lsitem);
  parselsitem.title = $ideaTitle;
  var stringedit = JSON.stringify(parselsitem);
  localStorage.setItem(idValue, stringedit);
});

$('#display-side').on('blur', '#line-2', function () {
  var $ideaContent = $(this).text();
  var $whatIsGrabbed = $(this).closest('.idea-card');
  var idValue = $whatIsGrabbed.attr('id');
  var lsitem = localStorage.getItem(idValue);
  var parselsitem = JSON.parse(lsitem);
  parselsitem.body = $ideaContent;
  var stringedit = JSON.stringify(parselsitem);
  localStorage.setItem(idValue, stringedit);
});

$('#search').on('keyup', function() {
    var searchInput = $(this).val().toLowerCase();
    $('.title-line').each(function() {
      var searchText = $(this).text().toLowerCase();
      if (!!searchText.match(searchInput)) {
        $(this).closest('.idea-card').toggle(true);
      }else {
        $(this).closest('.idea-card').toggle(false);
      }
    });
});

$('#idea-title, #idea-content').on('keyup', function () {
  var $ideaTitle = $('#idea-title');
  var $ideaContent = $('#idea-content');
  if ($ideaTitle.val() !== "" && $ideaContent.val() !== ""){
    $('#save-button').prop('disabled', false);
  } else {
    $('#save-button').prop('disabled', true);
  }
})
