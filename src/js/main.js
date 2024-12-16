// lazyload for images
function img_loader() {
    setTimeout(function(){
        $('body').find('img[data-src]').each(function(){
            var src = $(this).attr('data-src');
            var srcset = $(this).attr('data-srcset');
            var classes = $(this).attr('class');
            var alt = $(this).attr('alt');
            var title = $(this).attr('title');
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
              $(img).attr('title', title);
              $(img).addClass(classes);
              $(this).replaceWith(img);
            }
        });
    }, 150);
}


// calc block position in viewport
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
        viewportHeight: viewportHeight
    };
};


// check is block is in viewport
$.fn.isInViewport = function() {
    var p = $(this).percentOfViewport();

    return  p.ELtop_to_VPtop < 100 && 
            p.ELbottom_to_VPtop > 0;
};

$(function() {

    // sandwich menu toggle
    $('.sandwich').on('click touch', function () {
        $(this).toggleClass('active');
        $('.header__navigation').slideToggle();

        let navigationWrapper = $(".header__wrapper--navigation");
        if (navigationWrapper.css("padding-bottom") === "40px") {
            navigationWrapper.removeAttr("style");
        } else {
            navigationWrapper.css({
                "padding-bottom": "40px",
            });
        }

    });

    $('.inp-phone').mask('+38 (999) 999-99-99');

    // smooth scrolling to anchor
    $('a.smooth, nav > ul li a').on('click touch', function(){
        var id = $(this).attr('href');
        var loc_url = window.location.pathname;
        var pos = ($(id).offset().top) - $('header').outerHeight() - 49;
        $('html, body').animate({scrollTop: pos }, 1000);
        return false;
    });

    // video play on click
    $('.container').on('click touch', '.js-play-video', function(){
        var video = $(this).siblings('video')[0];
        video.play();
        video.controls="controls";
        $(this).hide();
    });

    // opening popups
    $('body').on('click touch', '.open-dialog, .open-popup, .open-form, .open-modal, .open-dialog a, .open-popup a, .open-form a, .open-modal a', function(){
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

    // closing popups
    $('.dialogs').on('click touch', '.close, .close-bg', function() {
        $('.dialogs .popup').removeClass('active');
        $('.dialogs').animate({'opacity':0}, 200, function() {
            $('.dialogs').hide();
            $('.dialogs .popup').hide();
            $('.dialogs .thanks-popup').hide();
        });
        $('body').css({'overflow-y':'auto'});
    });
    $(document).keyup(function(e) {
      if (e.keyCode === 27) $('.dialogs .popup.active .close').click(); // esc
    });

    const DROPDOWN_CLASS = '.dropdown';

    function initDropdownToggle(btnSelectors) {
        const selectors = btnSelectors.join(',');
        $(document).on('click touch', selectors, function (e) {
            e.stopPropagation();
            const $filter = $(this).next(DROPDOWN_CLASS);
            if ($filter.hasClass('active')) {
                $filter.removeClass('active');
                return;
            }
            $(DROPDOWN_CLASS).removeClass('active');
            $filter.addClass('active');
        });

        $(document).on('click touch', function (e) {
            if (!$(e.target).closest(DROPDOWN_CLASS).length) {
                $(DROPDOWN_CLASS).removeClass('active');
            }
        });
    }

    initDropdownToggle([
        '.dropdown-language',
        '.dropdown-filter',
        '.dropdown-category'
    ]);


    $(DROPDOWN_CLASS).on('click touch', DROPDOWN_CLASS + '__item', function (e) {
        $(this).toggleClass('active').trigger('filtered');
        e.stopPropagation();
    });

    $(DROPDOWN_CLASS).on('filtered', DROPDOWN_CLASS + '__item', function () {
        const $filter = $(this).closest(DROPDOWN_CLASS);
        const $list = $filter.closest('section').find('.filtered-list');

        const activeFilters = $filter.find(DROPDOWN_CLASS + '__item.active').map(function () {
            return $(this).data('filter');
        }).get();

        const $items = $list.find(DROPDOWN_CLASS + '__item');
        $items.hide().removeClass('left right');

        if (activeFilters.length > 0) {
            let index = 0;
            activeFilters.forEach(filter => {
                $items.filter(`[data-filter*="${filter}"]`).each(function () {
                    $(this).show().addClass(index % 2 === 0 ? 'left' : 'right');
                    index++;
                });
            });
        } else {
            $items.show();
        }
    });

    // all sliders
    // const swiper = new Swiper('.swiper', {
    //     slidesPerView: 'auto',
    //     speed: 400,
    //     spaceBetween: 20,
    //     navigation: {
    //         nextEl: '.slider-next',
    //         prevEl: '.slider-prev',
    //     },
    //     pagination: {
    //         el: '.slider-pagination',
    //         type: 'bullets',
    //     },
    // });

});


$(window).on('load scroll', function(){
    var scrollTop = $(window).scrollTop();


    // start animations when it is in viewport but pause when out of it
    // .out-of-viewport doing nothing if animation item can be runned only once
    $('.js-wait-animation').each(function(){
        if ( $(this).isInViewport() ) {
            $(this).addClass('animate')
                        .removeClass('out-of-viewport');
        } else {
            $(this).addClass('out-of-viewport');
        }
    });
});


$(window).on('load', function(){

    img_loader();
    
});