
  // =validation

  function removeThanksBlockContacts(){
    $('.form_container, .contacts_page .left_cont .form_cont h2').removeClass('hide');
    $('.form_thanks_wrap').removeClass('active');
  }


  var errorTxt = 'Ошибка отправки';
  jQuery("#sendform").validate({
    rules: {
        'message': { //  <- MUST match the NAME, not the ID
            required:true,
            minlength:8
        }
    },
    submitHandler: function(form){
      var form = document.forms.sendform,
        formData = new FormData(form),
        xhr = new XMLHttpRequest();
        
      xhr.open("POST", "../ajax.php");
      
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if(xhr.status == 200) {
            $('.form_container, .contacts_page .left_cont .form_cont h2').addClass('hide');
            $('.form_thanks_wrap').addClass('active');
            $("#sendform")[0].reset();
            $('.download_cont').removeClass('hide');
            $('.name_file').removeClass('active');
            $('#name_file').html('');
            setTimeout(removeThanksBlockContacts, 5000);
          }
        }
      };
      xhr.send(formData);
    }
  }); 


function sendSuccess(callback){
  jQuery(callback).find("form fieldset").html(thank);
  startClock();
}

$('form').each(function() {
  $(this).validate();
});


// parallax

//$('.frankivsk_cake').parallax({imageSrc: '../images/back1.png'});



// download file

if ($('#file_input').length) {

  document.getElementById('file_input').onchange = function() {
    if (this.files[0]) // если выбрали файл
      document.getElementById('name_file').innerHTML = this.files[0].name;
    $('.download_cont').addClass('hide');
    $('.name_file').addClass('active');
  };

  $('.remove_file').on('click', function(event) {
    event.preventDefault();
    $('.download_cont').removeClass('hide');
    $('.name_file').removeClass('active');
    $('.contacts_page .left_cont .form_cont .bottom_form .download_cont label input').val('');
  });


}

// ajax script

function removeThanksBlock(){
  $('.form_container').removeClass('hide');
  $('.form_thanks_wrap').removeClass('active');
}


$(document).on('submit','.form_item',function(e){
  e.preventDefault();
  form = $(this);
  $.ajax({
      url: '../ajax.php',
      data: form.serialize(),
      type: "post",
      dataType: "json",
      success: function (resp) {
          form[0].reset();

          if ($('.fancybox-enabled').length) {
            $('.fancybox-is-open .modal_container_text').addClass('hide');
            $('.fancybox-is-open .modal_container_thanks').addClass('active');
          }else{
            $('.form_container').addClass('hide');
            $('.form_thanks_wrap').addClass('active');
            setTimeout(removeThanksBlock, 5000);
          }


      }, error: function (resp) {
          form[0].reset();

          if ($('.fancybox-enabled').length) {
            $('.fancybox-is-open .modal_container_text').addClass('hide');
            $('.fancybox-is-open .modal_container_thanks').addClass('active');
          }else{
            $('.form_container').addClass('hide');
            $('.form_thanks_wrap').addClass('active');
            setTimeout(removeThanksBlock, 5000);

          }
      }
  });
});

$("#myform").validate({
  submitHandler: function(form) {
    // some other code
    // maybe disabling submit button
    // then:
    $(form).submit();
  }
 });






