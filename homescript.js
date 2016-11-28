function main(){
  $('.main').hide();
  $('.main').fadeIn(1000);
  $('.rede').hide();
  $('.rede').fadeIn(1000);
  $('.intro').hide();
  $('.intro').fadeIn(1000);
  
  $('#seta').on('click', function() {
	$('.second-page').slideToggle(400);
  });
}

$(document).ready(main);