(v=>{window.App=window.App||{},App.isScrollTopBody=!0,App.winLocHash=window.location.hash,App.$body=v("body"),App.$htmlBody=v("html, body"),App.$modelsMenu=v(".slider-menu .models-menu"),App.scrollTopBody=function(e,t=54,i=600){(e="string"==typeof e?v(e):e).length&&App.$htmlBody.animate({scrollTop:e.offset().top-t},i)},App.initFileUpload=function(e,t,a,s=20){v(e).on("click",function(){v(t).trigger("click")}),v(t).on("change",function(){let e=this.files[0]?.name||"Файл не обрано";var t,i,o;e.length>s&&(t=-1!==(t=e.lastIndexOf("."))?e.slice(t):"",0<(o=s-t.length-3))&&(i=e.slice(0,Math.ceil(o/2)),o=e.slice(-Math.floor(o/2)),e=i+"..."+o+t),v(a).text(e)})},App.lazyLoadImages=function(){v("img[data-src]").each(function(){var e,t,i=v(this);i.isInViewportImg()&&!i.data("loaded")&&(e=i.attr("data-src"),t=i.attr("data-srcset"),e&&i.attr("src",e),t&&i.attr("srcset",t),i.data("loaded",!0),i.hide().fadeIn(400))})},App.isMobileDevice=function(e){return/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent)},v.fn.isInViewportImg=function(){var e=v(this).offset().top,t=e+v(this).outerHeight(),i=v(window).scrollTop(),o=i+v(window).height();return i<t&&e<o},v(window).on("load scroll resize",App.lazyLoadImages),v.fn.percentOfViewport=function(){var e=v(window).height(),t=v(this).offset().top,i=t+v(this).height(),o=v(window).scrollTop(),a=o+e;return{ELtop_to_VPtop:(t-o)/e*100,ELbottom_to_VPtop:(i-o)/e*100,ELtop_to_VPbottom:(a-t)/e*100,ELbottom_to_VPbottom:(a-i)/e*100,viewportHeight:e}},v.fn.isInViewport=function(){var e=v(this).percentOfViewport();return e.ELtop_to_VPtop<100&&0<e.ELbottom_to_VPtop},v(".sandwich").on("click touch",function(){v(this).toggleClass("active"),v(".header__navigation").slideToggle();var e=v(".header__wrapper--navigation");"40px"===e.css("padding-bottom")?e.removeAttr("style"):e.css({"padding-bottom":"40px"})}),v(".inp-phone").mask("+38 (999) 999-99-99");var e=new Swiper(".gallery > .gallery__preview.swiper-container",{direction:"vertical",slidesPerView:"auto",spaceBetween:8});new Swiper(".gallery > .gallery__media.swiper-container",{spaceBetween:0,thumbs:{swiper:e}}),new Swiper(".offers-card__slider.swiper-container",{slidesPerView:"auto",direction:"horizontal",slidesOffsetBefore:240,slidesOffsetAfter:240,spaceBetween:6,navigation:{nextEl:".offers-card__navigation .slider-nav__next",prevEl:".offers-card__navigation .slider-nav__prev"}}),new Swiper(".benefits-card__slider.swiper-container",{slidesPerView:"auto",direction:"horizontal",slidesOffsetBefore:240,slidesOffsetAfter:240,spaceBetween:40,navigation:{nextEl:".benefits-card__navigation .slider-nav__next",prevEl:".benefits-card__navigation .slider-nav__prev"}}),new Swiper(".reviews > .swiper-container",{slidesPerView:3,spaceBetween:30,pagination:{el:".reviews > .swiper-pagination-clickable",clickable:!0}});var t=v(e=".product-slider");0<t.length&&new Swiper(e,{slidesPerView:"auto",spaceBetween:120,threshold:20,speed:800,initialSlide:(parseInt(t.data("initial-slide"))||1)-1,loop:!1,observer:!0,autoHeight:!1,observeParents:!0,slideToClickedSlide:!0,observeSlideChildren:!0,centeredSlides:!0,hashNavigation:{replaceState:!0,watchState:!0},on:{init:function(){App.isScrollTopBody=!1},slideChange:function(){var e=App.$modelsMenu.find("a");e.removeClass("active"),e.eq(this.realIndex).addClass("active").trigger("classChange"),App.isScrollTopBody||App.scrollTopBody(App.$modelsMenu)}}}),App.$body.on("click touch",".open-dialog, .open-popup, .open-form, .open-modal",function(e){e.preventDefault();var e=v(this).attr("href"),t=v(".dialogs");let i=t.find(e);var o=t.find(".flex-popup"),a=e.slice(1);return"policy"!==a&&localStorage.setItem("popup",a),"list"===a&&(App.$body.css({"overflow-y":"hidden"}),t.css({"overflow-y":"hidden"})),"work-offer"!==a&&"details"!==a||(App.$body.css({"overflow-y":"hidden"}),t.css({"overflow-y":"auto"})),t.find(".popup").removeClass("active").hide(),i.length?(t.find(".popup").removeClass("active").hide(),i.show(),t.show(),o.addClass("popup--"+a),t.animate({opacity:1},300,()=>{i.addClass("active"),App.$body.css({"overflow-y":"hidden"})}),"gallery"===a&&(t=v(this).attr("data-product"),o.find(".popup__content .popup-gallery").hide(),o.find(`.popup__content .popup-gallery[data-gallery="product-${t}"]`).show(),a=t,o=new Swiper(`.popup-gallery[data-gallery="product-${a}"] > .popup-gallery__preview`,{slidesPerView:"auto",spaceBetween:8,threshold:8,breakpoints:{320:{direction:"horizontal",slidesOffsetBefore:20,slidesOffsetAfter:20},480:{direction:"horizontal",slidesOffsetBefore:20,slidesOffsetAfter:20},640:{direction:"vertical"}}}),new Swiper(`.popup-gallery[data-gallery="product-${a}"] > .popup-gallery__media`,{spaceBetween:0,thumbs:{swiper:o}})),c(".swiper-slide")):console.log(`Попап с ID ${e} не найден.`),!1}),v(".dialogs").on("click touch",".close, .close-bg",function(){let e=v(".dialogs"),t=e.find(".flex-popup");var i,o,a=e.find(".popup.active").attr("id");let s=()=>{App.$body.css({"overflow-y":"auto"})},n=()=>{t.removeClass(function(e,t){return(t.match(/popup--\S+/g)||[]).join(" ")})},p=t.find(".popup.active");"cart"===a?p.animate({right:"-100%",opacity:0},600,function(){e.animate({opacity:0},300,function(){e.find(".popup").removeClass("active").hide(),p.removeAttr("style"),e.hide(),e.find(".thanks-popup").hide(),n()}),s()}):"policy"===a?(p.removeClass("active").hide(),i=localStorage.getItem("popup"),(o=v(".dialogs #"+i)).length?(o.addClass("active").show(),e.show()):console.log("Попап с ID "+i+" не найден.")):"details"===a?p.animate({top:"100%",opacity:0},600,function(){e.animate({opacity:0},400,function(){e.find(".popup").removeClass("active").hide(),p.removeAttr("style"),e.hide(),n()}),s()}):"list"===a?p.animate({bottom:"-100%",opacity:0},600,function(){e.animate({opacity:0},300,function(){e.find(".popup").removeClass("active").hide(),p.removeAttr("style"),e.hide(),n()}),s()}):(p.removeClass("active").hide(),e.animate({opacity:0},300,function(){e.hide(),e.find(".thanks-popup").hide(),n(),s()})),c(".swiper-slide")}),v(document).on("keyup",function(e){"Escape"!==e.key&&27!==e.keyCode||(v(".dialogs .popup.active .close").trigger("click"),c(".swiper-slide"))});let i=".dropdown";function o(e){v(e).on("click touch",function(){var t=v(this),i=t.data("up-sell"),o=t.data("product"),a=v(`.popup-gallery[data-gallery="product-${o}"] .popup-gallery__media .swiper-wrapper .swiper-slide img`).first(),s=(0===a.length&&console.log(`Изображение для продукта ${o} не найдено.`),v(".header__cart")),n=s.find(".ico-cart");let p=s.find(".header__cart--count");var s=p.find(".count"),c=parseInt(s.text())+1;if(i)c<=99&&s.text(c),i=i,d=v(".popup-cart__products form"),(l=v(".banner-cart")).find(".banner-cart__up-sell").last().show(),l.find(`#up-sell-${i}.banner-cart__up-sell`).hide(),(l={1:{id:1,img:"assets/img/content/popup-cart-banner-2x.jpg",title:"Мышка-игрушка Mr. Pickles",discount:"-30%",price:"₴ 90",price_discount:"₴ 125"},2:{id:2,img:"assets/img/content/main-card-about-2x.jpg",title:"Домик для кота Mr. Whiskers",discount:"-20%",price:"₴ 150",price_discount:"₴ 200"}})[i]?(l=`
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
        `,0===(r=d.find(".popup-cart__product")).length?d.prepend(l):r.last().after(l),f(d)):console.log(`Товар с ID ${i} не найден.`);else{var r=a.prop("naturalWidth"),l=a.prop("naturalHeight");let e=a.clone().addClass("fly-image").appendTo("body");var d=t.offset(),i=d.left+t.outerWidth()/2,a=d.top+t.outerHeight()/2-3*t.outerHeight(),t=n.offset(),u=t.left+n.width()/2,t=t.top+n.height()/2,n=(e.css({top:a-l/2,left:i-r/2,width:r,height:l,position:"absolute",zIndex:1e3,pointerEvents:"none"}),n.width()/r),u=(e.css({transition:"transform 1000ms ease-in-out, opacity 1000ms ease-in-out",transformOrigin:"center center",transform:`translate(${u-i}px, ${t-a}px) scale(${n})`,opacity:.3}),{1:{id:o,img:"assets/img/catalog/grace-pro-black-2x.png",title:"Кiгтеточка-лежанка Grace Pro Max",price:"₴ 1590",tag_text:"Для притулку",tag_class:"gift"},2:{id:o,img:"assets/img/catalog/3in1-2x.png",title:"Cloud",price:"₴ 2590",tag_text:"Новинка",tag_class:"new"},3:{id:o,img:"assets/img/catalog/mouse-mr-pickles.png",title:"Мишка Мiстер Піклз",price:"₴ 1590",tag_text:"Новинка",tag_class:"new"},4:{id:o,img:"assets/img/catalog/pot-with-micro-greens.png",title:"Горщик з мікрозеленню",price:"₴ 1590",tag_text:"Для притулку",tag_class:"gift"},5:{id:o,img:"assets/img/catalog/t-shirt-cat-parents.png",title:"Футболка котобатьків",price:"₴ 1590",tag_text:"Для притулку",tag_class:"gift"}});u[o]?(t=`
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
                `,(a=v(".popup-cart__products form")).prepend(t),f(a),(n=a.find(".popup-cart__product").first()).find(".popup-cart__calc .quantity").val(1),n.find(".popup-cart__calc").each(function(){var e=v(this);e.on("click touch",".minus",function(){var e=v(this).siblings(".quantity"),t=parseInt(e.val(),10);1<t&&e.val(t-1)}),e.on("click touch",".plus",function(){var e=v(this).siblings(".quantity"),t=parseInt(e.val(),10);e.val(t+1)}),e.on("input",".quantity",function(){var e=v(this).val();(!/^\d+$/.test(e)||parseInt(e,10)<1)&&v(this).val(1)})}),c<=99&&s.text(c),setTimeout(()=>{e.remove(),p.show()},1e3)):console.log(`Товар с ID ${o} не найден.`)}})}function f(e){3<e.find(".popup-cart__product").length&&(v(".popup-cart").css("margin-bottom","155px"),v(".banner-cart").css("margin","20px 0"),e.find(".popup-cart__totals.responsive").addClass("popup-cart__responsive"),e.find(".banner-cart__up-sell.responsive").addClass("banner-cart__responsive"))}function c(e){v(e).find("video").each(function(){this.pause()})}v(i).on("click touch",i+"__item",function(e){v(this).toggleClass("active").trigger("filtered"),e.stopPropagation()}),v(i).on("filtered",i+"__item",function(){var e=v(this).closest(i),t=v(".filtered-list");let o=e.find(i+"__item.active").map(function(){return v(this).data("filter")}).get();e=t.find(".reviews__item");if(e.hide().removeClass("left right"),0<o.length){let i=[],t=(e.each(function(){var e=v(this);let t=e.data("filter").split(" ");o.some(e=>t.includes(e))&&i.push(e)}),0);i.forEach(e=>{e.show().addClass(t%2==0?"left":"right"),t++})}else e.show();e=t.find(".reviews__item:visible");e.removeClass("margin-top-reset"),e.each(function(e){e<=0&&v(this).addClass("margin-top-reset")})}),v(document).on("click touch",".mini-card__option--link",function(e){e.preventDefault();var t,i,e=v(this).data("mini-card-option");e&&(i=(t=v(this).closest(".mini-card")).find(".mini-card-img"),t.find(".mini-card__option--link").removeClass("active"),v(this).addClass("active"),i.removeClass("active").hide(),t.find(".mini-card-img.img-"+e).addClass("active").fadeIn())}),v(document).on("click touch",".product-card__option--link",function(e){e.preventDefault();var t,i,e=v(this).data("product-card-option");e&&(t=v(this).data("product-card-title"))&&((i=v(this).closest(".product-card__option")).find(".product-card__option--title").text(t),i.find(".product-card__option--link").removeClass("active"),v(this).addClass("active"),console.log(e))}),v(window).on("load",function(){e=(e=[".dropdown-language",".dropdown-filter",".dropdown-category",".dropdown-sort"]).join(","),v(document).on("click touch",e,function(e){var t=v(this).next(i);if(!t.hasClass("active"))return v(i).removeClass("active"),t.addClass("active"),e.stopPropagation(),!1;t.removeClass("active")}),v(document).on("click touch",function(e){v(e.target).closest(i).length||v(i).removeClass("active")});{var e=".catalog-view a";let i=v(e);i.on("click",function(e){e.preventDefault();var e=v(this).data("view"),t=(i.removeClass("active"),v(this).addClass("active"),v(".view__wrapper"));t.removeClass(function(e,t){return(t.match(/view__wrapper--\S+/g)||[]).join(" ")}),e&&"default"!==e&&t.addClass("view__wrapper--"+e)})}}),o(".product-card__buttons .add_to_cart"),o(".banner-cart__up-sell .add_to_cart"),v(window).on("load scroll",function(){v(window).scrollTop(),v(".js-wait-animation").each(function(){v(this).isInViewport()?v(this).addClass("animate").removeClass("out-of-viewport"):v(this).addClass("out-of-viewport")})}),v(function(){var i,o,e;App.isMobileDevice()&&v(".menu-dropdown > .menu-dropdown__open").on("click",function(){var e=v(this),t=e.next(".menu-dropdown__item"),e=e.find("svg");t.slideToggle(300),e.toggleClass("rotated")}),v(".video-block__source").each(function(){{var i=this;let e=(i=v(i)).find("video"),t=(i=i.find(".video-block__button--mp4")).find(".ico-video-button > use");i.on("click",function(){v(".video-block__source video").each(function(){this!==e[0]&&(this.pause(),v(this).closest(".video-block__source").find(".ico-video-button > use").attr("href","assets/img/sprite.svg#ico-play"))}),e[0].paused?(e[0].play(),e.hasClass("cover")&&e.css("object-fit","cover"),t.attr("href","assets/img/sprite.svg#ico-pause")):(e[0].pause(),t.attr("href","assets/img/sprite.svg#ico-play"))})}});{let t=App.$modelsMenu.find("a");function a(e){var t=App.$modelsMenu.outerWidth(),i=App.$modelsMenu.scrollLeft(),o=e.offset().left-App.$modelsMenu.offset().left,e=e.outerWidth();App.$modelsMenu.animate({scrollLeft:i+o-t/2+e/2},300)}t.on("click touch",function(){var e=v(this);t.removeClass("active"),e.addClass("active"),a(e)});var s=t;s.length&&a(s)}{var n=".thank-page__button",p=".thank-page__play--text",c=".thank-page__item";s=v(s=".thank-page__video");let t=v(c),i=s.find("video"),o=s.find(n),a=s.find(p);function r(e,t,i){e.on(t,function(){o.css("opacity",i)})}i.on("pause",function(){o.show(),o.css("opacity","1"),t.css("position","relative"),i.removeAttr("style")}),o.on("click",function(e){i[0].paused?(i[0].play(),o.css("opacity",".5"),a.hide(),t.css("position","static"),i.css({position:"absolute",top:0,left:0})):(i[0].pause(),o.css("opacity","1"),a.show(),t.css("position","relative"),i.removeAttr("style"))}),i.on("click",function(){this.played&&(this.pause(),o.css("opacity","1"),a.show(),t.css("position","relative"),i.removeAttr("style"))}),r(o,"mouseenter","1"),r(s,"mouseleave","1"),r(o,"mouseleave",".5"),v(document).on("keyup",function(e){"Escape"!==e.key&&27!==e.keyCode||i[0].played&&(i[0].pause(),o.show(),a.show(),o.css("opacity","1"),t.css("position","relative"),i.removeAttr("style"))})}i=".accordion__content",o=".accordion__item",v(".accordion-open").on("click",function(e){e.preventDefault();var e=v(this).closest(o),t=e.find(i);e.hasClass("active")?(e.removeClass("active"),t.stop(!0,!0).slideUp()):(e.siblings().removeClass("active").find(i).slideUp(),e.addClass("active"),t.stop(!0,!0).slideDown())});{var t=120,l="fixed";let e=v(c=".section--reviews > .section__wrapper");v(window).on("scroll",function(){v(window).scrollTop()>=t?e.hasClass(l)||e.addClass(l):e.removeClass(l)})}n=".dialogs",(e="img")!==e&&"video"!==e?console.log('Invalid mediaType. Use "img" or "video".'):v(n).find(e).each(function(){"img"===e?(new Image).src=v(this).attr("src"):"video"===e&&this.load()}),App.$body.on("click touch",".choose-product",()=>{0<App.$modelsMenu.length&&App.scrollTopBody(App.$modelsMenu)}),0<App.$modelsMenu.length&&(App.$modelsMenu.find("a.active").attr("href")!==App.winLocHash&&"#choose-product"!==App.winLocHash||App.scrollTopBody(App.$modelsMenu))})})(jQuery);
//# sourceMappingURL=main.js.map
