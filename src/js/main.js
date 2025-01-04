(function ($) {

    let isScrollTopBody = true;

    // lazyload for images
    function img_loader() {
        setTimeout(function(){
            $('body').find('img[data-src]').each(function(){
                let src = $(this).attr('data-src');
                let srcset = $(this).attr('data-srcset');
                let classes = $(this).attr('class');
                let alt = $(this).attr('alt');
                let title = $(this).attr('title');
                if (src) {
                    let img = new Image();
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
        let viewportHeight = $(window).height();

        let elementTop = $(this).offset().top;
        let elementBottom = elementTop + $(this).height();


        let viewportTop = $(window).scrollTop();
        let viewportBottom = viewportTop + viewportHeight;
        //let viewportCenter = viewportTop + (viewportHeight/2);

        let top_to_top_percent = (elementTop - viewportTop) / viewportHeight * 100;
        let bottom_to_top_percent = (elementBottom - viewportTop) / viewportHeight * 100;

        let top_to_bottom_percent = (viewportBottom - elementTop) / viewportHeight * 100;
        let bottom_to_bottom_percent = (viewportBottom - elementBottom) / viewportHeight * 100;

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
        let p = $(this).percentOfViewport();

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

    /**
     * @typedef {import('node_modules/swiper').Swiper} Swiper
     */
    const previewProductCard = new Swiper(".gallery > .gallery__preview.swiper-container", {
        direction: 'vertical',
        slidesPerView: 'auto',
        spaceBetween: 8,
    });

    const mainProductCard = new Swiper(".gallery > .gallery__media.swiper-container", {
        spaceBetween: 0,
        thumbs: {
            swiper: previewProductCard,
        }
    });

    const offersCardSlider = new Swiper(".offers-card__slider.swiper-container", {
        slidesPerView: 'auto',
        direction: 'horizontal',
        slidesOffsetBefore: 240, // смещение слева в px
        slidesOffsetAfter: 240, // смещение справа в px
        spaceBetween: 6,
        navigation: {
            nextEl: ".offers-card__navigation .slider-nav__next",
            prevEl: ".offers-card__navigation .slider-nav__prev",
        },
    });

    const benefitsCardSlider = new Swiper(".benefits-card__slider.swiper-container", {
        slidesPerView: 'auto',
        direction: 'horizontal',
        slidesOffsetBefore: 240, // смещение слева в px
        slidesOffsetAfter: 240, // смещение справа в px
        spaceBetween: 40,
        navigation: {
            nextEl: ".benefits-card__navigation .slider-nav__next",
            prevEl: ".benefits-card__navigation .slider-nav__prev",
        },
    });

    const reviewsSlider = new Swiper('.reviews > .swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: '.reviews > .swiper-pagination-clickable',
            clickable: true,
        }
    });

    function popupGallery(product) {

        const previewPopUpGallery = new Swiper(`.popup-gallery[data-gallery="product-${product}"] > .popup-gallery__preview`, {
            direction: 'vertical',
            slidesPerView: 'auto',
            spaceBetween: 8,
        });

        const mainPopUpGallery = new Swiper(`.popup-gallery[data-gallery="product-${product}"] > .popup-gallery__media`, {
            spaceBetween: 0,
            thumbs: {
                swiper: previewPopUpGallery,
            }
        });
    }

    const prodSlider = new Swiper('.product-slider', {
        slidesPerView: 'auto',
        spaceBetween: 120, // По макету, но напрашивается 60px 🤷‍♂️
        threshold: 20,
        speed: 800,
        initialSlide: 3, // по умолчанию Grace Max
        loop: false,
        observer: true,
        autoHeight: false,
        observeParents: true,
        slideToClickedSlide: true,
        observeSlideChildren: true,
        centeredSlides: true,
        hashNavigation: {
            replaceState: true,
            watchState: true,
        },
        on: {

            init: function () {
                isScrollTopBody = false;
            },

            slideChange: function () {
                const $menu = $('.slider-menu .models-menu');
                const $item = $menu.find('a');
                $item.removeClass('active');
                $item.eq(this.realIndex).addClass('active').trigger('classChange');

                if (!isScrollTopBody) {
                    scrollTopBody($menu);
                }
            }
        }
    });

    // opening popups
    $('body').on('click touch', '.open-dialog, .open-popup, .open-form, .open-modal', function (event) {
        event.preventDefault();

        const category = $(this).attr('href');
        const $dialogs = $('.dialogs');
        const $categoryDialogs = $dialogs.find(category);
        const $flexPopup = $dialogs.find('.flex-popup');
        const popupCategory = category.slice(1);

        if (popupCategory !== 'policy') {
            localStorage.setItem('popup', popupCategory);
        }

        if (popupCategory === 'list') {
            $('body').css({ 'overflow-y': 'hidden' });
            $dialogs.css({ 'overflow-y': 'hidden' });
        }

        if ( popupCategory === 'work-offer' || popupCategory === 'details' ) {
            $('body').css({ 'overflow-y': 'hidden' });
            $dialogs.css({ 'overflow-y': 'auto' });
        }

        $dialogs.find('.popup').removeClass('active').hide();

        if (!$categoryDialogs.length) {
            console.log(`Попап с ID ${category} не найден.`);
            return false;
        }

        $dialogs.find('.popup').removeClass('active').hide();
        $categoryDialogs.show();
        $dialogs.show();

        $flexPopup.addClass('popup--' + popupCategory);
        $dialogs.animate({ opacity: 1 }, 300, () => {
            $categoryDialogs.addClass('active');
            $('body').css({ 'overflow-y': 'hidden' });
        });

        if (popupCategory === 'gallery') {
            const product = $(this).attr('data-product');
            $flexPopup.find(`.popup__content .popup-gallery`).hide();
            const $productGallery = $flexPopup.find(`.popup__content .popup-gallery[data-gallery="product-${product}"]`);
            $productGallery.show();
            popupGallery(product);
        }

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

        const $popupActive = $flexPopup.find('.popup.active');

        if (popupId === 'cart') { // Корзина
            $popupActive.animate({ right: '-100%', opacity: 0 }, 600, function () {
                $dialogs.animate({ opacity: 0 }, 300, function () {
                    $dialogs.find('.popup').removeClass('active').hide();
                    $popupActive.removeAttr('style');
                    $dialogs.hide();
                    $dialogs.find('.thanks-popup').hide();
                    removeClassPopup();
                });
                bodyScroll();
            });

        } else if (popupId === 'policy') { // Политика конфиденциальности

            $popupActive.removeClass('active').hide();

            let popupCategory = localStorage.getItem('popup');

            // Открываем popup с соответствующим ID
            const $popupToOpen = $('.dialogs #' + popupCategory);
            if ($popupToOpen.length) {
                $popupToOpen.addClass('active').show();
                $dialogs.show();
            } else {
                console.log('Попап с ID ' + popupCategory + ' не найден.');
            }

        } else if (popupId === 'details') { // Детали преимуществ

            $popupActive.animate({ top: '100%', opacity: 0 }, 600, function () {
                $dialogs.animate({ opacity: 0 }, 400, function () {
                    $dialogs.find('.popup').removeClass('active').hide();
                    $popupActive.removeAttr('style');
                    $dialogs.hide();
                    removeClassPopup();
                });
                bodyScroll();
            });

        } else if (popupId === 'list') { // Список приютов

            $popupActive.animate({ bottom: '-100%', opacity: 0 }, 600, function () {
                $dialogs.animate({ opacity: 0 }, 300, function () {
                    $dialogs.find('.popup').removeClass('active').hide();
                    $popupActive.removeAttr('style');
                    $dialogs.hide();
                    removeClassPopup();
                });
                bodyScroll();
            });

        } else { // Остальные окна

            $popupActive.removeClass('active').hide();
            $dialogs.animate({ opacity: 0 }, 300, function () {
                $dialogs.hide();
                $dialogs.find('.thanks-popup').hide();
                removeClassPopup();
                bodyScroll();
            });
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
        const $list = $('.filtered-list');

        const activeFilters = $filter.find(DROPDOWN_CLASS + '__item.active').map(function () {
            return $(this).data('filter');
        }).get();

        const $items = $list.find('.reviews__item');
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
        initDropdownToggle([
            '.dropdown-language',
            '.dropdown-filter',
            '.dropdown-category'
        ]);
        viewGridSwitcher('.catalog-view a');
    });

    $(window).on('load resize', img_loader);
    $(window).on('load scroll', waitAnimation);

    // Купить продукт
    function addToCart(btnSelector) {
        const $btnSelector = $(btnSelector);
        $btnSelector.on('click touch', function () {
            const $button = $(this);
            const upSell  = $button.data('up-sell');  // post_ID
            const product = $button.data('product'); // post_ID

            const $productImage = $(`.popup-gallery[data-gallery="product-${product}"] .popup-gallery__media .swiper-wrapper .swiper-slide img`).first();

            if ($productImage.length === 0) {
                console.log(`Изображение для продукта ${product} не найдено.`);
            }

            const $cartHeader = $('.header__cart');
            const $cartIcon = $cartHeader.find('.ico-cart');
            const $cartCount = $cartHeader.find('.header__cart--count');
            const $cartCountText = $cartCount.find('.count');

            let currentCount = parseInt($cartCountText.text());
            let newCount = currentCount + 1;

            if (!upSell) {
                // Используем естественные размеры изображения
                const imageWidth = $productImage.prop('naturalWidth');
                const imageHeight = $productImage.prop('naturalHeight');

                const $flyImage = $productImage.clone().addClass('fly-image').appendTo('body');

                const buttonOffset = $button.offset();
                const buttonCenterX = buttonOffset.left + $button.outerWidth() / 2;
                const buttonCenterY = buttonOffset.top + $button.outerHeight() / 2 - ($button.outerHeight() * 3);

                const cartOffset = $cartIcon.offset();
                const cartCenterX = cartOffset.left + $cartIcon.width() / 2;
                const cartCenterY = cartOffset.top + $cartIcon.height() / 2;

                $flyImage.css({
                    top: buttonCenterY - imageHeight / 2,
                    left: buttonCenterX - imageWidth / 2,
                    width: imageWidth,
                    height: imageHeight,
                    position: 'absolute',
                    zIndex: 1000,
                    pointerEvents: 'none'
                });

                const scale = $cartIcon.width() / imageWidth;

                $flyImage.css({
                    transition: 'transform 1000ms ease-in-out, opacity 1000ms ease-in-out',
                    transformOrigin: 'center center',
                    transform: `translate(${cartCenterX - buttonCenterX}px, ${cartCenterY - buttonCenterY}px) scale(${scale})`,
                    opacity: 0.3
                });

                // Получаем данные для указанного ID продукта из Woo
                const data = {
                    1: {
                        id: product,
                        img: 'assets/img/catalog/grace-pro-black-2x.png',
                        title: 'Кiгтеточка-лежанка Grace Pro Max',
                        price: '₴ 1590',
                        tag_text: 'Для притулку',
                        tag_class: 'gift',
                    },
                    2: {
                        id: product,
                        img: 'assets/img/catalog/3in1-2x.png',
                        title: 'Cloud',
                        price: '₴ 2590',
                        tag_text: 'Новинка',
                        tag_class: 'new',
                    }
                };

                if (!data[product]) {
                    console.log(`Товар с ID ${product} не найден.`);
                    return;
                }
                const item = data[product];

                const productHtml = `
                    <div class="popup-cart__product">
                        <div class="popup-cart__item ">
                            <div class="popup-cart__item--photo">
                                <a href="/catalog.html" class="tag tag--${item.tag_class}">${item.tag_text}</a>
                                <img src="${item.img}" alt="${item.title}">
                            </div>
                        </div>
                        <div class="popup-cart__item">
                            <div class="popup-cart__title">
                                <h4 class="body-s-reg">${item.title}</h4>
                            </div>
                            <div class="popup-cart__details">
                                <div class="popup-cart__calc">
                                    <button class="minus"></button>
                                    <input type="text" id="quantity_${item.id}" name="quantity[]" name="cart[хешWoo][qty]" class="quantity body-s-sb" value="1" />
                                    <button class="plus"></button>
                                </div>
                                <div class="popup-cart__price">
                                    <p class="body-s-sb">${item.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                const $product = $('.popup-cart__products form');

                $product.prepend(productHtml);

                responsiveCart($product);

                const $productFirst = $product.find('.popup-cart__product').first();
                $productFirst.find('.popup-cart__calc .quantity').val(1);
                initQuantityInput($productFirst);

                if (newCount <= 99) $cartCountText.text(newCount);

                setTimeout(() => {
                    $flyImage.remove();
                    $cartCount.show();

                    // тут записываем в куки, что корзина не пуста для дальнейшей реализации на PHP
                }, 1000);

            } else {
                if (newCount <= 99) $cartCountText.text(newCount);
                addToCartUpSell(upSell);
            }
        });
    }

    addToCart('.product-card__buttons .add_to_cart');

    function addToCartUpSell(post_id) {
        const $product = $('.popup-cart__products form');

        const $bannerCart = $('.banner-cart');
        $bannerCart.find('.banner-cart__up-sell').last().show();
        $bannerCart.find(`#up-sell-${post_id}.banner-cart__up-sell`).hide();

        // Получаем данные для указанного ID продукта из Woo
        const data = {
            1: {
                id: 1,
                img: 'assets/img/content/popup-cart-banner-2x.jpg',
                title: 'Мышка-игрушка Mr. Pickles',
                discount: '-30%',
                price: '₴ 90',
                price_discount: '₴ 125',
            },
            2: {
                id: 2,
                img: 'assets/img/content/main-card-about-2x.jpg',
                title: 'Домик для кота Mr. Whiskers',
                discount: '-20%',
                price: '₴ 150',
                price_discount: '₴ 200',
            }
        };

        if (!data[post_id]) {
            console.log(`Товар с ID ${post_id} не найден.`);
            return;
        }

        const item = data[post_id];

        // Шаблон товара со скидкой
        const upSellHtml = `
            <div class="popup-cart__product popup-cart__up-sell">
                <div class="popup-cart__item">
                    <div class="popup-cart__item--photo">
                        <img src="${item.img}" alt="${item.title}">
                    </div>
                </div>
                <div class="popup-cart__item">
                    <div class="popup-cart__title">
                        <h4 class="body-s-reg">${item.title}</h4>
                    </div>
                    <div class="popup-cart__details">
                        <div class="popup-cart__calc">
                            <span class="tag tag--discount">${item.discount}</span>
                        </div>
                        <div class="popup-cart__price">
                            <s class="banner-cart__discount">${item.price_discount}</s>
                            <p class="body-s-sb">${item.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const $productFind = $product.find('.popup-cart__product');

        if ($productFind.length === 0) {
            $product.prepend(upSellHtml);
        } else {
            const $productLast = $productFind.last();
            $productLast.after(upSellHtml);
        }

        responsiveCart($product);
    }

    addToCart('.banner-cart__up-sell .add_to_cart');

    function initQuantityInput($container) {
        $container.find('.popup-cart__calc').each(function() {
            const $calc = $(this);

            $calc.on('click touch', '.minus', function() {
                const $input = $(this).siblings('.quantity');
                let currentValue = parseInt($input.val(), 10);

                if (currentValue > 1) {
                    $input.val(currentValue - 1);
                }
            });

            $calc.on('click touch', '.plus', function() {
                const $input = $(this).siblings('.quantity');
                let currentValue = parseInt($input.val(), 10);
                $input.val(currentValue + 1);
            });

            $calc.on('input', '.quantity', function() {
                let currentValue = $(this).val();
                if (!/^\d+$/.test(currentValue) || parseInt(currentValue, 10) < 1) {
                    $(this).val(1);
                }
            });
        });
    }

    function responsiveCart($product) {
        if ($product.find('.popup-cart__product').length > 3) {
            $('.popup-cart').css('margin-bottom', '155px');
            $('.banner-cart').css('margin', '20px 0');
            $product.find('.popup-cart__totals.responsive').addClass('popup-cart__responsive');
            $product.find('.banner-cart__up-sell.responsive').addClass('banner-cart__responsive');
        }
    }

    function playVideoThank(videoContainer, button, text = null, fixContainer = null) {
        const $videoContainer = $(videoContainer);
        const $fixContainer = $(fixContainer);
        const $video = $videoContainer.find('video');
        const $button = $videoContainer.find(button);
        const $text = $videoContainer.find(text);

        $video.on('pause', function () {
            $button.show();
            $button.css('opacity', '1');
            $fixContainer.css('position', 'relative');
            $video.removeAttr('style');
        });

        $button.on('click', function (e) {
            if ($video[0].paused) {
                $video[0].play();
                $button.css('opacity', '.5');
                $text.hide();
                $fixContainer.css('position', 'static');
                $video.css({
                    'position' : 'absolute',
                    'top' : 0,
                    'left' : 0,
                });

            } else {
                $video[0].pause();
                $button.css('opacity', '1');
                $text.show();
                $fixContainer.css('position', 'relative');
                $video.removeAttr('style');
            }
        });

        $video.on('click', function () {
            if (this.played) {
                this.pause();
                $button.css('opacity', '1');
                $text.show();
                $fixContainer.css('position', 'relative');
                $video.removeAttr('style');
            }
        });

        function playMouse($html, event, value) {
            $html.on(event, function () {
                $button.css('opacity', value);
            });
        }
        playMouse($button, 'mouseenter', '1');
        playMouse($videoContainer, 'mouseleave', '1');
        playMouse($button, 'mouseleave', '.5');

        $(document).on('keyup', function (e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                if ($video[0].played) {
                    $video[0].pause();
                    $button.show();
                    $text.show();
                    $button.css('opacity', '1');
                    $fixContainer.css('position', 'relative');
                    $video.removeAttr('style');
                }
            }
        });
    }

    // Ми шукамо
    function initializeAccordion(button, content, item) {
        $(button).on('click', function(e) {
            e.preventDefault();

            const $accordionItem = $(this).closest(item);
            const $visible = $accordionItem.find(content);

            if (!$accordionItem.hasClass('active')) {
                $accordionItem.siblings().removeClass('active').find(content).slideUp();
                $accordionItem.addClass('active');
                $visible.stop(true, true).slideDown();
            } else {
                $accordionItem.removeClass('active');
                $visible.stop(true, true).slideUp();
            }
        });
    }

    // Адаптивное меню с прокруткой
    function modelsMenu(menu, item) {
        const $menu = $(menu);
        const $items = $menu.find(item);

        function centerActiveItem($item) {
            const menuWidth = $menu.outerWidth();
            const menuScrollLeft = $menu.scrollLeft();
            const itemOffsetLeft = $item.offset().left;
            const menuOffsetLeft = $menu.offset().left;
            const itemLeft = itemOffsetLeft - menuOffsetLeft;
            const itemWidth = $item.outerWidth();
            const scrollTo = menuScrollLeft + itemLeft - (menuWidth / 2) + (itemWidth / 2);
            $menu.animate({ scrollLeft: scrollTo }, 300);
        }

        $items.on('click touch', function () {
            const $clickedItem = $(this);
            $items.removeClass('active');
            $clickedItem.addClass('active');
            centerActiveItem($clickedItem);
        });

        // Установить начальный активный элемент, если он есть, в центр
        const $initialActive = $menu.find(item + '.active');
        if ($initialActive.length) {
            centerActiveItem($initialActive);
        }
    }

    function playVideo(videoContainer) {
        const $videoContainer = $(videoContainer);
        const $video = $videoContainer.find('video');
        const $button = $videoContainer.find('.video-block__button--mp4');
        const $useIco = $button.find('.ico-video-button > use');

        $button.on('click', function () {
            // Ставим все остальные видео на паузу
            $('.video-block__source video').each(function () {
                if (this !== $video[0]) {
                    this.pause();
                    $(this).closest('.video-block__source')
                        .find('.ico-video-button > use')
                        .attr('href', 'assets/img/sprite.svg#ico-play');
                }
            });

            if ($video[0].paused) {
                $video[0].play();
                if ( $video.hasClass('cover') ) {
                    $video.css('object-fit', 'cover');
                }
                $useIco.attr('href', 'assets/img/sprite.svg#ico-pause');
            } else {
                $video[0].pause();
                $useIco.attr('href', 'assets/img/sprite.svg#ico-play');
            }
        });
    }

    function scrollTopBody($element) {
        $('html, body').animate({
            scrollTop: $element.offset().top - 54 // 48px header + 6px отступ до нужного элемента
        }, 600);
    }

    $(function() {

        $('.video-block__source').each(function () {
            playVideo(this);
        });

        modelsMenu('.models-menu', '.models-menu__item');
        playVideoThank('.thank-page__video', '.thank-page__button', '.thank-page__play--text', '.thank-page__item');
        initializeAccordion('.accordion-open', '.accordion__content', '.accordion__item');
    });

})(jQuery);