$(document).ready(function(){

  // wow js

  new WOW().init();

  //

  if ($(window).width() < 801) {

    // slider 1

    $('.index_page .restaurant_list').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:false,
      adaptiveHeight:true,
      dots:false,
      arrows:false,
    });

    $('.restaurant_list').on('afterChange', function(event, slick, currentSlide){
      var currSlide = currentSlide + 1;
      $('.restaurants_section .current_slide').text(currSlide);
    }); 

  }

  // slider 2

  $('.restaurants_section_page .restaurant_list').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay:false,
      adaptiveHeight:true,
      variableWidth:true,
      dots:false,
      arrows:true,
      infinite:false,
      nextArrow: '.restaurants_section_page .right_arrow',
      prevArrow: '.restaurants_section_page .left_arrow',
      responsive: [
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              variableWidth:false,
            }
          }
        ]
    });


  // width

  if ($('.restaurants_section_page').length) {

    $(window).resize(function(event) {
    
    var elem = $('.restaurants_section_page .container').offset();
    var rightLeft = elem.left;

    var staticWidth = $(window).width();

    var widthCalc = staticWidth - rightLeft - 15;

    $('.restaurants_section_page .restaurant_list').css('width', widthCalc);

    });

    var elem = $('.restaurants_section_page .container').offset();
    var rightLeft = elem.left;

    var staticWidth = $(window).width();

    var widthCalc = staticWidth - rightLeft - 15;

    $('.restaurants_section_page .restaurant_list').css('width', widthCalc);


  }

  // fancybox

  $('.modal_link').fancybox({
    touch:false,
    focus         : false,
  });

  // scroll 

  $(".scroll_link, .about_top .little_nav li a, .cake_section .thumbnail_list li a").on("click touchstart", function (event) {
      event.preventDefault();
      event.stopPropagation();
      var id  = $(this).attr('href');
      var top = $(id).offset().top;
      $('.responsive_wrapper').removeClass('active');
      $('body').removeClass('hidden');
      $('body,html').animate({scrollTop: top}, 1200);
  });

  // selectric

  $('select').selectric({
    disableOnMobile: false,
    nativeOnMobile: false
  });

  $('.current_language').on('click touchstart', function(event) {
    event.preventDefault();
  });


  if ($(window).width() < 851) {

    // language panel

    $('.lang_item').on('click touchstart', function(event) {
      

      if ($(this).hasClass('selected')) {
        $(this).siblings('.lang_item').toggleClass('visible');
        $(this).removeClass('visible');
      }else{
        $('.lang_item').removeClass('selected');
        $(this).addClass('selected');
      }

      $(this).addClass('current_language');
      $(this).removeClass('hidden_language');

      $(this).siblings('.lang_item').removeClass('current_language');
      $(this).siblings('.lang_item').addClass('hidden_language');
      
    });

  }else{

    $('.language_cont').hover(function() {
      $(this).children('.hidden_language').addClass('visible');
    }, function() {
      $(this).children('.hidden_language').removeClass('visible');
    });

    $('.lang_item').on('click', function(event) {
      

      $(this).parent('.language_cont').children('.lang_item').removeClass('selected');
      $(this).addClass('selected');
      $(this).removeClass('visible');

      $(this).addClass('current_language');
      $(this).removeClass('hidden_language');

      $(this).siblings('.lang_item').removeClass('current_language');
      $(this).siblings('.lang_item').addClass('hidden_language');

      console.log('click');
    });


    
  }

  

  // faq on index page

  if ($(window).width() < 1200) {
    $('.sertificate_questions__li .title').on('click', function(event) {
      event.preventDefault();
      $(this).siblings('.text_content').slideToggle(400);
      $(this).children('img').toggleClass('active');
    });
  }

  // mobile menu

  $('.mob_menu_butt').on('click', function (e) {
    event.preventDefault();
    if($(this).hasClass('mob_menu_butt--active')){
      $(this).removeClass('mob_menu_butt--active');
      $('.responsive_wrapper').removeClass('active');
      $('.wrapper').removeClass('body--active');

    }
    else{
      $(this).addClass('mob_menu_butt--active');
      $('.responsive_wrapper').addClass('active');
      $('.wrapper').addClass('body--active');
      
    }
  });

  $('.close_menu').on('click', function(event) {
    event.preventDefault();
    $('.responsive_wrapper').removeClass('active');
     $('.wrapper').removeClass('body--active');
     $('.mob_menu_butt').removeClass('mob_menu_butt--active');
  });

  // menu mobile toggle inside

  $('.responsive_wrapper nav .nav_li .nav_link').on('click', function(event) {
    event.preventDefault();
    $('.dropdown_list').slideToggle(400);
    $(this).toggleClass('active');
  });


  if ($('#map').length) {
      
    function initMap() {

      var map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(48.914778, 24.709862),
        zoom: 17,
        disableDefaultUI: false,
        styles: [
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e9e9e9"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 29
                        },
                        {
                            "weight": 0.2
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 18
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#dedede"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "saturation": 36
                        },
                        {
                            "color": "#333333"
                        },
                        {
                            "lightness": 40
                        }
                    ]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        },
                        {
                            "lightness": 19
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#fefefe"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#fefefe"
                        },
                        {
                            "lightness": 17
                        },
                        {
                            "weight": 1.2
                        }
                    ]
                }
            ]
      });


  
        var uluru = new google.maps.LatLng(48.914778, 24.709862);

        var svgi = {
          url: '../images/map_geo.svg',
        } 

       var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon:svgi,
        title: '23 restaurants'
      });

                
    };
    initMap();
  }

  // faq on jobs page

  $('.actual_jobs__link').on('click', function(event) {
    event.preventDefault();

    $(this).toggleClass('active');
    $(this).siblings('.actual_job_info').slideToggle(400);
  });

  // animated slider

  $('.slider_animation').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay:false,
      adaptiveHeight:false,
      dots:false,
      arrows:false,
      centerMode: true,
      centerPadding: '60px',
      pauseOnHover:false,
      variableWidth:true,
      autoplaySpeed: 0,
      speed: 2700,
      cssEase: 'linear',
      /*nextArrow: '.slider_control__overlay .right',
      prevArrow: '.slider_control__overlay .left',*/
      responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay:false,
              speed:500,
              rows: 1,
              swipeToSlide: true
            }
          }
        ]
    });

