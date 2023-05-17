(function() {
    "use strict";
    var e = {
        initialized: false,
        initialize: function() {
            if (this.initialized) return;
            this.initialized = true;
            this.build();
            this.events()
        },
        build: function() {
            if ($("#fcSlideshow").get(0)) {
                $("#fcSlideshow").flipshow();
                setInterval(function() {
                    $("#fcSlideshow div.fc-right span:first").click()
                }, 3e3)
            }
            if ($("#revolutionSlider").get(0)) {
                var e = $("#revolutionSlider").revolution({
                    delay: 9e3,
                    startheight: 500,
                    startwidth: 960,
                    hideThumbs: 10,
                    thumbWidth: 100,
                    thumbHeight: 50,
                    thumbAmount: 5,
                    navigationType: "both",
                    navigationArrows: "verticalcentered",
                    navigationStyle: "round",
                    touchenabled: "on",
                    onHoverStop: "on",
                    navOffsetHorizontal: 0,
                    navOffsetVertical: 20,
                    stopAtSlide: -1,
                    stopAfterLoops: -1,
                    shadow: 1,
                    fullWidth: "on"
                });
                $("#revolutionSlider .tp-caption").on("mousedown", function(t) {
                    t.preventDefault();
                    e.revpause();
                    return false
                })
            }
            if ($("#revolutionSliderFullScreen").get(0)) {
                var e = $("#revolutionSliderFullScreen").revolution({
                    delay: 9e3,
                    startwidth: 1170,
                    startheight: 600,
                    hideThumbs: 200,
                    thumbWidth: 100,
                    thumbHeight: 50,
                    thumbAmount: 5,
                    navigationType: "both",
                    navigationArrows: "verticalcentered",
                    navigationStyle: "round",
                    touchenabled: "on",
                    onHoverStop: "on",
                    navOffsetHorizontal: 0,
                    navOffsetVertical: 20,
                    stopAtSlide: -1,
                    stopAfterLoops: -1,
                    shadow: 0,
                    fullWidth: "on",
                    fullScreen: "on",
                    fullScreenOffsetContainer: ".header"
                })
            }
            if ($("#nivoSlider").get(0)) {
                $("#nivoSlider").nivoSlider()
            }
        },
        events: function() {
            this.moveCloud()
        },
        moveCloud: function() {
            var e = this;
            $(".cloud").animate({
                top: "+=20px"
            }, 3e3, "linear", function() {
                $(".cloud").animate({
                    top: "-=20px"
                }, 3e3, "linear", function() {
                    e.moveCloud()
                })
            })
        }
    };
    e.initialize()
})();
(function() {
    "use strict";
    var e = {
        initialized: false,
        initialize: function() {
            if (this.initialized) return;
            this.initialized = true;
            this.build();
            this.events()
        },
        build: function() {
            this.validations()
        },
        events: function() {},
        validations: function() {
            $("#contactForm").validate({
                submitHandler: function(e) {
                    var t = $(this.submitButton);
                    t.button("loading");
                    $.ajax({
                        type: "POST",
                        url: "https://www.enttia.es/php/contact-form.php",
                        data: {
                            name: $("#contactForm #name").val(),
                            email: $("#contactForm #email").val(),
                            subject: $("#contactForm #subject").val(),
                            message: $("#contactForm #message").val(),
                            check: $("#contactForm #check").val()
                        },
                        dataType: "json",
                        success: function(e) {
                            if (e.response == "success") {

                               var dataLayer = window.dataLayer || [];
                               dataLayer.push({'event': 'cfsend'});

                                $("#contactSuccess").removeClass("hidden");
                                $("#contactError").addClass("hidden");
                                if (contactForm.check.value) {}
                                
                                $("#contactForm .form-control").val("").blur().parent().removeClass("has-success").removeClass("has-error").find("label.error").remove();
                                // if ($("#contactSuccess").position().top - 80 < $(window).scrollTop()) {
                                //     $("html, body").animate({
                                //         scrollTop: $("#contactSuccess").offset().top - 80
                                //     }, 300)
                                // }


                            setTimeout(function(){

                                document.location.href = "gracias.php";

                            },2000);

                           
                            } else {
                                $("#contactError").removeClass("hidden");
                                $("#contactSuccess").addClass("hidden");
                                if ($("#contactError").position().top - 80 < $(window).scrollTop()) {
                                    $("html, body").animate({
                                        scrollTop: $("#contactError").offset().top - 80
                                    }, 300)
                                }
                            }
                        },
                        complete: function() {
                            t.button("reset")
                        }
                    })
                },
                rules: {
                    name: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    subject: {
                        required: true
                    },
                    message: {
                        required: true
                    }
                },
                highlight: function(e) {
                    $(e).parent().removeClass("has-success").addClass("has-error")
                },
                success: function(e) {
                    $(e).parent().removeClass("has-error").addClass("has-success").find("label.error").remove()
                }
            })
        }
    };
    e.initialize()
})()
 function f_scroll() {

    last_scroll_top = 0;
    top_display = 100;

    $(window).off('scroll')
    $(window).on('scroll', function(){

         var scroll_top = $(this).scrollTop();

         if ((scroll_top > last_scroll_top) && (scroll_top >top_display)) {
                 //downscroll code
                 $('.header').addClass('has-transform-header');
                 $('.js-footer').addClass('has-transform-footer');
         } else {
                 $('.header').removeClass('has-transform-header');
                 $('.js-footer').removeClass('has-transform-footer');
         }

         last_scroll_top = scroll_top;
    });

    var $window = $(window);
 var maxWidth = 600; /* <--- Custom size here*/

 $window.on('scroll resize', function(){

     if ($(window).width() <= maxWidth) {  
         $('.input-focus').on('focusin', function() {
             $('.header').addClass('has-transform-header');
             $('.js-footer').addClass('has-transform-footer');
         });

         $('.input-focus').on('focusout', function(){
             $('.header').removeClass('has-transform-header');
             $('.js-footer').removeClass('has-transform-footer');
         });


     }   

 });

};
$(document).ready(function() {

    f_scroll();

    var heightHead = $('body .header').outerHeight();
    $('body').css('padding-top', heightHead + 'px');
    $(".js-footer-toggle__left").click(function() {
        var heightHeader = $('body .header').outerHeight();
      
          $('html, body').animate({
              scrollTop: $("#contact").offset().top - heightHeader
          }, 2000);
      });

});