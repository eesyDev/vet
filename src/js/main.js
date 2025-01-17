(function ($) {
    window.App = window.App || {};

    App.isScrollTopBody  = true;
    App.winLocHash       = window.location.hash;
    App.$body            = $('body');
    App.$htmlBody        = $('html, body');
    App.$modelsMenu      = $('.slider-menu .models-menu');
    App.$productsMobile  = $('.products-mobile');

    /**
     * Animate scroll top to element
     *
     * @param {Object|string} $element jQuery object or selector string.
     * @param {Number} [indent=54] indent to the desired element in px.
     * @param {Number} [duration=600] animation time in milliseconds.
     *
     * @example
     * // Using a jQuery object
     * App.scrollTopBody($('.element'));
     *
     * @example
     * // Using a selector string
     * App.scrollTopBody('.element');
     *
     * @example
     * // Using a custom indent and duration
     * App.scrollTopBody('.element', 80, 1000);
     */
    App.scrollTopBody = function($element, indent = 54, duration = 600) {
        if (typeof $element === 'string') {
            $element = $($element);
        }

        if ($element.length) {
            App.$htmlBody.animate({
                scrollTop: $element.offset().top - indent
            }, duration);
        }
    };

    /**
     * Инициализирует функциональность загрузки файла с возможностью выбора файла по клику на указанный элемент.
     * Если длина имени выбранного файла превышает maxLength, сохраняются начало и конец строки, а середина заменяется на '...'.
     *
     * @param {string} triggerSelector - Селектор элемента, клик по которому вызывает выбор файла.
     * @param {string} inputSelector - Селектор скрытого <input type="file">.
     * @param {string} textSelector - Селектор элемента, в который будет выводиться название выбранного файла.
     * @param {number} [maxLength=20] - Максимальная длина текста для отображения имени файла. По умолчанию 20 символов.
     */
    App.initFileUpload = function(triggerSelector, inputSelector, textSelector, maxLength = 20) {
        $(triggerSelector).on('click', function () {
            $(inputSelector).trigger('click');
        });

        $(inputSelector).on('change', function () {
            let fileName = this.files[0]?.name || 'Файл не обрано';

            if (fileName.length > maxLength) {
                const extIndex = fileName.lastIndexOf('.');
                const extension = extIndex !== -1 ? fileName.slice(extIndex) : ''; // Расширение файла
                const visibleLength = maxLength - extension.length - 3; // Учёт места под '...'

                if (visibleLength > 0) {
                    const start = fileName.slice(0, Math.ceil(visibleLength / 2)); // Начало имени
                    const end = fileName.slice(-Math.floor(visibleLength / 2)); // Конец имени
                    fileName = `${start}...${end}${extension}`;
                }
            }

            $(textSelector).text(fileName);
        });
    }

    // lazy load for images
    App.lazyLoadImages = function () {
        $('img[data-src]').each(function () {
            let $img = $(this);
            if ($img.isInViewportImg() && !$img.data('loaded')) {
                let src = $img.attr('data-src');
                let srcset = $img.attr('data-srcset');

                if (src) $img.attr('src', src);
                if (srcset) $img.attr('srcset', srcset);
                $img.data('loaded', true);
                $img.hide().fadeIn(400);
            }
        });
    }

    App.isMobileDevice = function(url) {
        return /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
    }

    $.fn.isInViewportImg = function () {
        let elementTop = $(this).offset().top;
        let elementBottom = elementTop + $(this).outerHeight();
        let viewportTop = $(window).scrollTop();
        let viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    $(window).on('load scroll resize', App.lazyLoadImages);

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
        },
        pagination: {
            el: '.product-card__wrapper > .flex > .swiper-pagination-clickable',
            clickable: true,
        }
    });

    const offersCardSlider = new Swiper(".offers-card__slider.swiper-container", {
        slidesPerView: 'auto',
        direction: 'horizontal',
        spaceBetween: 6,
        navigation: {
            nextEl: ".offers-card__navigation .slider-nav__next",
            prevEl: ".offers-card__navigation .slider-nav__prev",
        },
        breakpoints: {
            320: {
                slidesOffsetBefore: 20,
                slidesOffsetAfter: 20,
            },
            480: {
                slidesOffsetBefore: 20,
                slidesOffsetAfter: 20,
            },
            640: {
                slidesOffsetBefore: 240,
                slidesOffsetAfter: 240,
            }
        }
    });

    const benefitsCardSlider = new Swiper(".benefits-card__slider.swiper-container", {
        slidesPerView: 'auto',
        direction: 'horizontal',
        spaceBetween: 40,
        navigation: {
            nextEl: ".benefits-card__navigation .slider-nav__next",
            prevEl: ".benefits-card__navigation .slider-nav__prev",
        },
        breakpoints: {
            320: {
                spaceBetween: 20,
                slidesOffsetBefore: 20,
                slidesOffsetAfter: 20,
            },
            480: {
                spaceBetween: 20,
                slidesOffsetBefore: 20,
                slidesOffsetAfter: 20,
            },
            640: {
                spaceBetween: 40,
                slidesOffsetBefore: 240, // смещение слева в px
                slidesOffsetAfter: 240, // смещение справа в px
            }
        }
    });

    const reviewsSlider = new Swiper('.reviews > .swiper-container', {
        pagination: {
            el: '.reviews > .swiper-pagination-clickable',
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 'auto',
                spaceBetween: 20,
                slidesOffsetBefore: 20,
                slidesOffsetAfter: 20,
            },
            480: {
                slidesPerView: 'auto',
                spaceBetween: 20,
                slidesOffsetBefore: 20,
                slidesOffsetAfter: 20,
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });

    const articleRelatedSlider = new Swiper('.article-related .swiper-container', {
        autoHeight: false,
        autoplay: {
            delay: 2000,
        },
        breakpoints: {
            320: {
                slidesPerView: 'auto',
                spaceBetween: 20,
                slidesOffsetBefore: 20,
                slidesOffsetAfter: 20,
            },
            480: {
                slidesPerView: 'auto',
                spaceBetween: 20,
                slidesOffsetBefore: 20,
                slidesOffsetAfter: 20,
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });

    function productsSlider(swiperContainer) {
        const swiper = document.querySelectorAll(swiperContainer);
        swiper.forEach((container) => {
            new Swiper(container, {
                slidesPerView: 'auto',
                autoHeight: container.dataset.autoHeight === "true" || false, // default false
                spaceBetween: 20,
                centeredSlides: true,
                slideToClickedSlide: true,
                pagination: {
                    el: container.nextElementSibling,
                    clickable: true,
                },
            });
        });
    }

    function popupGallery(product) {

        const previewPopUpGallery = new Swiper(`.popup-gallery[data-gallery="product-${product}"] > .popup-gallery__preview`, {
            slidesPerView: 'auto',
            spaceBetween: 8,
            threshold: 8,
            breakpoints: {
                320: {
                    direction: 'horizontal',
                    slidesOffsetBefore: 20,
                    slidesOffsetAfter: 20,
                },
                480: {
                    direction: 'horizontal',
                    slidesOffsetBefore: 20,
                    slidesOffsetAfter: 20,
                },
                640: {
                    direction: 'vertical',
                }
            }
        });

        const mainPopUpGallery = new Swiper(`.popup-gallery[data-gallery="product-${product}"] > .popup-gallery__media`, {
            spaceBetween: 0,
            thumbs: {
                swiper: previewPopUpGallery,
            }
        });
    }

    const PRODUCT_CLASS_SLIDER = '.product-slider';
    const $productSlider = $(PRODUCT_CLASS_SLIDER);

    if ($productSlider.length > 0) {

        const prodSlider = new Swiper(PRODUCT_CLASS_SLIDER, {
            slidesPerView: 'auto',
            spaceBetween: 120,
            threshold: 20,
            speed: 800,
            initialSlide: (parseInt($productSlider.data('initial-slide')) || 1) - 1, // активный слайд
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
                    App.isScrollTopBody = false;
                },

                slideChange: function () {
                    const $item = App.$modelsMenu.find('a');
                    $item.removeClass('active');
                    $item.eq(this.realIndex).addClass('active').trigger('classChange');

                    if (!App.isScrollTopBody) {
                        App.scrollTopBody(App.$modelsMenu);
                    }
                }
            }
        });
    }

    // opening popups
    App.$body.on('click touch', '.open-dialog, .open-popup, .open-form, .open-modal', function (event) {
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
            App.$body.css({ 'overflow-y': 'hidden' });
            $dialogs.css({ 'overflow-y': 'hidden' });
        }

        if ( popupCategory === 'work-offer' || popupCategory === 'details' ) {
            App.$body.css({ 'overflow-y': 'hidden' });
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
            App.$body.css({ 'overflow-y': 'hidden' });
        });

        if (popupCategory === 'gallery') {
            const product = $(this).attr('data-product');
            $flexPopup.find(`.popup__content .popup-gallery`).hide();
            const $productGallery = $flexPopup.find(`.popup__content .popup-gallery[data-gallery="product-${product}"]`);
            $productGallery.show();
            popupGallery(product);
        }

        pauseOtherVideos('.swiper-slide');

        return false;
    });

    // closing popups
    $('.dialogs').on('click touch', '.close, .close-bg', function () {
        const $dialogs = $('.dialogs');
        const $flexPopup = $dialogs.find('.flex-popup');
        const $activePopup = $dialogs.find('.popup.active');
        const popupId = $activePopup.attr('id');

        const bodyScroll = () => {
            App.$body.css({ 'overflow-y': 'auto' });
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
        pauseOtherVideos('.swiper-slide');
    });

    // closing popups pressing esc
    $(document).on('keyup', function (e) {
        if (e.key === 'Escape' || e.keyCode === 27) {
            $('.dialogs .popup.active .close').trigger('click');
            pauseOtherVideos('.swiper-slide');
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

        // Получаем все элементы
        const $items = $list.find('.reviews__item');
        $items.hide().removeClass('left right');

        if (activeFilters.length > 0) {
            const filteredItems = [];

            $items.each(function () {
                const $item = $(this);
                const itemFilters = $item.data('filter').split(' ');

                if (activeFilters.some(filter => itemFilters.includes(filter))) {
                    filteredItems.push($item);
                }
            });

            let index = 0;
            filteredItems.forEach((item) => {
                item.show().addClass(index % 2 === 0 ? 'left' : 'right');
                index++;
            });
        } else {
            $items.show();
        }

        const $visible = $list.find('.reviews__item:visible');
        $visible.removeClass('margin-top-reset');
        $visible.each(function (index) {
            if (index <= 0) {
                $(this).addClass('margin-top-reset');
            }
        });
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
            '.dropdown-category',
            '.dropdown-sort',
        ]);
        viewGridSwitcher('.catalog-view a');
    });

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
                    display: 'block',
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
                    },
                    3: {
                        id: product,
                        img: 'assets/img/catalog/mouse-mr-pickles.png',
                        title: 'Мишка Мiстер Піклз',
                        price: '₴ 1590',
                        tag_text: 'Новинка',
                        tag_class: 'new',
                    },
                    4: {
                        id: product,
                        img: 'assets/img/catalog/pot-with-micro-greens.png',
                        title: 'Горщик з мікрозеленню',
                        price: '₴ 1590',
                        tag_text: 'Для притулку',
                        tag_class: 'gift',
                    },
                    5: {
                        id: product,
                        img: 'assets/img/catalog/t-shirt-cat-parents.png',
                        title: 'Футболка котобатьків',
                        price: '₴ 1590',
                        tag_text: 'Для притулку',
                        tag_class: 'gift',
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

                if (App.isMobileDevice()) {
                    responsiveCart($product, 2);
                } else {
                    responsiveCart($product);
                }

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

    if (!App.isMobileDevice()) {
        addToCart('.add_to_cart');
    }

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

    function responsiveCart($product, lengths = 3) {
        if ($product.find('.popup-cart__product').length > lengths) {
            $('.popup-cart').css('margin-bottom', '155px');
            $('.banner-cart').css('margin', '20px 0');
            $product.find('.popup-cart__totals.responsive').addClass('popup-cart__responsive');
            $product.find('.banner-cart__up-sell.responsive').addClass('banner-cart__responsive');
        }
    }

    /**
     * Pause all other videos
     *
     * @param videoContainer
     */
    function pauseOtherVideos(videoContainer) {
        const $videoContainer = $(videoContainer).find('video');
        $videoContainer.each(function () {
            this.pause();
        });
    }

    function playVideo(videoContainer) {
        const $videoContainer = $(videoContainer);
        const $video = $videoContainer.find('video');
        const $button = $videoContainer.find('.video-block__button--mp4');
        const $useIco = $button.find('.ico-video-button > use');

        $button.on('click', function () {

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

    function playVideoThank(videoContainer, button, text = null) {
        const $videoContainer = $(videoContainer);
        const $video = $videoContainer.find('video');
        const $button = $videoContainer.find(button);
        const $text = $videoContainer.find(text);

        $video.on('pause', function () {
            $button.show();
            $button.css('opacity', '1');
        });

        $button.on('click', function (e) {
            if ($video[0].paused) {
                $video[0].play();
                $button.css('opacity', '.5');
                $text.hide();

            } else {
                $video[0].pause();
                $button.css('opacity', '1');
                $text.show();
            }
        });

        $video.on('click', function () {
            if (this.played) {
                this.pause();
                $button.css('opacity', '1');
                $text.show();
            }
        });

        $(document).on('keyup', function (e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                if ($video[0].played) {
                    $video[0].pause();
                    $button.show();
                    $text.show();
                    $button.css('opacity', '1');
                }
            }
        });
    }

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

    /**
     * Адаптивное меню с прокруткой
     */
    function modelsMenu($selector) {
        const $items = $selector.find('a');

        function centerActiveItem($item) {
            const menuWidth = $selector.outerWidth();
            const menuScrollLeft = $selector.scrollLeft();
            const itemOffsetLeft = $item.offset().left;
            const menuOffsetLeft = $selector.offset().left;
            const itemLeft = itemOffsetLeft - menuOffsetLeft;
            const itemWidth = $item.outerWidth();
            const scrollTo = menuScrollLeft + itemLeft - (menuWidth / 2) + (itemWidth / 2);
            $selector.animate({ scrollLeft: scrollTo }, 300);
        }

        $items.on('click touch', function () {
            const $clickedItem = $(this);
            $items.removeClass('active');
            $clickedItem.addClass('active');
            centerActiveItem($clickedItem);
        });

        // Установить начальный активный элемент, если он есть, в центр
        const $initialActive = $items;
        if ($initialActive.length) {
            centerActiveItem($initialActive);
        }
    }

    function addClassOnScroll(selector, threshold, className) {
        const $targetBlock = $(selector);

        function handleScroll() {
            if ($(window).scrollTop() >= threshold) {
                if (!$targetBlock.hasClass(className)) {
                    $targetBlock.addClass(className); // Добавляем класс
                }
            } else {
                $targetBlock.removeClass(className); // Убираем класс
            }
        }

        $(window).on('scroll', handleScroll);
    }

    /**
     * Preloads all specified media elements (images or videos) within a hidden container.
     * Ensures that when the container is displayed, the media is already loaded,
     * improving user experience by eliminating loading delays.
     *
     * @param {string} containerSelector - A jQuery selector string specifying the hidden container
     *                                     where the media elements are located.
     * @param {string} mediaType - The type of media to preload.
     *                             Possible values: 'img' for images, 'video' for videos.
     *
     * @example:
     * $(document).ready(function () {
     *     preloadHiddenMedia('.container', 'img');   // Preloads images
     *     preloadHiddenMedia('.container', 'video'); // Preloads videos
     * });
     */
    function preloadHiddenMedia(containerSelector, mediaType) {
        if (mediaType !== 'img' && mediaType !== 'video') {
            console.log('Invalid mediaType. Use "img" or "video".');
            return;
        }

        $(containerSelector).find(mediaType).each(function () {
            if (mediaType === 'img') {
                const img = new Image();
                img.src = $(this).attr('src');  // Preload image by setting src
            } else if (mediaType === 'video') {
                this.load();  // Preload video by invoking the load() method
            }
        });
    }

    function chooseProductScroll() {
        App.$body.on('click touch', '.choose-product', () => {
            if (App.$modelsMenu.length > 0) {
                if (App.isMobileDevice()) {
                    App.scrollTopBody(App.$productsMobile);
                } else {
                    App.scrollTopBody(App.$modelsMenu);
                }
            }
        });
    }

    function toggleDropdownMenu(open) {
        $(open).on('click', function () {
            const $this = $(this);
            const $item = $this.next('.menu-dropdown__item');
            const $svg = $this.find('svg');
            $item.slideToggle(300);
            $svg.toggleClass('rotated');
        });
    }

    $(window).on('load scroll', waitAnimation);

    $(function() {

        if (App.isMobileDevice()) {
            toggleDropdownMenu('.menu-dropdown > .menu-dropdown__open');
            addClassOnScroll('.product-card__form .product-card__buttons--clone', 200, 'fixed');

            // Манипуляция с адаптивными кнопками
            $('.product-card__form .product-card__buttons').each(function() {
                const content = $(this).html();
                $(this).remove();
                $('.product-card__form .product-card__buttons--clone').html(content);
            });

            addToCart('.add_to_cart');

            productsSlider('.products-mobile__slider.swiper-container');
            productsSlider('.in-box .swiper-container');
        }

        $('.video-block__source').each(function () {
            playVideo(this);
        });

        modelsMenu(App.$modelsMenu);
        modelsMenu($('.blog-page__categories'));
        playVideoThank('.thank-page__video', '.thank-page__button', '.thank-page__play--text');
        initializeAccordion('.accordion-open', '.accordion__content', '.accordion__item');

        addClassOnScroll('.section--reviews > .section__wrapper', 120, 'fixed');

        // WP загружать только на нужных страницах
        preloadHiddenMedia('.dialogs', 'img');

        chooseProductScroll();

        if ( App.$modelsMenu.length > 0 ) {
            const $activeItem = App.$modelsMenu.find('a' + '.active');
            if($activeItem.attr('href') === App.winLocHash || '#choose-product' === App.winLocHash) {
                if (App.isMobileDevice()) {
                    App.scrollTopBody(App.$productsMobile);
                } else {
                    App.scrollTopBody(App.$modelsMenu);
                }
            }
        }
    });

})(jQuery);