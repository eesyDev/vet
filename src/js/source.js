// lazyload for images
function img_loader() {
    setTimeout(function(){
        $('body').find('img[data-src]').each(function(){
            var src = $(this).attr('data-src');
            var srcset = $(this).attr('data-srcset');
            var classes = $(this).attr('class');
            var alt = $(this).attr('alt');
            if (src) {
              var img = new Image();
              $(img).hide();
              $(img).on('load', function(){
                $(this).fadeIn(400);
                setTimeout(function(){
                    $(img).addClass('transition');
                },400);
              });
              $(img).attr('srcset', srcset );  
              $(img).attr('src', src );
              $(img).attr('alt', alt);
              $(img).addClass(classes);
              $(this).replaceWith(img);
            }
        });
    }, 150);
}


$.fn.isInViewport = function() {
    var viewportHeight = $(window).height();

    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var elementCenter = elementTop + ($(this).outerHeight()/2);

    if (($(this).outerHeight()/2) > viewportHeight) {elementCenter = elementTop + viewportHeight;}

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + viewportHeight;
    var viewportCenter = viewportTop + (viewportHeight/2);

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

$.fn.percentOfViewport = function() {
    var viewportHeight = $(window).height();

    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).height();

    
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + viewportHeight;
    var viewportCenter = viewportTop + (viewportHeight/2);

    var top_to_top_percent = (elementTop - viewportTop) / viewportHeight * 100;
    var bottom_to_top_percent = (elementBottom - viewportTop) / viewportHeight * 100;

    var top_to_bottom_percent = (viewportBottom - elementTop) / viewportHeight * 100;
    var bottom_to_bottom_percent = (viewportBottom - elementBottom) / viewportHeight * 100;

    return {
        ELtop_to_VPtop:     top_to_top_percent,
        ELbottom_to_VPtop:  bottom_to_top_percent,
        ELtop_to_VPbottom:  top_to_bottom_percent,
        ELbottom_to_VPbottom:  bottom_to_bottom_percent,

        ELtop:    elementTop,
        ELbottom: elementBottom
    };
};


