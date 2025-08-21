$(document).ready(function() {
    $('.container-earth').click(function() {
       $("#bg-earth").addClass('move');
      
  
         
        setTimeout(function() {
             $(".container-earth").addClass('bgsaudi');
            $("#bg-earth").addClass('tosaudi');
            setTimeout(function() {
              setTimeout(function() {
                $("#bg-earth").addClass('tosaudihide');
              }, 700); 

               $("#saudi_arabia").addClass('displaysaudi');
               $("#list-item-airport").addClass('show');
               $("#list-airport-name").addClass('show');
            }, 400); 
          },2000); 
 
    });
    $('.airport').click(function() {
      $(".info-airport").hide();
      $(".airport").hide();
      var id="#info-airport-"+$(this).attr("data-id")
      $(id).show();
      $(".div-info-airport").show();
      $(".div-list-item-airport").hide();
      $("#list-airport-name").hide();
      $(".RETURN").show();
      $(this).show();


    });
    $('.RETURN').click(function() {
      $(".airport").show();
      $(".div-info-airport").hide();
      $(".info-airport").hide();
      $(".div-list-item-airport").show();
      $("#list-airport-name").show();
      $(".RETURN").hide();

      
    });
    $('.btn-modal-close').click(function() {
      $(".white-div").hide();
      $(".white-div .body-white-div>div").hide()
      $(".black-div").hide();
      $(".RETURN").show();

    });
    $('.black-div').click(function() {
      $(".white-div").hide();
      $(".white-div .body-white-div>div").hide()
      $(".black-div").hide();
      $(".RETURN").show();

    });
    $('.btn-list').click(function() {
      var id=$(this).attr("data-id")
      var type=$(this).attr("data-type")
      $(".white-div").show()
      $(".black-div").show();

      $(".white-div .body-white-div>div").hide()
      $("."+type +"-"+ id).css("display","flex")
 
      $(".RETURN").hide();

    });
    adjustLayout() 


    $( window ).on( "resize", function() {
      adjustLayout() 
    } );
  
  });
  function adjustLayout() {
    var width = $('#earth').width();
    $('#earth').height(width);
    
    if (width <= 350) {
        $('#airport_2').css("left", '19%');
        $('#airport_1').css("left", '32%');
        $('#airport_1').css("top", '56%');
        $('#airport_3').css("left", '32%');
        $('#airport_3').css("top", '55%');
    } else if (width < 400) {
        $('#airport_2').css("left", '22%');
        $('#airport_1').css("left", '33%');
        $('#airport_1').css("top", '60.5%');
        $('#airport_3').css("left", '33%');
        $('#airport_3').css("top", '57.5%');
    } else if (width < 450) {
      $('#airport_2').css("left", '22%');
      $('#airport_1').css("left", '33%');
      $('#airport_1').css("top", '61%');
      $('#airport_3').css("left", '33%');
      $('#airport_3').css("top", '57.5%');
    } else {
        $('#airport_2').css("left", '24%');
        $('#airport_1').css("left", '33%');
        $('#airport_1').css("top", '61.5%');
        $('#airport_3').css("left", '33%');
        $('#airport_3').css("top", '58.5%');
    }

 
gsap.registerPlugin(ScrollTrigger);
 
ScrollTrigger.create({
    trigger: '#container-earth',
 
    onEnter: () => {
        document.getElementById('container-earth').click();
    }
});
 

}
