(f=>{window.App=window.App||{},App.isScrollTopBody=!0,App.winLocHash=window.location.hash,App.$body=f("body"),App.$htmlBody=f("html, body"),App.$modelsMenu=f(".slider-menu .models-menu"),App.$productsMobile=f(".products-mobile"),App.$currentProduct=null,App.$nextProduct=null,App.scrollTopBody=function(e,t=54,i=600){(e="string"==typeof e?f(e):e).length&&App.$htmlBody.animate({scrollTop:e.offset().top-t},i)},App.initFileUpload=function(e,t,s,a=20){f(e).on("click",function(){f(t).trigger("click")}),f(t).on("change",function(){let e=this.files[0]?.name||"Файл не обрано";var t,i,o;e.length>a&&(t=-1!==(t=e.lastIndexOf("."))?e.slice(t):"",0<(o=a-t.length-3))&&(i=e.slice(0,Math.ceil(o/2)),o=e.slice(-Math.floor(o/2)),e=i+"..."+o+t),f(s).text(e)})},App.lazyLoadImages=function(){f("img[data-src]").each(function(){var e,t,i=f(this);i.isInViewportImg()&&!i.data("loaded")&&(e=i.attr("data-src"),t=i.attr("data-srcset"),e&&i.attr("src",e),t&&i.attr("srcset",t),i.data("loaded",!0),i.hide().fadeIn(400))})},App.isMobileDevice=function(e=768){return window.innerWidth<e},App.headerMobileClick=function(e,t=48){f(e).on("click touch",function(e){e.preventDefault(),App.$nextProduct?App.scrollTopBody(App.$nextProduct,t):App.scrollTopBody(f(".products-mobile__item").first(),t)})},App.updateHeaderOnScroll=function(){var e,t=f(".header-mobile"),i=t.find(".header-mobile__title > p"),o=t.find(".header-mobile__arrow");let s=f(".products-mobile__item"),a=f(window).scrollTop(),n=f(window).height(),p=!0;App.$currentProduct=null,App.$nextProduct=null,s.each(function(e){var t=f(this),i=t.offset().top,o=i+t.outerHeight();i<a+n&&o>a&&i<=a+48&&o>a+48&&(App.$currentProduct=t,App.$nextProduct=s.eq(e+1)),o>=a&&(p=!1)}),48<a&&!p?t.is(":visible")||(f(".header").css("visibility","hidden"),t.css("display","flex")):t.is(":visible")&&(t.fadeOut(),f(".header").css("visibility","visible")),App.$currentProduct&&(t=App.$currentProduct.find("h2").text(),e=App.$nextProduct?App.$nextProduct.data("product-anchor"):"#",i.text()!==t&&i.text(t),o.attr("href",e))},f.fn.isInViewportImg=function(){var e=f(this).offset().top,t=e+f(this).outerHeight(),i=f(window).scrollTop(),o=i+f(window).height();return i<t&&e<o},f(window).on("load scroll resize",App.lazyLoadImages),f.fn.percentOfViewport=function(){var e=f(window).height(),t=f(this).offset().top,i=t+f(this).height(),o=f(window).scrollTop(),s=o+e;return{ELtop_to_VPtop:(t-o)/e*100,ELbottom_to_VPtop:(i-o)/e*100,ELtop_to_VPbottom:(s-t)/e*100,ELbottom_to_VPbottom:(s-i)/e*100,viewportHeight:e}},f.fn.isInViewport=function(){var e=f(this).percentOfViewport();return e.ELtop_to_VPtop<100&&0<e.ELbottom_to_VPtop},f(".sandwich").on("click touch",function(){f(this).toggleClass("active"),f(".header__navigation").slideToggle();var e=f(".header__wrapper--navigation");"40px"===e.css("padding-bottom")?e.removeAttr("style"):e.css({"padding-bottom":"40px"})}),f(".inp-phone").mask("+38 (999) 999-99-99");var e=new Swiper(".gallery > .gallery__preview.swiper-container",{direction:"vertical",slidesPerView:"auto",spaceBetween:8});function t(e){document.querySelectorAll(e).forEach(e=>{new Swiper(e,{slidesPerView:"auto",autoHeight:"true"===e.dataset.autoHeight||!1,spaceBetween:20,centeredSlides:!0,slideToClickedSlide:!0,pagination:{el:e.nextElementSibling,clickable:!0}})})}new Swiper(".gallery > .gallery__media.swiper-container",{spaceBetween:0,thumbs:{swiper:e},pagination:{el:".product-card__wrapper > .flex > .swiper-pagination-clickable",clickable:!0}}),new Swiper(".offers-card__slider.swiper-container",{slidesPerView:"auto",direction:"horizontal",spaceBetween:6,navigation:{nextEl:".offers-card__navigation .slider-nav__next",prevEl:".offers-card__navigation .slider-nav__prev"},breakpoints:{319:{slidesOffsetBefore:20,slidesOffsetAfter:20},769:{slidesOffsetBefore:240,slidesOffsetAfter:240}}}),new Swiper(".benefits-card__slider.swiper-container",{slidesPerView:"auto",direction:"horizontal",spaceBetween:40,navigation:{nextEl:".benefits-card__navigation .slider-nav__next",prevEl:".benefits-card__navigation .slider-nav__prev"},breakpoints:{319:{spaceBetween:20,slidesOffsetBefore:20,slidesOffsetAfter:20},769:{spaceBetween:40,slidesOffsetBefore:240,slidesOffsetAfter:240}}}),new Swiper(".reviews > .swiper-container",{pagination:{el:".reviews > .swiper-pagination-clickable",clickable:!0},breakpoints:{319:{slidesPerView:"auto",spaceBetween:20,slidesOffsetBefore:20,slidesOffsetAfter:20},769:{slidesPerView:3,spaceBetween:30}}}),new Swiper(".article-related .swiper-container",{autoHeight:!1,autoplay:{delay:2e3},breakpoints:{319:{slidesPerView:"auto",spaceBetween:20,slidesOffsetBefore:20,slidesOffsetAfter:20},769:{slidesPerView:3,spaceBetween:30}}});var i=f(e=".product-slider");0<i.length&&new Swiper(e,{slidesPerView:"auto",spaceBetween:120,threshold:20,speed:800,initialSlide:(parseInt(i.data("initial-slide"))||1)-1,loop:!1,observer:!0,autoHeight:!1,observeParents:!0,slideToClickedSlide:!0,observeSlideChildren:!0,centeredSlides:!0,hashNavigation:{replaceState:!0,watchState:!0},on:{init:function(){App.isScrollTopBody=!1},slideChange:function(){var e=App.$modelsMenu.find("a");e.removeClass("active"),e.eq(this.realIndex).addClass("active").trigger("classChange"),App.isScrollTopBody||App.scrollTopBody(App.$modelsMenu)}}}),App.$body.on("click touch",".open-dialog, .open-popup, .open-form, .open-modal",function(e){e.preventDefault();var e=f(this).attr("href"),t=f(".dialogs");let i=t.find(e);var o=t.find(".flex-popup"),s=e.slice(1);return"policy"!==s&&localStorage.setItem("popup",s),"list"===s&&(App.$body.css({"overflow-y":"hidden"}),t.css({"overflow-y":"hidden"})),"work-offer"!==s&&"details"!==s||(App.$body.css({"overflow-y":"hidden"}),t.css({"overflow-y":"auto"})),t.find(".popup").removeClass("active").hide(),i.length?(t.find(".popup").removeClass("active").hide(),i.show(),t.show(),o.addClass("popup--"+s),t.animate({opacity:1},300,()=>{i.addClass("active"),App.$body.css({"overflow-y":"hidden"})}),"gallery"===s&&(t=f(this).attr("data-product"),o.find(".popup__content .popup-gallery").hide(),o.find(`.popup__content .popup-gallery[data-gallery="product-${t}"]`).show(),s=t,o=new Swiper(`.popup-gallery[data-gallery="product-${s}"] > .popup-gallery__preview`,{slidesPerView:"auto",spaceBetween:8,threshold:8,breakpoints:{320:{direction:"horizontal",slidesOffsetBefore:20,slidesOffsetAfter:20},480:{direction:"horizontal",slidesOffsetBefore:20,slidesOffsetAfter:20},640:{direction:"vertical"}}}),new Swiper(`.popup-gallery[data-gallery="product-${s}"] > .popup-gallery__media`,{spaceBetween:0,thumbs:{swiper:o}})),r(".swiper-slide")):console.log(`Попап с ID ${e} не найден.`),!1}),f(".dialogs").on("click touch",".close, .close-bg",function(){let e=f(".dialogs"),t=e.find(".flex-popup");var i,o,s=e.find(".popup.active").attr("id");let a=()=>{App.$body.css({"overflow-y":"auto"})},n=()=>{t.removeClass(function(e,t){return(t.match(/popup--\S+/g)||[]).join(" ")})},p=t.find(".popup.active");"cart"===s?p.animate({right:"-100%",opacity:0},600,function(){e.animate({opacity:0},300,function(){e.find(".popup").removeClass("active").hide(),p.removeAttr("style"),e.hide(),e.find(".thanks-popup").hide(),n()}),a()}):"policy"===s?(p.removeClass("active").hide(),i=localStorage.getItem("popup"),(o=f(".dialogs #"+i)).length?(o.addClass("active").show(),e.show()):console.log("Попап с ID "+i+" не найден.")):"details"===s?p.animate({top:"100%",opacity:0},600,function(){e.animate({opacity:0},400,function(){e.find(".popup").removeClass("active").hide(),p.removeAttr("style"),e.hide(),n()}),a()}):"list"===s?p.animate({bottom:"-100%",opacity:0},600,function(){e.animate({opacity:0},300,function(){e.find(".popup").removeClass("active").hide(),p.removeAttr("style"),e.hide(),n()}),a()}):(p.removeClass("active").hide(),e.animate({opacity:0},300,function(){e.hide(),e.find(".thanks-popup").hide(),n(),a()})),r(".swiper-slide")}),f(document).on("keyup",function(e){"Escape"!==e.key&&27!==e.keyCode||(f(".dialogs .popup.active .close").trigger("click"),r(".swiper-slide"))});let s=".dropdown";function p(e){f(e).on("click touch",function(t){t.preventDefault();var t=f(this),i=t.data("up-sell"),o=t.data("product"),s=f(`.popup-gallery[data-gallery="product-${o}"] .popup-gallery__media .swiper-wrapper .swiper-slide img`).first(),a=(0===s.length&&console.log(`Изображение для продукта ${o} не найдено.`),f(".header__cart")),n=a.find(".ico-cart");let p=a.find(".header__cart--count");var a=p.find(".count"),r=parseInt(a.text())+1;if(i)r<=99&&a.text(r),i=i,d=f(".popup-cart__products form"),(l=f(".banner-cart")).find(".banner-cart__up-sell").last().show(),l.find(`#up-sell-${i}.banner-cart__up-sell`).hide(),(l={1:{id:1,img:"assets/img/content/popup-cart-banner-2x.jpg",title:"Мышка-игрушка Mr. Pickles",discount:"-30%",price:"₴ 90",price_discount:"₴ 125"},2:{id:2,img:"assets/img/content/main-card-about-2x.jpg",title:"Домик для кота Mr. Whiskers",discount:"-20%",price:"₴ 150",price_discount:"₴ 200"}})[i]?(l=`
            <div class="popup-cart__product popup-cart__up-sell">
                <div class="popup-cart__item">
                    <div class="popup-cart__item--photo">
                        <img src="${(l=l[i]).img}" alt="${l.title}">
                    </div>
                </div>
                <div class="popup-cart__item">
                    <div class="popup-cart__title">
                        <h4 class="body-s-reg">${l.title}</h4>
                    </div>
                    <div class="popup-cart__details">
                        <div class="popup-cart__calc">
                            <span class="tag tag--discount">${l.discount}</span>
                        </div>
                        <div class="popup-cart__price">
                            <s class="banner-cart__discount">${l.price_discount}</s>
                            <p class="body-s-sb">${l.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        `,0===(c=d.find(".popup-cart__product")).length?d.prepend(l):c.last().after(l),h(d)):console.log(`Товар с ID ${i} не найден.`);else{App.isMobileDevice()&&f(".header").css({visibility:"visible","z-index":12});var c=s.prop("naturalWidth"),l=s.prop("naturalHeight");let e=s.clone().addClass("fly-image").appendTo("body");var d=t.offset(),i=d.left+t.outerWidth()/2,s=d.top+t.outerHeight()/2-3*t.outerHeight(),t=n.offset(),u=t.left+n.width()/2,t=t.top+n.height()/2,n=(e.css({display:"block",top:s-l/2,left:i-c/2,width:c,height:l,position:"absolute",zIndex:1e3,pointerEvents:"none"}),n.width()/c),u=(e.css({transition:"transform 1000ms ease-in-out, opacity 1000ms ease-in-out",transformOrigin:"center center",transform:`translate(${u-i}px, ${t-s}px) scale(${n})`,opacity:.3}),{1:{id:o,img:"assets/img/catalog/grace-pro-black-2x.png",title:"Кiгтеточка-лежанка Grace Pro Max",price:"₴ 1590",tag_text:"Для притулку",tag_class:"gift"},2:{id:o,img:"assets/img/catalog/3in1-2x.png",title:"Cloud",price:"₴ 2590",tag_text:"Новинка",tag_class:"new"},3:{id:o,img:"assets/img/catalog/mouse-mr-pickles.png",title:"Мишка Мiстер Піклз",price:"₴ 1590",tag_text:"Новинка",tag_class:"new"},4:{id:o,img:"assets/img/catalog/pot-with-micro-greens.png",title:"Горщик з мікрозеленню",price:"₴ 1590",tag_text:"Для притулку",tag_class:"gift"},5:{id:o,img:"assets/img/catalog/t-shirt-cat-parents.png",title:"Футболка котобатьків",price:"₴ 1590",tag_text:"Для притулку",tag_class:"gift"}});u[o]?(t=`
                    <div class="popup-cart__product">
                        <div class="popup-cart__item ">
                            <div class="popup-cart__item--photo">
                                <a href="/catalog.html" class="tag tag--${(i=u[o]).tag_class}">${i.tag_text}</a>
                                <img src="${i.img}" alt="${i.title}">
                            </div>
                        </div>
                        <div class="popup-cart__item">
                            <div class="popup-cart__title">
                                <h4 class="body-s-reg">${i.title}</h4>
                            </div>
                            <div class="popup-cart__details">
                                <div class="popup-cart__calc">
                                    <button class="minus"></button>
                                    <input type="text" id="quantity_${i.id}" name="quantity[]" name="cart[хешWoo][qty]" class="quantity body-s-sb" value="1" />
                                    <button class="plus"></button>
                                </div>
                                <div class="popup-cart__price">
                                    <p class="body-s-sb">${i.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `,(s=f(".popup-cart__products form")).prepend(t),App.isMobileDevice()?h(s,2):h(s),(n=s.find(".popup-cart__product").first()).find(".popup-cart__calc .quantity").val(1),n.find(".popup-cart__calc").each(function(){var e=f(this);e.on("click touch",".minus",function(){var e=f(this).siblings(".quantity"),t=parseInt(e.val(),10);1<t&&e.val(t-1)}),e.on("click touch",".plus",function(){var e=f(this).siblings(".quantity"),t=parseInt(e.val(),10);e.val(t+1)}),e.on("input",".quantity",function(){var e=f(this).val();(!/^\d+$/.test(e)||parseInt(e,10)<1)&&f(this).val(1)})}),r<=99&&a.text(r),setTimeout(()=>{e.remove(),p.show(),setTimeout(()=>{App.isMobileDevice()&&f(".header").css({visibility:"hidden","z-index":10})},300)},1e3)):console.log(`Товар с ID ${o} не найден.`)}})}function h(e,t=3){e.find(".popup-cart__product").length>t&&(f(".popup-cart").css("margin-bottom","155px"),f(".banner-cart").css("margin","20px 0"),e.find(".popup-cart__totals.responsive").addClass("popup-cart__responsive"),e.find(".banner-cart__up-sell.responsive").addClass("banner-cart__responsive"))}function r(e){f(e).find("video").each(function(){this.pause()})}function c(s){let t=s.find("a");function i(e){var t=s.outerWidth(),i=s.scrollLeft(),o=e.offset().left-s.offset().left,e=e.outerWidth();s.animate({scrollLeft:i+o-t/2+e/2},300)}t.on("click touch",function(){var e=f(this);t.removeClass("active"),e.addClass("active"),i(e)});var e=t;e.length&&i(e)}function l(e,t,i){let o=f(e);f(window).on("scroll",function(){f(window).scrollTop()>=t?o.hasClass(i)||o.addClass(i):o.removeClass(i)})}f(s).on("click touch",s+"__item",function(e){f(this).toggleClass("active").trigger("filtered"),e.stopPropagation()}),f(s).on("filtered",s+"__item",function(){var e=f(this).closest(s),t=f(".filtered-list");let o=e.find(s+"__item.active").map(function(){return f(this).data("filter")}).get();e=t.find(".reviews__item");if(e.hide().removeClass("left right"),0<o.length){let i=[],t=(e.each(function(){var e=f(this);let t=e.data("filter").split(" ");o.some(e=>t.includes(e))&&i.push(e)}),0);i.forEach(e=>{e.show().addClass(t%2==0?"left":"right"),t++})}else e.show();e=t.find(".reviews__item:visible");e.removeClass("margin-top-reset"),e.each(function(e){e<=0&&f(this).addClass("margin-top-reset")})}),f(document).on("click touch",".mini-card__option--link",function(e){e.preventDefault();var t,i,e=f(this).data("mini-card-option");e&&(i=(t=f(this).closest(".mini-card")).find(".mini-card-img"),t.find(".mini-card__option--link").removeClass("active"),f(this).addClass("active"),i.removeClass("active").hide(),t.find(".mini-card-img.img-"+e).addClass("active").fadeIn())}),f(document).on("click touch",".product-card__option--link",function(e){e.preventDefault();var t,i,e=f(this).data("product-card-option");e&&(t=f(this).data("product-card-title"))&&((i=f(this).closest(".product-card__option")).find(".product-card__option--title").text(t),i.find(".product-card__option--link").removeClass("active"),f(this).addClass("active"),console.log(e))}),f(window).on("load",function(){e=(e=[".dropdown-language",".dropdown-filter",".dropdown-category",".dropdown-sort"]).join(","),f(document).on("click touch",e,function(e){var t=f(this).next(s);if(!t.hasClass("active"))return f(s).removeClass("active"),t.addClass("active"),e.stopPropagation(),!1;t.removeClass("active")}),f(document).on("click touch",function(e){f(e.target).closest(s).length||f(s).removeClass("active")});{var e=".catalog-view a";let i=f(e);i.on("click",function(e){e.preventDefault();var e=f(this).data("view"),t=(i.removeClass("active"),f(this).addClass("active"),f(".view__wrapper"));t.removeClass(function(e,t){return(t.match(/view__wrapper--\S+/g)||[]).join(" ")}),e&&"default"!==e&&t.addClass("view__wrapper--"+e)})}}),App.isMobileDevice()||p(".add_to_cart"),f(window).on("load scroll",function(){f(window).scrollTop(),f(".js-wait-animation").each(function(){f(this).isInViewport()?f(this).addClass("animate").removeClass("out-of-viewport"):f(this).addClass("out-of-viewport")})}),f(function(){var i,o,e;App.isMobileDevice()&&(f(".menu-dropdown > .menu-dropdown__open").on("click touch",function(){var e=f(this),t=e.next(".menu-dropdown__item"),e=e.find("svg");t.slideToggle(300),e.toggleClass("rotated")}),l(".product-card__form .product-card__buttons--clone",200,"fixed"),f(".product-card__form .product-card__buttons").each(function(){var e=f(this).html();f(this).remove(),f(".product-card__form .product-card__buttons--clone").html(e)}),p(".add_to_cart"),t(".products-mobile__slider.swiper-container"),t(".in-box .swiper-container")),f(".video-block__source").each(function(){{var i=this;let e=(i=f(i)).find("video"),t=(i=i.find(".video-block__button--mp4")).find(".ico-video-button > use");i.on("click",function(){f(".video-block__source video").each(function(){this!==e[0]&&(this.pause(),f(this).closest(".video-block__source").find(".ico-video-button > use").attr("href","assets/img/sprite.svg#ico-play"))}),e[0].paused?(e[0].play(),e.hasClass("cover")&&e.css("object-fit","cover"),t.attr("href","assets/img/sprite.svg#ico-pause")):(e[0].pause(),t.attr("href","assets/img/sprite.svg#ico-play"))})}}),c(App.$modelsMenu),c(f(".blog-page__categories"));{var s=".thank-page__video",a=".thank-page__button",n=".thank-page__play--text";let t=(s=f(s)).find("video"),i=s.find(a),o=s.find(n);t.on("pause",function(){i.show(),i.css("opacity","1")}),i.on("click",function(e){t[0].paused?(t[0].play(),i.css("opacity",".5"),o.hide()):(t[0].pause(),i.css("opacity","1"),o.show())}),t.on("click",function(){this.played&&(this.pause(),i.css("opacity","1"),o.show())}),f(document).on("keyup",function(e){"Escape"!==e.key&&27!==e.keyCode||t[0].played&&(t[0].pause(),i.show(),o.show(),i.css("opacity","1"))})}i=".accordion__content",o=".accordion__item",f(".accordion-open").on("click",function(e){e.preventDefault();var e=f(this).closest(o),t=e.find(i);e.hasClass("active")?(e.removeClass("active"),t.stop(!0,!0).slideUp()):(e.siblings().removeClass("active").find(i).slideUp(),e.addClass("active"),t.stop(!0,!0).slideDown())}),l(".section--reviews > .section__wrapper",120,"fixed"),a=".dialogs",(e="img")!==e&&"video"!==e?console.log('Invalid mediaType. Use "img" or "video".'):f(a).find(e).each(function(){"img"===e?(new Image).src=f(this).attr("src"):"video"===e&&this.load()}),App.$body.on("click touch",".choose-product",()=>{0<App.$modelsMenu.length&&(App.isMobileDevice()?App.scrollTopBody(App.$productsMobile):App.scrollTopBody(App.$modelsMenu))}),0<App.$modelsMenu.length&&(App.$modelsMenu.find("a.active").attr("href")!==App.winLocHash&&"#choose-product"!==App.winLocHash||(App.isMobileDevice()?App.scrollTopBody(App.$productsMobile):App.scrollTopBody(App.$modelsMenu)))})})(jQuery);
//# sourceMappingURL=main.js.map
