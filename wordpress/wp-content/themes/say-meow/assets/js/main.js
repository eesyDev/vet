(d=>{d.fn.percentOfViewport=function(){var t=d(window).height(),i=d(this).offset().top,e=i+d(this).height(),o=d(window).scrollTop(),a=o+t;return{ELtop_to_VPtop:(i-o)/t*100,ELbottom_to_VPtop:(e-o)/t*100,ELtop_to_VPbottom:(a-i)/t*100,ELbottom_to_VPbottom:(a-e)/t*100,viewportHeight:t}},d.fn.isInViewport=function(){var t=d(this).percentOfViewport();return t.ELtop_to_VPtop<100&&0<t.ELbottom_to_VPtop},d(".sandwich").on("click touch",function(){d(this).toggleClass("active"),d(".header__navigation").slideToggle();var t=d(".header__wrapper--navigation");"40px"===t.css("padding-bottom")?t.removeAttr("style"):t.css({"padding-bottom":"40px"})}),d(".inp-phone").mask("+38 (999) 999-99-99"),d("a.smooth, nav > ul li a").on("click touch",function(){var t=d(this).attr("href"),t=(window.location.pathname,d(t).offset().top-d("header").outerHeight()-49);return d("html, body").animate({scrollTop:t},1e3),!1}),d(".container").on("click touch",".js-play-video",function(){var t=d(this).siblings("video")[0];t.play(),t.controls="controls",d(this).hide()}),d("body").on("click touch",".open-dialog, .open-popup, .open-form, .open-modal",function(t){t.preventDefault();var t=d(this).attr("href"),i=d(".dialogs");let e=i.find(t);var o=i.find(".flex-popup"),a=t.slice(1);return"policy"!==a&&localStorage.setItem("popup",a),"list"===a&&(d("body").css({"overflow-y":"hidden"}),i.css({"overflow-y":"hidden"})),"work-offer"!==a&&"details"!==a||(d("body").css({"overflow-y":"hidden"}),i.css({"overflow-y":"auto"})),i.find(".popup").removeClass("active").hide(),e.length?(i.find(".popup").removeClass("active").hide(),e.show(),i.show(),o.addClass("popup--"+a),i.animate({opacity:1},300,()=>{e.addClass("active"),d("body").css({"overflow-y":"hidden"})})):console.log(`Попап с ID ${t} не найден.`),!1}),d(".dialogs").on("click touch",".close, .close-bg",function(){let t=d(".dialogs"),i=t.find(".flex-popup");var e,o,a=t.find(".popup.active").attr("id");let s=()=>{d("body").css({"overflow-y":"auto"})},n=()=>{i.removeClass(function(t,i){return(i.match(/popup--\S+/g)||[]).join(" ")})},c=i.find(".popup.active");"cart"===a?c.animate({right:"-100%",opacity:0},600,function(){t.animate({opacity:0},300,function(){t.find(".popup").removeClass("active").hide(),c.removeAttr("style"),t.hide(),t.find(".thanks-popup").hide(),n()}),s()}):"policy"===a?(c.removeClass("active").hide(),e=localStorage.getItem("popup"),(o=d(".dialogs #"+e)).length?(o.addClass("active").show(),t.show()):console.log("Попап с ID "+e+" не найден.")):"details"===a?c.animate({top:"100%",opacity:0},600,function(){t.animate({opacity:0},400,function(){t.find(".popup").removeClass("active").hide(),c.removeAttr("style"),t.hide(),n()}),s()}):"list"===a?c.animate({bottom:"-100%",opacity:0},600,function(){t.animate({opacity:0},300,function(){t.find(".popup").removeClass("active").hide(),c.removeAttr("style"),t.hide(),n()}),s()}):(c.removeClass("active").hide(),t.animate({opacity:0},300,function(){t.hide(),t.find(".thanks-popup").hide(),n(),s()}))}),d(document).on("keyup",function(t){"Escape"!==t.key&&27!==t.keyCode||d(".dialogs .popup.active .close").trigger("click")});let o=".dropdown";d(o).on("click touch",o+"__item",function(t){d(this).toggleClass("active").trigger("filtered"),t.stopPropagation()}),d(o).on("filtered",o+"__item",function(){var t=d(this).closest(o),i=t.closest("section").find(".filtered-list"),t=t.find(o+"__item.active").map(function(){return d(this).data("filter")}).get();let e=i.find(o+"__item");if(e.hide().removeClass("left right"),0<t.length){let i=0;t.forEach(t=>{e.filter(`[data-filter*="${t}"]`).each(function(){d(this).show().addClass(i%2==0?"left":"right"),i++})})}else e.show()}),d(document).on("click touch",".mini-card__option--link",function(t){t.preventDefault();var i,e,t=d(this).data("mini-card-option");t&&(e=(i=d(this).closest(".mini-card")).find(".mini-card-img"),i.find(".mini-card__option--link").removeClass("active"),d(this).addClass("active"),e.removeClass("active").hide(),i.find(".mini-card-img.img-"+t).addClass("active").fadeIn())}),d(document).on("click touch",".product-card__option--link",function(t){t.preventDefault();var i,e,t=d(this).data("product-card-option");t&&(i=d(this).data("product-card-title"))&&((e=d(this).closest(".product-card__option")).find(".product-card__option--title").text(i),e.find(".product-card__option--link").removeClass("active"),d(this).addClass("active"),console.log(t))}),d(window).on("load",function(){t=(t=[".dropdown-language",".dropdown-filter",".dropdown-category"]).join(","),d(document).on("click touch",t,function(t){var i=d(this).next(o);if(!i.hasClass("active"))return d(o).removeClass("active"),i.addClass("active"),t.stopPropagation(),!1;i.removeClass("active")}),d(document).on("click touch",function(t){d(t.target).closest(o).length||d(o).removeClass("active")});{var t=".catalog-view a";let e=d(t);e.on("click",function(t){t.preventDefault();var t=d(this).data("view"),i=(e.removeClass("active"),d(this).addClass("active"),d(".view__wrapper"));i.removeClass(function(t,i){return(i.match(/view__wrapper--\S+/g)||[]).join(" ")}),t&&"default"!==t&&i.addClass("view__wrapper--"+t)})}}),d(window).on("load resize",function(){setTimeout(function(){d("body").find("img[data-src]").each(function(){var t,i=d(this).attr("data-src"),e=d(this).attr("data-srcset"),o=d(this).attr("class"),a=d(this).attr("alt"),s=d(this).attr("title");i&&(t=new Image,d(t).hide(),d(t).on("load",function(){d(this).fadeIn(400),setTimeout(function(){d(t).addClass("transition")},400)}),d(t).attr("srcset",e),d(t).attr("src",i),d(t).attr("alt",a),d(t).attr("title",s),d(t).addClass(o),d(this).replaceWith(t))})},150)}),d(window).on("load scroll",function(){d(window).scrollTop(),d(".js-wait-animation").each(function(){d(this).isInViewport()?d(this).addClass("animate").removeClass("out-of-viewport"):d(this).addClass("out-of-viewport")})});var t=new Swiper(".gallery__preview.swiper-container",{direction:"vertical",slidesPerView:"auto",spaceBetween:8});function i(t){d(t).on("click touch",function(){var e=d(this),o=e.data("up-sell"),a=d(".gallery__photo .swiper-wrapper .swiper-slide img").first();if(0===a.length)console.log("Изображение не найдено.");else{var s=d(".header__cart"),n=s.find(".ico-cart");let i=s.find(".header__cart--count");var s=i.find(".count"),c=parseInt(s.text())+1;if(o)c<=99&&s.text(c),o=o,l=d(".popup-cart__products form"),(p=d(".banner-cart")).find(".banner-cart__up-sell").last().show(),p.find(`#up-sell-${o}.banner-cart__up-sell`).hide(),(p={1:{id:1,img:"assets/img/content/popup-cart-banner-2x.jpg",title:"Мышка-игрушка Mr. Pickles",discount:"-30%",price:"₴ 90",price_discount:"₴ 125"},2:{id:2,img:"assets/img/content/main-card-about-2x.jpg",title:"Домик для кота Mr. Whiskers",discount:"-20%",price:"₴ 150",price_discount:"₴ 200"}})[o]?(p=`
            <div class="popup-cart__product popup-cart__up-sell">
                <div class="popup-cart__item">
                    <div class="popup-cart__item--photo">
                        <img src="${(p=p[o]).img}" alt="${p.title}">
                    </div>
                </div>
                <div class="popup-cart__item">
                    <div class="popup-cart__title">
                        <h4 class="body-s-reg">${p.title}</h4>
                    </div>
                    <div class="popup-cart__details">
                        <div class="popup-cart__calc">
                            <span class="tag tag--discount">${p.discount}</span>
                        </div>
                        <div class="popup-cart__price">
                            <s class="banner-cart__discount">${p.price_discount}</s>
                            <p class="body-s-sb">${p.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        `,0===(r=l.find(".popup-cart__product")).length?l.prepend(p):r.last().after(p),u(l)):console.log(`Товар с ID ${o} не найден.`);else{let t=a.clone().addClass("fly-image").appendTo("body");var r=e.offset(),p=r.left+e.outerWidth()/2,l=r.top+e.outerHeight()/2-3*e.outerHeight(),o=n.offset(),e=o.left+n.width()/2,o=o.top+n.height()/2,n=(t.css({top:l-a.height()/2,left:p-a.width()/2,width:a.width(),height:a.height(),position:"absolute",zIndex:1e3,pointerEvents:"none"}),n.width()/a.width()),a=(t.css({transition:"transform 1000ms ease-in-out, opacity 1000ms ease-in-out",transformOrigin:"center center",transform:`translate(${e-p}px, ${o-l}px) scale(${n})`,opacity:.3}),{1:{id:1,img:"assets/img/catalog/grace-pro-black-2x.png",title:"Кiгтеточка-лежанка Grace Pro Max",price:"₴ 1590",tag:"Для притулку"}});a[1]?(o=`
                    <div class="popup-cart__product">
                        <div class="popup-cart__item ">
                            <div class="popup-cart__item--photo">
                                <a href="/catalog.html" class="tag tag--gift">${(e=a[1]).tag}</a>
                                <img src="${e.img}" alt="${e.title}">
                            </div>
                        </div>
                        <div class="popup-cart__item">
                            <div class="popup-cart__title">
                                <h4 class="body-s-reg">${e.title}</h4>
                            </div>
                            <div class="popup-cart__details">
                                <div class="popup-cart__calc">
                                    <button class="minus"></button>
                                    <input type="text" id="quantity_${e.id}" name="quantity[]" name="cart[хешWoo][qty]" class="quantity body-s-sb" value="1" />
                                    <button class="plus"></button>
                                </div>
                                <div class="popup-cart__price">
                                    <p class="body-s-sb">${e.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `,(n=d(".popup-cart__products form")).prepend(o),u(n),(a=n.find(".popup-cart__product").first()).find(".popup-cart__calc .quantity").val(1),a.find(".popup-cart__calc").each(function(){var t=d(this);t.on("click touch",".minus",function(){var t=d(this).siblings(".quantity"),i=parseInt(t.val(),10);1<i&&t.val(i-1)}),t.on("click touch",".plus",function(){var t=d(this).siblings(".quantity"),i=parseInt(t.val(),10);t.val(i+1)}),t.on("input",".quantity",function(){var t=d(this).val();(!/^\d+$/.test(t)||parseInt(t,10)<1)&&d(this).val(1)})}),c<=99&&s.text(c),setTimeout(()=>{t.remove(),i.show()},1e3)):console.log("Товар с ID 1 не найден.")}}})}function u(t){3<t.find(".popup-cart__product").length&&(d(".popup-cart").css("margin-bottom","155px"),d(".banner-cart").css("margin","20px 0"),t.find(".popup-cart__totals.responsive").addClass("popup-cart__responsive"),t.find(".banner-cart__up-sell.responsive").addClass("banner-cart__responsive"))}new Swiper(".gallery__photo.swiper-container",{spaceBetween:0,thumbs:{swiper:t}}),new Swiper(".offers-card__slider.swiper-container",{slidesPerView:"auto",direction:"horizontal",width:960,centeredSlides:!0,spaceBetween:6,navigation:{nextEl:".offers-card__navigation--next",prevEl:".offers-card__navigation--prev"}}),i(".product-card__buttons .add_to_cart"),i(".banner-cart__up-sell .add_to_cart"),new Swiper(".reviews > .swiper-container",{slidesPerView:3,spaceBetween:30,pagination:{el:".reviews > .swiper-pagination-clickable",clickable:!0}}),d(function(){{var t=".thank-page__video",s=".thank-page__button",n=".thank-page__play--text",c=".thank-page__item";t=d(t);let i=d(c),e=t.find("video"),o=t.find(s),a=t.find(n);function r(t,i,e){t.on(i,function(){o.css("opacity",e)})}e.on("pause",function(){o.show(),o.css("opacity","1"),i.css("position","relative"),e.removeAttr("style")}),o.on("click",function(t){e[0].paused?(e[0].play(),o.css("opacity",".5"),a.hide(),i.css("position","static"),e.css({position:"absolute",top:0,left:0})):(e[0].pause(),o.css("opacity","1"),a.show(),i.css("position","relative"),e.removeAttr("style"))}),e.on("click",function(){this.played&&(this.pause(),o.css("opacity","1"),a.show(),i.css("position","relative"),e.removeAttr("style"))}),r(o,"mouseenter","1"),r(t,"mouseleave","1"),r(o,"mouseleave",".5"),d(document).on("keyup",function(t){"Escape"!==t.key&&27!==t.keyCode||e[0].played&&(e[0].pause(),o.show(),a.show(),o.css("opacity","1"),i.css("position","relative"),e.removeAttr("style"))})}var e,o;e=".accordion__content",o=".accordion__item",d(".accordion-open").on("click",function(t){t.preventDefault();var t=d(this).closest(o),i=t.find(e);t.hasClass("active")?(t.removeClass("active"),i.stop(!0,!0).slideUp()):(t.siblings().removeClass("active").find(e).slideUp(),t.addClass("active"),i.stop(!0,!0).slideDown())})})})(jQuery);
//# sourceMappingURL=main.js.map
