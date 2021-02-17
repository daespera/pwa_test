$(() => {
	menu = $('nav ul');

  $('#openup').on('click', (e) => {
    e.preventDefault(); menu.slideToggle();
  });
  
  $(window).resize(() =>{
    var w = $(this).width(); if(w > 480 && menu.is(':hidden')) {
      menu.removeAttr('style');
    }
  });
  
  $('nav li').on('click', (e) => {                
    var w = $(window).width(); if(w < 480 ) {
      menu.slideToggle(); 
    }
  });
  $('.open-menu').height($(window).height());
});

if ('serviceWorker' in navigator){
  window.addEventListener('load', () => {
    navigator.serviceWorker
    .register('service-worker.js')
    .then(
      registration => console.log('worker got registered'),
      error => console.log("registration failed", error)
    )
    .catch(error => console.log("registration failed", error))
  }
  );
}else{
  console.log("sorry not supported");
}