/*  $(".slider_control__overlay").on("click", function(e){ 
      $('.slider_animation').slick('slickSetOption', 'speed', 100);
  });*/
  

 /* $('.slider_control__overlay').hover(function() {
    $('.slider_animation').slick('slickPause');
  }, function() {
    $('.slider_animation').slick('slickPlay');
  });*/

  $('.slider_control__overlay').mouseleave(function(event) {
    $('.slider_animation').slick('slickSetOption', 'autoplay', true);
    $('.slider_animation').slick('slickPause');
  });

  $('.slider_control__overlay .right').hover(function() {
    $('.slider_animation').slick('slickSetOption', 'slidesToScroll', 1);
    $('.slider_animation').slick('slickPlay');
  }, function() {
    /* Stuff to do when the mouse leaves the element */
  });

  $('.slider_control__overlay .left').hover(function() {
    $('.slider_animation').slick('slickSetOption', 'slidesToScroll', -1);
    $('.slider_animation').slick('slickPlay');
  }, function() {
    /* Stuff to do when the mouse leaves the element */
  });

  if ($('.slider_animation').length) {

    var heightTop = 0;

    function sliderStop(){
      $('.slider_animation').slick('slickPause');
    }

    $(document).scroll(function () {
      s_top = $(window).scrollTop();
      block1 = parseInt($(".slider_animation").offset().top - 800);
      if((s_top > block1)&&(heightTop == 0)){
        console.log('кукареку');
        $('.slider_animation').slick('slickPlay');
        setTimeout(sliderStop, 500);
        heightTop=1;
      }      
    });


  }


  // team block

  if ($(window).width() > 992) {

    $('.years_list li span').hover(function() {

      $('.years_list li span').removeClass('active');
      $(this).addClass('active');

      var currentValue = $(this).data('count');

      
      $('.team_section .middle_cont .count_item').addClass('animate');

      function ripClass(){
        $('.team_section .middle_cont .count_item').removeClass('animate');
      }

      setTimeout(ripClass, 300);
      

      

      /*if (($(this).hasClass('on')) > 0) {
        $(this).removeClass('on');
        $('.team_section .middle_cont .count_item').removeClass('animate');
      }else{
        $(this).addClass('on');
        $('.team_section .middle_cont .count_item').addClass('animate');
      }
*/
      
      $('.team_section .middle_cont .count_item').html(currentValue);

    }, function() {
      $('.team_section .middle_cont .count_item').removeClass('animate');
      $(this).removeClass('on');
    });

  }else{

    $('.years_list li span').removeClass('active');

    $('.count_slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:false,
      dots:false,
      fade:true,
      speed:500,
      arrows:false,
      asNavFor: '.years_list',
    });

    $('.years_list').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:false,
      dots:false,
      fade:true,
      speed:500,
      arrows:true,
      nextArrow: '.team_section .arrow_right',
      prevArrow: '.team_section .arrow_left',
      asNavFor: '.count_slider',
    });

    $('.team_section .arrow_left').on('click', function(event) {
      event.preventDefault();
      $('.team_section .bottom_cont .years_list li').removeClass('right_class');
      $('.team_section .bottom_cont .years_list li').addClass('left_class');
    });

    $('.team_section .arrow_right').on('click', function(event) {
      event.preventDefault();
      $('.team_section .bottom_cont .years_list li').removeClass('left_class');
      $('.team_section .bottom_cont .years_list li').addClass('right_class');
    });

    /*$('.years_list').on('afterChange', function(event, slick, currentSlide){

      $('.team_section .middle_cont .count_item').addClass('animate');

      function ripClass(){
        $('.team_section .middle_cont .count_item').removeClass('animate');
      }

      setTimeout(ripClass, 300);

      var countLive = $(this).find('.slick-current').children('span').data('count');
      $('.team_section .middle_cont .count_item').html(countLive);

    }); */

  }


  // founder block

  if ($(window).width() < 1200) {

    $('.founders_list li .arrow_link').on('click', function(event) {
      event.preventDefault();

      $(this).parent('li').toggleClass('active');

    });

    
  }

  if ($(window).width() < 769) {

    $('.founders_list').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:false,
      dots:false,
      speed:500,
      arrows:false,
    });

    $('.founders_list').on('afterChange', function(event, slick, currentSlide){
      var currSlide = currentSlide + 1;
      $('.founders_section .current_slide').text(currSlide);
    }); 

  }

  // cake faq

  $('.cake_section .good_info .bottom ul li a').on('click', function(event) {
    event.preventDefault();
    $(this).toggleClass('active');
    $(this).siblings('p').slideToggle(400);
  });

  // cake page calculator

  var currentPrice = $('.buy_cake_modal .price_count').html();

  $('.plus').click(function() {
    $(this).parent('div').children('div.counter').children('span').html(+$(this).parent('div').children('div.counter').children('span').html()+1);
    var priceNew = $('.buy_cake_modal .counter span').html();
    $('.buy_cake_modal .price_count').html(currentPrice * priceNew);

    $('.cakes_count').val(priceNew);
    $('.cake_price').val(currentPrice * priceNew);

  });

  $('.minus').click(function() {
    if($(this).parent('div').children('div.counter').children('span').html()>1){
    $(this).parent('div').children('div.counter').children('span').html(+$(this).parent('div').children('div.counter').children('span').html()-1);
    var priceNew = $('.buy_cake_modal .counter span').html();
    $('.buy_cake_modal .price_count').html(currentPrice * priceNew);

    $('.cakes_count').val(priceNew);
    $('.cake_price').val(currentPrice * priceNew);

    }
  });

  // cake page slider on mobile

  if ($(window).width() < 1200) {

    $('.good_item_list').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:false,
      dots:false,
      arrows:false,
    });

    $('.cake_section').on('afterChange', function(event, slick, currentSlide){
      var currSlide = currentSlide + 1;
      $('.cake_section .current_slide').text(currSlide);
    }); 

  }

  // restaurant page menu

  $('.menu_little_open').on('click', function(event) {
    event.preventDefault();

    $('.menu_little_rest').addClass('open');

  });

  $('.menu_little_rest .close, .menu_little_rest .inside .overlay').on('click', function(event) {
    event.preventDefault();

    $('.menu_little_rest').removeClass('open');

  });

  // mask js

  if ($('input[type="tel"]').length) {

    $('input[type="tel"]').mask('+38 (000) 000-0000');

  }


  // index page selectric form

  $('.become_part select').on('selectric-change', function(event, element, selectric) {
    var currValue = $(this).val();
    $('.become_part .selected_value').val(currValue);
  });

  $('.become_part select').on('selectric-change', function(event, element, selectric) {
    var currValue = $(this).val();
    $('.become_part .selected_value').val(currValue);
  });


  // scroll header

  var tempScrollTop = 0;
  var currentScrollTop = 0;

  jQuery(window).scroll(function(){

  currentScrollTop = jQuery(window).scrollTop();

  if (tempScrollTop < currentScrollTop ){
    console.log('Scroll down');

    $('header').addClass('header_hide');

    if ($(window).scrollTop() < 20){
        $('header').removeClass('header_hide');
        $('.modified_header_page header').addClass('header_mod2');
        console.log('hello privet');
      }

  }
  else if (tempScrollTop > currentScrollTop ){
    console.log('Scroll up');
    $('header').removeClass('header_hide');
    $('.modified_header_page header').addClass('header_mod2');

    /*if ($(window).scrollTop() < 100){
        $('header').removeClass('header_hide');
        $('.modified_header_page header').addClass('header_mod2');
        console.log('hello privet');
      }*/

     if (currentScrollTop == 0) {
      console.log('top of page');
      $('.modified_header_page header').removeClass('header_mod2');
      $('header').removeClass('header_hide');
    }


  } 

  tempScrollTop = currentScrollTop;

  });


