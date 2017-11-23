$('.delete').on('click', function(e) {
  e.preventDefault();
  var toDelete = $(this);
  var deleteUrl = toDelete.attr('href');
  $.ajax({
     method: 'DELETE',
     url: deleteUrl
  }).done(function(data) {
      console.log(data);
    });
  });
