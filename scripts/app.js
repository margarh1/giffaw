$(document).on("ready", function(){
  $.ajax({
    method: 'GET',
    url: 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC',
    success: onSuccess,
    error: onError,
    complete: onComplete
  })

  var hiddenOffset = $('input').eq(2);
  var offsetBy = 25;

  $('form').on('submit', function(event) {
    event.preventDefault();
    callCatGifs();
    increaseOffsetValue();
    $('.btn-primary').attr('value', 'Load More');
  })

  function increaseOffsetValue() {
   hiddenOffset.attr('value', offsetBy);
   offsetBy += 25;
  }
});

function onSuccess(json) {
  var gifs = json.data;
  if ($('.gif-gallery').html() !== gifs[0].images.original.url) {
    $('.gif-gallery').empty();
  }
  for (var idx = 0; idx < gifs.length; idx++) {
    $('.gif-gallery').append("<img src='" + gifs[idx].images.original.url + "'>");
  }
}

function onError(xhr, status, errorThrown) {
  alert('Sorry, there was a problem!');
  console.log('Error: ' + errorThrown);
  console.log('Status: ' + status);
  console.dir(xhr);
}

function onComplete() {
  console.log('Finished');
}

function callCatGifs() {
  $.ajax({
    method: 'GET',
    url: 'http://api.giphy.com/v1/gifs/search',
    data: $('form').serialize(),
    success: onSuccess,
    error: onError,
    complete: onComplete
  })
}

