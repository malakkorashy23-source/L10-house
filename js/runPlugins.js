// --------------------- owl-carousel ---------------------

$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    items:5,
    margin:10,
    loop:true ,
    autoplay :true ,
    autoplayTimeout :2000,
    autoplayHoverPause :true ,
    slideBy:5,
    responsive :{
      0 :{
        items:1
      },
      450 :{
        items:2
      }
      ,
      650 :{
        items:3
      }
      ,
      1050 :{
        items:5
      }
    }
  });
});


// --------------------- wow ---------------------

let wow=new WOW({
  animateClass: 'animate__animated'
}).init();
