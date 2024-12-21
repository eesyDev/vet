$(function() {

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
    $('body').on('click touch', '.open-dialog, .open-popup, .open-form, .open-modal', function (event) {
        event.preventDefault();

        const category = $(this).attr('href');
        const $dialogs = $('.dialogs');
        const $categoryForm = $dialogs.find(category);
        const $flexPopup = $dialogs.find('.flex-popup');
        const popupClass = category.replace('#', 'popup--');

        if (!$categoryForm.length) {
            console.log(`Попап с ID ${category} не найден.`);
            return false;
        }

        // Обработка открытия окна Политика конфиденциальности
        if ( popupClass === 'popup--policy' ) {
            $categoryForm.show();
            $dialogs.show();
        } else {
            $dialogs.find('.popup').removeClass('active').hide();
            $categoryForm.show();
            $dialogs.show();
        }

        $flexPopup.addClass(popupClass);
        $dialogs.animate({ opacity: 1 }, 300, () => {
            $categoryForm.addClass('active');
            $('body').css({ 'overflow-y': 'hidden' });
        });

        return false;
    });

    // closing popups
    $('.dialogs').on('click touch', '.close, .close-bg', function () {
        const $dialogs = $('.dialogs');
        const $flexPopup = $dialogs.find('.flex-popup');
        const $activePopup = $dialogs.find('.popup.active');
        const popupId = $activePopup.attr('id');

        const bodyScroll = () => {
            $('body').css({ 'overflow-y': 'auto' });
        };

        const removeClassPopup = () => {
            $flexPopup.removeClass(function (index, className) {
                return (className.match(/popup--\S+/g) || []).join(' ');
            });
        };

        if (popupId === 'cart') { // Корзина
            const $popupCart = $flexPopup.find('.popup.active');
            $popupCart.animate({ right: '-100%', opacity: 0 }, 600, function () {
                $dialogs.animate({ opacity: 0 }, 300, function () {
                    $dialogs.find('.popup').removeClass('active').hide();
                    $popupCart.removeAttr('style');
                    $dialogs.hide();
                    $dialogs.find('.thanks-popup').hide();
                    removeClassPopup();
                });
                bodyScroll();
            });

        } else if (popupId === 'policy') { // Политика конфиденциальности
            const $popupPolicy = $dialogs.find('.popup--policy');
            $popupPolicy.hide();
            bodyScroll();

        } else { // Остальные окна
            $dialogs.find('.popup').removeClass('active').hide();
            $dialogs.animate({ opacity: 0 }, 300, function () {
                $dialogs.hide();
                $dialogs.find('.thanks-popup').hide();
                removeClassPopup();
            });
            bodyScroll();
        }
    });

    // closing popups pressing esc
    $(document).on('keyup', function (e) {
        if (e.key === 'Escape' || e.keyCode === 27) {
            $('.dialogs .popup.active .close').trigger('click');
        }
    });

    const DROPDOWN_CLASS = '.dropdown';

    function initDropdownToggle(btnSelectors) {
        const selectors = btnSelectors.join(',');

        $(document).on('click touch', selectors, function (e) {
            const $filter = $(this).next(DROPDOWN_CLASS);
            if ($filter.hasClass('active')) {
                $filter.removeClass('active');
                return;
            }

            $(DROPDOWN_CLASS).removeClass('active');
            $filter.addClass('active');
            e.stopPropagation();
            return false;
        });

        $(document).on('click touch', function (e) {
            if (!$(e.target).closest(DROPDOWN_CLASS).length) {
                $(DROPDOWN_CLASS).removeClass('active');
            }
        });
    }


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

    // Универсальный переключатель с поддержкой любых количеств видов сеток
    function viewGridSwitcher(btnSelector) {
        const $btnSelector = $(btnSelector);
        $btnSelector.on('click', function (e) {
            e.preventDefault();
            const view = $(this).data('view');
            $btnSelector.removeClass('active');
            $(this).addClass('active');
            const $wrapper = $('.view__wrapper');
            $wrapper.removeClass(function (index, className) {
                return (className.match(/view__wrapper--\S+/g) || []).join(' ');
            });
            if (view && view !== 'default') {
                $wrapper.addClass(`view__wrapper--${view}`);
            }
        });
    }

    $(document).on('click touch', '.mini-card__option--link', function (e) {
        e.preventDefault();
        const optionValue = $(this).data('mini-card-option'); // ID товара или опции
        if (!optionValue) return;
        const $card = $(this).closest('.mini-card');
        const $images = $card.find('.mini-card-img');
        $card.find('.mini-card__option--link').removeClass('active');
        $(this).addClass('active');
        $images.removeClass('active').hide();
        $card.find(`.mini-card-img.img-${optionValue}`).addClass('active').fadeIn();
    });

    $(document).on('click touch', '.product-card__option--link', function (e) {
        e.preventDefault();
        const optionValue = $(this).data('product-card-option'); // ID товара или опции
        if (!optionValue) return;
        const newTitle = $(this).data('product-card-title');
        if (!newTitle) return;
        const $optionContainer = $(this).closest('.product-card__option');
        $optionContainer.find('.product-card__option--title').text(newTitle);

        $optionContainer.find('.product-card__option--link').removeClass('active');
        $(this).addClass('active');

        // тут на Ajax получаем нужные данные из Woo
        console.log(optionValue);

    });

    function addStickyBehavior() {
        const $firstItem = $('.product-card__item:first-child');
        const $photoGallery = $('.product-card__photo-gallery');
        const $description = $('.product-card__description');
        const photoGalleryHeight = $photoGallery.outerHeight();
        const descriptionHeight = $description.outerHeight();

        if (descriptionHeight >= photoGalleryHeight) {
            $photoGallery.css('position', 'sticky');
            $firstItem.css('height', `${descriptionHeight}px`);
        }
    }

    function waitAnimation() {
        let scrollTop = $(window).scrollTop();
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
    }

    $(window).on('load', function () {
        addStickyBehavior();
        initDropdownToggle([
            '.dropdown-language',
            '.dropdown-filter',
            '.dropdown-category'
        ]);
        viewGridSwitcher('.catalog-view a');
    });

    $(window).on('load resize', img_loader);
    $(window).on('load scroll', waitAnimation);

    const previewProductCard = new Swiper(".gallery__preview.swiper-container", {
        direction: 'vertical',
        slidesPerView: 'auto',
        spaceBetween: 8,
    });

    const mainProductCard = new Swiper(".gallery__photo.swiper-container", {
        spaceBetween: 0,
        thumbs: {
            swiper: previewProductCard,
        }
    });

    const sliderOffersCard = new Swiper(".offers-card__slider.swiper-container", {
        slidesPerView: 'auto',
        direction: 'horizontal',
        width: 960,
        centeredSlides: true,
        spaceBetween: 6,
        navigation: {
            nextEl: ".offers-card__navigation--next",
            prevEl: ".offers-card__navigation--prev",
        },
    });

    // Купить продукт
    function addToCart(btnSelector) {
        const $btnSelector = $(btnSelector);
        $btnSelector.on('click touch', function () {
            const $button = $(this);
            const $productImage = $('.gallery__photo .swiper-wrapper .swiper-slide:first-child img').first();

            if ($productImage.length === 0) {
                console.log('Изображение не найдено.');
                return;
            }

            const $cartIcon = $('.header__cart .ico-cart');
            const $cartCount = $('.header__cart .header__cart--count .count');

            let currentCount = parseInt($cartCount.text());
            let newCount = currentCount +1;

            const $flyImage = $productImage.clone().addClass('fly-image').appendTo('body');

            const buttonOffset = $button.offset();
            const buttonCenterX = buttonOffset.left + $button.outerWidth() / 2;
            const buttonCenterY = buttonOffset.top + $button.outerHeight() / 2 - ($button.outerHeight() * 3);

            const cartOffset = $cartIcon.offset();
            const cartCenterX = cartOffset.left + $cartIcon.width() / 2;
            const cartCenterY = cartOffset.top + $cartIcon.height() / 2;

            $flyImage.css({
                top: buttonCenterY - $productImage.height() / 2,
                left: buttonCenterX - $productImage.width() / 2,
                width: $productImage.width(),
                height: $productImage.height(),
                position: 'absolute',
                zIndex: 1000,
                pointerEvents: 'none'
            });

            const scale = $cartIcon.width() / $productImage.width();

            $flyImage.css({
                transition: 'transform 1000ms ease-in-out, opacity 1000ms ease-in-out',
                transformOrigin: 'center center',
                transform: `translate(${cartCenterX - buttonCenterX}px, ${cartCenterY - buttonCenterY}px) scale(${scale})`,
                opacity: .3
            });

            if (newCount <= 99) $cartCount.text(newCount);

            setTimeout(() => {
                $flyImage.remove();
            }, 1000);

            // это для примера, потом будем получать нужные данные из Woo
            const $product = $('.popup-cart__products form:first-child .popup-cart__product').first();
            $product.clone().prependTo('.popup-cart__products form');

        });
    }

    addToCart('.product-card__buttons .add_to_cart');

});