/*  $(window).on("scroll", function() {

    if ($(window).scrollTop() > 10){
      $('.header').addClass('fixed');
    }
    else {
      $('.header').removeClass('fixed');
    }

  });*/

  // selectric remove first option

  if ($('#jobs_selectric').length) {
   $('#jobs_selectric').on('selectric-open', function(event, element, selectric) {
      $(this).parent('.selectric-hide-select').parent('.selectric-wrapper').find('.selectric-items li:first-child').css('display', 'none');
    });
  }

  // jobs page change select

  $('.apply_num1').on('click', function(event) {
    event.preventDefault();
    $('.selectric_wrapper_own select').append('<option value="Барменом">Барменом</option><option value="Касиром-офіціантом">Касиром-офіціантом</option><option value="Кухарем на грилі">Кухарем на грилі</option><option value="Менеджером">Менеджером</option><option value="Офіціантом">Офіціантом</option>');
   });

  $('.apply_num2').on('click', function(event) {
    event.preventDefault();
    $('.selectric_wrapper_own select').append('<option value="Касиром-офіціантом">Касиром-офіціантом</option><option value="Барменом">Барменом</option><option value="Кухарем на грилі">Кухарем на грилі</option><option value="Менеджером">Менеджером</option><option value="Офіціантом">Офіціантом</option>');
   });

  $('.apply_num3').on('click', function(event) {
    event.preventDefault();
    $('.selectric_wrapper_own select').append('<option value="Кухарем на грилі">Кухарем на грилі</option><option value="Барменом">Барменом</option><option value="Касиром-офіціантом">Касиром-офіціантом</option><option value="Менеджером">Менеджером</option><option value="Офіціантом">Офіціантом</option>');
   });

  $('.apply_num4').on('click', function(event) {
    event.preventDefault();
    $('.selectric_wrapper_own select').append('<option value="Менеджером">Менеджером</option><option value="Барменом">Барменом</option><option value="Касиром-офіціантом">Касиром-офіціантом</option><option value="Кухарем на грилі">Кухарем на грилі</option><option value="Офіціантом">Офіціантом</option>');
   });

  $('.apply_num5').on('click', function(event) {
    event.preventDefault();
    $('.selectric_wrapper_own select').append('<option value="Офіціантом">Офіціантом</option><option value="Барменом">Барменом</option><option value="Касиром-офіціантом">Касиром-офіціантом</option><option value="Кухарем на грилі">Кухарем на грилі</option><option value="Менеджером">Менеджером</option>');
   });

  $('.applying_link').on('click', function(event) {
    event.preventDefault();
    $('select').selectric({
      disableOnMobile: false,
      nativeOnMobile: false
    });

    var currVar = $(this).attr('data-current-sel-value');
    console.log('currVar =', currVar);

    $('.jobs_modal_form').find('.selected_value').val(currVar);
  });

  $(".modal_link").fancybox({
    afterClose: function() {
      $('.selectric_wrapper_own select').html('');
    }
  });

 // jobs page selectric form

  $('.jobs_section__right select').on('selectric-change', function(event, element, selectric) {
    var currValue = $(this).val();
    $('.jobs_section__right .selected_value').val(currValue);
  });

  $('.jobs_modal_form select').on('selectric-change', function(event, element, selectric) {
    var currValue = $(this).val();
    $(this).parent('.selectric-hide-select').parent('.selectric-wrapper').parent('.selectric_wrapper_own').parent('form').find('.selected_value').val(currValue);
  });


});

$(window).on('load', function(){
  var tempScrollTop = 0;
  var currentScrollTop = 0;
    currentScrollTop = jQuery(window).scrollTop();

    if (tempScrollTop < currentScrollTop ){
      console.log('Scroll down');

      $('header').addClass('header_mod2');

    }
    else if (tempScrollTop > currentScrollTop ){
      console.log('Scroll up');
      $('header').removeClass('header_hide');
      $('.modified_header_page header').addClass('header_mod2');
      if (currentScrollTop == 0) {
        console.log('top of page');
        $('.modified_header_page header').removeClass('header_mod2');
        $('header').removeClass('header_hide');
      }
    }

    console.log('tempScrollTop =', tempScrollTop);
    console.log('currentScrollTop =', currentScrollTop);


    tempScrollTop = currentScrollTop;

    
  });

/* start slider*/
$(document).ready(function () {
  $("#makeMeScrollable").smoothDivScroll({
   /* mousewheelScrolling: "allDirections",*/
    manualContinuousScrolling: true,
 /*   scrollToAnimationDuration: 1,*/
    scrollToEasingFunction: "easeOutCirc",
    touchScrolling: true,
  });
});
/* end slider*/