$(document).ready(function(){

    // animations
    $(window).on('load scroll', function(){

        $('.anim-text-cover').each(function(){
            var elem = $(this);

            if ( elem.isInViewport() ) {
                var percent = elem.percentOfViewport();
                var start = 1;
                var end = 1;


                if (percent.ELtop_to_VPbottom <= 50) {
                    start = 1 - (percent.ELtop_to_VPbottom - 25) / 25;
                } else if (percent.ELtop_to_VPbottom > 50) {
                    start = 1 - (percent.ELbottom_to_VPtop - 25) / 25;
                }

                if (percent.ELbottom_to_VPbottom <= 50) {
                    end = 1 - (percent.ELbottom_to_VPbottom - 15) / 15;
                } else if (percent.ELbottom_to_VPbottom > 50) {
                    end = 1 - (percent.ELbottom_to_VPtop - 15) / 15;
                }

                elem.css({
                    '--cover-start-opacity': start,
                    '--cover-end-opacity': end
                });
            }
        });

        $('.anim-opacity').each(function(){
            var elem = $(this);

            if ( elem.isInViewport() ) {
                var percent = elem.percentOfViewport();
                var opacity = 0;
                
                if (percent.ELtop_to_VPbottom <= 50 && percent.ELtop_to_VPbottom > 25) {
                    opacity = (percent.ELtop_to_VPbottom - 25) / 25;
                } else if ( percent.ELtop_to_VPbottom > 50 && percent.ELbottom_to_VPtop > 25) {
                    opacity = (percent.ELbottom_to_VPtop - 25) / 25;
                } else {
                    opacity = 0;
                }

                elem.css({
                    '--opacity': opacity,
                });
            }
        });

        $('.anim-opacity-oneway').each(function(){
            var elem = $(this);

            if ( elem.isInViewport() ) {
                var percent = elem.percentOfViewport();
                var opacity = 0;
                
                if (percent.ELtop_to_VPbottom <= 50 && percent.ELtop_to_VPbottom > 25) {
                    opacity = (percent.ELtop_to_VPbottom - 25) / 25;
                } else if ( percent.ELtop_to_VPbottom > 50) {
                    opacity = 1;
                } else {
                    opacity = 0;
                }

                elem.css({
                    '--opacity': opacity,
                });
            }
        });

        $('.anim-scale').each(function(){
            var elem = $(this);

            if ( elem.isInViewport() ) {
                var percent = elem.percentOfViewport();

                var scale = 2;
                if ( percent.ELtop_to_VPbottom <= 100 ) {
                    scale = 2 - (percent.ELtop_to_VPbottom/100);
                } else if ( percent.ELtop_to_VPbottom > 100 ) {
                    scale = (percent.ELtop_to_VPbottom/100);
                }

                // if (scale < 1) {
                //     scale = 1;
                // }

                elem.css({
                    '--scale': scale,
                });
            }
        });

        $('.anim-scale-invert').each(function(){
            var elem = $(this);

            if ( elem.isInViewport() ) {
                var percent = elem.percentOfViewport();
                var scale = 0.7 + (percent.ELtop_to_VPbottom/100/2);

                if (scale < 0.7) {
                    scale = 0.7;
                }
                if (scale > 1) {
                    scale = 1;
                }

                elem.css({
                    '--scale': scale,
                });
            }
        });

        // warranty big img and text excluded from bg
        $('.anim-scale-big-img').each(function(){
            var elem = $(this);

            if ( elem.isInViewport() ) {
                var percent = elem.parent().percentOfViewport();
                var stage = percent.ELbottom_to_VPbottom + 400;
                
                // get base img sizes and window sizes
                var width = elem.width(),
                    height = elem.height(),
                    VPwidth = $(window).width(),
                    VPheight = $(window).height();



                // calc what size need to use for scaling, geting stop position
                var width_ratio = VPwidth / width,
                    height_ratio = VPheight / height;

                var scale_stop = width_ratio > height_ratio ? width_ratio : height_ratio;
                    // scale_stop = scale_stop * 1.01;  // + safety gap

                var width = stage,
                    scale = stage/100;

                // make extreme positions safe and rounded
                if ( width > 100 ) { width = 100; }          
                if ( width < 50  ) { width = 50;  }  
         
                // stop img scaling and start excluded text scaling
                if ( scale >= scale_stop ) { 
                    scale = scale_stop; 

                    
                    // start excluded text scaling
                    var wrapper = elem.closest('.custom-transition'),
                        textexclude = elem.find('.warranty-text-exclude');

                    var transitionBottom = wrapper.offset().top + wrapper.outerHeight(),
                        textBottom = textexclude.offset().top + textexclude.outerHeight();

                    var textscale = ( ( transitionBottom - textBottom ) / VPheight * 100 ) - 50;

                    var color_opacity = 0.5 - textscale/100;


                    if (VPwidth > 640 && textscale > 100) {
                        textscale = textscale * 1.33;
                    }
                    if (VPwidth <= 640) {
                        textscale = textscale * 0.66;
                    }
                    if (textscale < 5) {
                        textscale = 5 - ( (textscale - 5) * -1)/10; 
                    }

                    if (textscale <= 1) { textscale = 1; }
                    // if (textscale >= 205) { textscale = 205; }


                    textexclude.css({
                        '--scale': textscale,
                        '--color-opacity': color_opacity,
                        'opacity': 1,
                    });
                } else {
                    elem.find('.warranty-text-exclude').css({
                        'opacity': 0,
                    });
                }     

                // rolling full width
                elem.css({
                    'width': width+'%',
                });


                // scaling image to full screen
                if ( scale >= 1 ) {
                    elem.css({
                        '--scale': scale,
                    });
                }
            }
        });

        $('.anim-shift').each(function(){
            var elem = $(this);

            if ( elem.isInViewport() ) {
                var percent = elem.percentOfViewport();
                var shift_x = 0,
                    shift_y = 0;

                var start = 10,
                    stop = 40,
                    base_shift = 100;

                if ( $(window).width() <= 640 ) {
                    base_shift = 50;
                }


                shift_y = base_shift * ( 1 - (percent.ELtop_to_VPbottom - start) / (stop - start) );

                if (shift_y < 0) { shift_y = 0; }
                if (shift_y > base_shift) { shift_y = base_shift; }
                
                opacity = (base_shift - shift_y) / base_shift;

                elem.css({
                    '--shift-x': shift_x+'px',
                    '--shift-y': (shift_y)+'px',
                    '--opacity': opacity,
                });
            }
        });

        $('.anim-parallax').each(function(){
            var elem = $(this);

            if ( elem.isInViewport() ) {
                var pos_top = elem.position().top;
                var elem_height = elem.parent().height();

                var percent = pos_top / elem_height * 200;

                if (percent < 0) {
                    percent = 0;
                } else if (percent > 100) {
                    percent = 100;
                }

                var shift_x = 0;
                var shift_y = -percent + 50;
                var opacity = 0;

                // re-calc percent for opacity without shift
                percent = (pos_top - shift_y) / elem_height * 200;

                if (percent <= 50) {
                    opacity = percent * 3;
                } else if (percent > 50) {
                    opacity = (100 - percent) * 2;
                }

                elem.css({
                    '--shift-x': shift_x+'px',
                    '--shift-y': shift_y+'px',
                    '--opacity': opacity/100
                });
            }
        });

        $('.anim-text-angle-gradient').each(function(){
            var elem = $(this);

            if ( elem.isInViewport() ) {
                var percent = elem.percentOfViewport();
                var progress = 0;
                
                progress = percent.ELtop_to_VPbottom;

                elem.css({
                    '--gradient-progress': progress-50+'%',
                    '--gradient-progress-2': progress+50+'%'
                });
            }
        });

        $('.anim-text-angle').each(function(){
            var elem = $(this);

            if ( elem.isInViewport() ) {
                var percent = elem.percentOfViewport();
                var progress = -100;
                
                progress = -100 + (percent.ELtop_to_VPbottom - 25) / 25 * 100;

                elem.css({
                    '--gradient-progress': progress+'%',
                    '--gradient-progress-2': progress+100+'%'
                });
            }
        });

        $('.anim-video-gradient').each(function(){
            var elem = $(this);

            if ( elem.isInViewport() ) {
                var percent = elem.percentOfViewport();
                var start = 0;

                if (percent.ELtop_to_VPbottom <= 140 && percent.ELtop_to_VPbottom > 70) {
                    start = (percent.ELtop_to_VPbottom - 70) / 70 * 100;
                } else if ( percent.ELbottom_to_VPtop <= 140 && percent.ELbottom_to_VPtop > 70) {
                    start = (percent.ELbottom_to_VPtop - 70) / 70 * 100;
                } else if ( percent.ELtop_to_VPbottom > 140 && percent.ELbottom_to_VPtop > 140 ) {
                    start = 100;
                }

                elem.css({
                    '--gradient-start-pos': start+'%',
                    '--gradient-end-pos': (start+50)+'%'
                });
            }
        });

        $('.simpleuse .love-line').each(function(){
            var elem = $(this);

            if ( elem.isInViewport() ) {
                var scrolled = elem.closest('.sticky').position().top + (elem.closest('.sticky').outerHeight() / 2);
                var full_track = elem.closest('.simpleuse').height() - elem.closest('.sticky').outerHeight();
                var percent = scrolled / full_track;

                // var path = document.getElementById('love'); // svg -> path
                // var path_length = Math.round(path.getTotalLength() );
                // console.log("Длина пути - " + path_length);

                var path_length = 2334;
                if ( $(window).width() > 1500 )  {
                    path_length = 3168;
                }
                var offset = path_length - ( path_length * percent ) ;

                elem.css({
                    'stroke-dasharray': path_length,
                    'stroke-dashoffset': offset,
                });
            }
        });
    });


    // sandwich menu toggle
    $('.sandwich').on('click touch', function(){
        $(this).toggleClass('active');
        $('.products').slideToggle();
    });

    $('.languages').on('click touch', '.current', function(){
        $(this).toggleClass('active').siblings('ul').slideToggle();
    }); 
    
    // Faq toggle
    $('.faq').on('click touch', '.question', function(){
        $(this).closest('.item').siblings('.item').removeClass('active').find('.answer').slideUp();
        $(this).closest('.item').addClass('active').find('.answer').slideDown();
    });
    $('.faq').on('click touch', '.active .question', function(){     
         $(this).closest('.item').removeClass('active').find('.answer').slideUp(); 
    });

    // play video on .play-button click
    $('.play-button-wrp').on('click touch', '.play-button', function(){
        $(this).closest('.video-wrp, .video').find('video').trigger('play').attr('controls', 'true');
        $(this).closest('.play-button-wrp').hide();
    });

    // chat links open/close
    $('.chat-cat').on('click touch', function(){
        $(this).closest('.chat').toggleClass('is-active');
    });

    // Tabs toggle
    // $(".tabs .tabs-list").on('click touch', '.item', function() {
    //     var tab = $(this);
    //     var name = tab.attr('data-tab');

    //     tab.addClass('active')
    //         .siblings('.item').removeClass('active');
    //     tab.closest('.tabs')
    //         .find('.tabs-content .item[data-tab="'+ name +'"]').addClass('active')
    //                 .siblings('.item').removeClass('active');
    // });


    // catalog item options toggler
    $('.catalog').on('click touch', '.options-toggler', function(){
        var toggler = $(this);
        var options = toggler.closest('.item').find('.options');
        options.toggleClass('active');

        $(document).on('click touch', function (e){ 
            if ( !options.is(e.target) && options.has(e.target).length === 0) {
                options.removeClass('active');
            }
        });

        return false;
    });


    // Slider reviews
    var reviewsSwiper = new Swiper('.reviews-swiper', {
        slidesPerView: 3,
        spaceBetween: 40,
        pagination: {
            el: '.reviews-pagination',
            clickable: true,
        },
        navigation: {
            prevEl: '.reviews-prev',
            nextEl: '.reviews-next',
        },
        breakpoints: {
            320: {
                slidesPerView: 'auto',
                spaceBetween: 20,
            },
            800: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        }
    });


    // Slider catalog
    var catalogPagination = $('.catalog-swiper .catalog-pagination');
    var catalogSwiper = new Swiper('.catalog-swiper', {
        speed: 800,
        slideToClickedSlide: true,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        slidesPerView: 1,
        spaceBetween: 40,
        autoHeight: true,
        loop: false,
        // loopAdditionalSlides: 3,
        threshold: 20,
        // creativeEffect: {
        //     prev: {
        //         opacity: 1,
        //         translate: ['-55vw', 0, 0],
        //     },
        //     next: {
        //         opacity: 1,
        //         translate: ['55vw', 0, 0],
        //     },
        // },
        pagination: {
            type: 'custom',
            el: catalogPagination,
            bulletClass: 'item',
            bulletElement: 'a',
            clickable: true,
            currentClass: 'active',
        },
        hashNavigation: {
            watchState: true,
        },
        navigation: {
            prevEl: '.catalog-prev',
            nextEl: '.catalog-next',
        },
        on: {
            init: function(){
                var thisSlider = this;

                setTimeout(function(){
                    catalogPagination.find('.item').removeClass('active');
                    catalogPagination.find('.item').eq(thisSlider.realIndex).addClass('active').trigger('classChange');
                },500);
            },
            slideChange: function(){
                var thisSlider = this;

                catalogPagination.find('.item').removeClass('active');
                catalogPagination.find('.item').eq(thisSlider.realIndex).addClass('active').trigger('classChange');
            }
        }
    });

    // horizontal scroll to current catalog pagintaion
    catalogPagination.on('classChange', '.item', function(){
        var left_pos = $(this).position().left + $(this).parent().scrollLeft();
        $(this).parent().animate({scrollLeft: left_pos-30 }, 500);  
        $(this).parent().trigger('changed');
    });

    // darked edges on horizontal scroll of catalog pagination 
    catalogPagination.on('scroll changed', function(){
        var scroll_pos = $(this).scrollLeft();

        var last_item = catalogPagination.find('.item:last-child');
        var last_pos = catalogPagination.width() - last_item.position().left - last_item.outerWidth();

        if (scroll_pos <= 5) {
            $(this).closest('.tabs-list-wrp').addClass('scrolled-left-edge');
        } else if( last_pos >= -5 ) {
            $(this).closest('.tabs-list-wrp').addClass('scrolled-right-edge');
        } else {
            $(this).closest('.tabs-list-wrp').removeClass('scrolled-left-edge scrolled-right-edge');   
        }
    });


    // Slider shelters
    var sheltersSwiper = new Swiper('.shelters-swiper', {
        width: 100,
        spaceBetween: 40,
        navigation: {
            prevEl: '.shelters-prev',
            nextEl: '.shelters-next',
        }
    });


    // $.getJSON( "js/promocode.json", function( data ) {
        
    //     $('input.js-promocode').on("keyup focusout", function(){
    //         var user_code = ($(this).val()).toUpperCase();

    //         $.each(data.items, function(i, content) {
    //             if (content.code == user_code) {
    //                 $('.js-codegiver').val(content.name);
    //                 $('.js-codecity').val(content.city);
    //                 $('.js-codepercent').val(content.skidka);
    //                 var origprice = parseInt($('input.skuprice').attr('data-origprice'));
    //                 var newprice = origprice - ((origprice * parseInt(content.skidka)) / 100);
    //                 $('input.skuprice').val(newprice);
    //                 $('.promo-skidka').text('Скидка ' + content.skidka + '%');
    //                 return false;
    //             } else {
    //                 $('input.skuprice').val($('input.skuprice').attr('data-origprice'));
    //                 $('.promo-skidka').text('');
    //                 $('.js-codegiver').val('');
    //                 $('.js-codecity').val('');
    //                 $('.js-codepercent').val('');
    //                 return true;
    //             }
    //         });
    //     });

    // }).fail(function (jqxhr, status, error) { 
    //     console.log('error', status, error) }
    // );

    // $('select').each(function(){
    //     $(this).select2({
    //         minimumResultsForSearch: -1,
    //     });
    // });

    // $('form .colored').on('change', 'input.dostavka-hook', function(){
    //     if ($('form .colored input.dostavka-hook:checked').val() === 'kurier') {
    //         $('form .colored').find('.address-change').attr("name", "kurier[Адрес доставки]");
    //         $('form .colored').find('.address-change').attr('placeholder', 'Адрес доставки *');
    //     } else {
    //         $('form .colored').find('.address-change').attr("name", "pochta[Отделение НП]");
    //         $('form .colored').find('.address-change').attr('placeholder', 'Отделение Новой Почты *');
    //     }
    // });
    // $('#order form').on('change', 'input.payment-hook', function(){
    //     var form = $(this).closest('form');
    //     if (form.find('input.payment-hook:checked').val() === 'nalozh') {
    //         form.find('button').text('Заказать');
    //         form.removeClass('order-form-hook')
    //     } else {
    //         form.find('button').text('Перейти к оплате');
    //         form.addClass('order-form-hook');
    //     }
    // });


    // Cart spinner
    $('.spinner').on('click touch', '.minus', function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });

    $('.spinner').on('click touch', '.plus', function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });

    $('.spinner').on('change', 'input', function(){
        var val = parseInt( $(this).val() );
        if (!$.isNumeric(val) || val < 1) {
            val = 1;
            $(this).val(val);
        };
    });


    // Reviews feed filter
    // open and close filter
    $('.open-filter').on('click touch', function(){
        var filter = $(this).next('.filter');
        filter.toggleClass('active');

        $(document).on('click touch', function (e){ 
            if ( !filter.is(e.target) && filter.has(e.target).length === 0) {
                filter.removeClass('active');
            }
        });

        return false;
    });
    // toggle each filter
    $('.filter').on('click touch', '.item', function(){
        $(this).toggleClass('active').trigger('filtered');
    });
    // filtration process
    $('.filter').on('filtered', '.item', function(){
        // blocks
        var fltr = $(this).closest('.filter');
        var list = fltr.closest('section').find('.filtered-list');
       
        // needed staff
        var arr = [];
        fltr.find('.item.active').each(function(){
            arr.push( $(this).attr('data-filter') );
        });

        // toggle items
        if (arr.length > 0) {
            list.find('.item').hide().removeClass('left right');
            for (var i = 0; i<= arr.length - 1; i++) {
                list.find('.item[data-filter*="'+ arr[i] +'"]').show();
            }
            var f = 0;
            list.find('.item:visible').each(function(){
                if ( f % 2 === 0 ) { 
                    $(this).addClass('left');
                } else { 
                    $(this).addClass('right'); 
                }
                f++;
            });
            
        } else {
            list.find('.item').show().removeClass('left right');
        }
    });

    // Form radio-tabs
    $('.js-radio').on('change', 'input[type="radio"]', function(){
        if( $(this).is(':checked') ) {
            var block = $(this).closest('.js-radio');
            var val = $(this).val();

            block.find('.item[data-tab]').addClass('hide')
                .find('input').removeAttr('data-required');
            block.find('.item[data-tab="' + val + '"]').removeClass('hide')
                .find('input').attr('data-required', 'true');
        }
    });
    // Form order button toggle depends on payment method
    $('[data-payment]').on('change', 'input', function(){
        if( $(this).is(':checked') ) {
            var block = $(this).closest('form');
            var val = $(this).val();

            block.find('button[data-payment]').addClass('hide');
            block.find('button[data-payment="' + val + '"]').removeClass('hide');
        }
    });




    ////////  BASE   ///////

    // smooth scrolling to anchor
    $('a.smooth, nav > ul li a').on('click touch', function(){
        var id = $(this).attr('href');
        var loc_url = window.location.pathname;
        if (id.split('#')[0] == loc_url || id.split('#')[0] == '/') {
            id = '#' + id.split('#')[1];
        };
        var pos = ($(id).offset().top) - $('header').height();
        
        $('html, body').animate({scrollTop: pos }, 1000);
        return false;
    });

    // opening popups
    $('body').on('click touch', '.open-form, .open-form a, .open-modal, .open-modal a', function(){
        var category = $(this).attr('href');
        var categoryForm = $('.dialogs ' + category);
        $('.dialogs .popup').removeClass('active').hide();
        categoryForm.show();
        $('.dialogs').show();
        $('.dialogs').animate({'opacity':1}, 200, function() {
            categoryForm.addClass('active');
        });
        $('body').css({'overflow-y':'hidden'});
        return false;
    });

    // clossing popups
    $('.dialogs').on('click touch', '.close, .close-bg, .js-close', function() {
        $('.dialogs .popup').removeClass('active');
        $('.dialogs').animate({'opacity':0}, 200, function() {
            $('.dialogs').hide();
            $('.dialogs .popup').hide();
            $('.dialogs .thanks-popup').hide();
        });
        $('body').css({'overflow-y':'auto'});
        return false;
    });
    $(document).keyup(function(e) {
      if (e.keyCode === 27) $('.dialogs .popup.active .close').click(); // esc
    });

    $('.inp-phone').mask('+38 (999) 999-99-99');



    // -----  Simple-version (v1) injection  -------- //


    // Аккордеон в Reasons, Faq
    $('.accordion').on('click touch', '.item-title', function(){
        var closest_item = $(this).closest('.item');

        if ($(window).width() <= 768) {
            closest_item.siblings('.item').find('.img').slideUp();
            closest_item.find('.img').slideDown();
        }

        closest_item.siblings('.item').removeClass('active').find('.item-text').slideUp();
        closest_item.addClass('active').find('.item-text').slideDown();
    });

    $('.accordion').on('click touch', '.active .item-title', function(){   
        var closest_item = $(this).closest('.item');

        if ($(window).width() <= 768) {
            closest_item.find('.img').slideUp();
        }

        closest_item.removeClass('active').find('.item-text').slideUp();
    });

    // video controls
    $(window).on('load resize', function(){
        if ($(window).width() <= 640) {
            $('.video-wrp video').attr('controls','controls');
        }
    });
    // Развертывание video в video-about
    $('.video-about').on('click touch', '.play-button', function(){
        $(this).toggleClass('pause');
        var video = $(this).siblings('.rounded-video-container').find('video');
        video[0].muted ^= 1;
        $(this).closest('.rounded-video-wrp').toggleClass('active');
    });


});	



$(window).on('load', function(){

    img_loader();

    setTimeout(function(){
        $('.anim-start').addClass('animated');
    }, 1000);
});