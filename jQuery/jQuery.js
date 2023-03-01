$(document).ready(() => {
  $('h1 span').css('color', 'red');
  $('.test').click(function() {
    alert($(this).css('color'));
  })
})