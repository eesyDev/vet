(l=>{l.fn.percentOfViewport=function(){var t=l(window).height(),i=l(this).offset().top,e=i+l(this).height(),o=l(window).scrollTop(),a=o+t;return{ELtop_to_VPtop:(i-o)/t*100,ELbottom_to_VPtop:(e-o)/t*100,ELtop_to_VPbottom:(a-i)/t*100,ELbottom_to_VPbottom:(a-e)/t*100,viewportHeight:t}},l.fn.isInViewport=function(){var t=l(this).percentOfViewport();return t.ELtop_to_VPtop<100&&0<t.ELbottom_to_VPtop},l(".sandwich").on("click touch",function(){l(this).toggleClass("active"),l(".header__navigation").slideToggle();var t=l(".header__wrapper--navigation");"40px"===t.css("padding-bottom")?t.removeAttr("style"):t.css({"padding-bottom":"40px"})}),l(".inp-phone").mask("+38 (999) 999-99-99"),l("a.smooth, nav > ul li a").on("click touch",function(){var t=l(this).attr("href"),t=(window.location.pathname,l(t).offset().top-l("header").outerHeight()-49);return l("html, body").animate({scrollTop:t},1e3),!1}),l(".container").on("click touch",".js-play-video",function(){var t=l(this).siblings("video")[0];t.play(),t.controls="controls",l(this).hide()}),l("body").on("click touch",".open-dialog, .open-popup, .open-form, .open-modal",function(t){t.preventDefault();var t=l(this).attr("href"),i=l(".dialogs");let e=i.find(t);var o=i.find(".flex-popup"),a=t.slice(1);return"policy"!==a&&localStorage.setItem("popup",a),i.find(".popup").removeClass("active").hide(),e.length?(i.find(".popup").removeClass("active").hide(),e.show(),i.show(),o.addClass("popup--"+a),i.animate({opacity:1},300,()=>{e.addClass("active"),l("body").css({"overflow-y":"hidden"})})):console.log(`Попап с ID ${t} не найден.`),!1}),l(".dialogs").on("click touch",".close, .close-bg",function(){let i=l(".dialogs"),e=i.find(".flex-popup");var t,o=i.find(".popup.active").attr("id");let a=()=>{l("body").css({"overflow-y":"auto"})},s=()=>{e.removeClass(function(t,i){return(i.match(/popup--\S+/g)||[]).join(" ")})};if("cart"===o){let t=e.find(".popup.active");t.animate({right:"-100%",opacity:0},600,function(){i.animate({opacity:0},300,function(){i.find(".popup").removeClass("active").hide(),t.removeAttr("style"),i.hide(),i.find(".thanks-popup").hide(),s()}),a()})}else"policy"===o?(i.find(".popup").removeClass("active").hide(),o=localStorage.getItem("popup"),(t=l(".dialogs #"+o)).length?(t.addClass("active").show(),i.show()):console.error("Попап с ID "+o+" не найден.")):(i.find(".popup").removeClass("active").hide(),i.animate({opacity:0},300,function(){i.hide(),i.find(".thanks-popup").hide(),s()}),a())}),l(document).on("keyup",function(t){"Escape"!==t.key&&27!==t.keyCode||l(".dialogs .popup.active .close").trigger("click")});let a=".dropdown";l(a).on("click touch",a+"__item",function(t){l(this).toggleClass("active").trigger("filtered"),t.stopPropagation()}),l(a).on("filtered",a+"__item",function(){var t=l(this).closest(a),i=t.closest("section").find(".filtered-list"),t=t.find(a+"__item.active").map(function(){return l(this).data("filter")}).get();let e=i.find(a+"__item");if(e.hide().removeClass("left right"),0<t.length){let i=0;t.forEach(t=>{e.filter(`[data-filter*="${t}"]`).each(function(){l(this).show().addClass(i%2==0?"left":"right"),i++})})}else e.show()}),l(document).on("click touch",".mini-card__option--link",function(t){t.preventDefault();var i,e,t=l(this).data("mini-card-option");t&&(e=(i=l(this).closest(".mini-card")).find(".mini-card-img"),i.find(".mini-card__option--link").removeClass("active"),l(this).addClass("active"),e.removeClass("active").hide(),i.find(".mini-card-img.img-"+t).addClass("active").fadeIn())}),l(document).on("click touch",".product-card__option--link",function(t){t.preventDefault();var i,e,t=l(this).data("product-card-option");t&&(i=l(this).data("product-card-title"))&&((e=l(this).closest(".product-card__option")).find(".product-card__option--title").text(i),e.find(".product-card__option--link").removeClass("active"),l(this).addClass("active"),console.log(t))}),l(window).on("load",function(){var t,i,e;t=l(".product-card__item:first-child"),o=l(".product-card__photo-gallery"),i=l(".product-card__description"),e=o.outerHeight(),i=i.outerHeight(),e<=i&&(o.css("position","sticky"),t.css("height",i+"px")),e=(e=[".dropdown-language",".dropdown-filter",".dropdown-category"]).join(","),l(document).on("click touch",e,function(t){var i=l(this).next(a);if(!i.hasClass("active"))return l(a).removeClass("active"),i.addClass("active"),t.stopPropagation(),!1;i.removeClass("active")}),l(document).on("click touch",function(t){l(t.target).closest(a).length||l(a).removeClass("active")});{var o=".catalog-view a";let e=l(o);e.on("click",function(t){t.preventDefault();var t=l(this).data("view"),i=(e.removeClass("active"),l(this).addClass("active"),l(".view__wrapper"));i.removeClass(function(t,i){return(i.match(/view__wrapper--\S+/g)||[]).join(" ")}),t&&"default"!==t&&i.addClass("view__wrapper--"+t)})}}),l(window).on("load resize",function(){setTimeout(function(){l("body").find("img[data-src]").each(function(){var t,i=l(this).attr("data-src"),e=l(this).attr("data-srcset"),o=l(this).attr("class"),a=l(this).attr("alt"),s=l(this).attr("title");i&&(t=new Image,l(t).hide(),l(t).on("load",function(){l(this).fadeIn(400),setTimeout(function(){l(t).addClass("transition")},400)}),l(t).attr("srcset",e),l(t).attr("src",i),l(t).attr("alt",a),l(t).attr("title",s),l(t).addClass(o),l(this).replaceWith(t))})},150)}),l(window).on("load scroll",function(){l(window).scrollTop(),l(".js-wait-animation").each(function(){l(this).isInViewport()?l(this).addClass("animate").removeClass("out-of-viewport"):l(this).addClass("out-of-viewport")})});var t=new Swiper(".gallery__preview.swiper-container",{direction:"vertical",slidesPerView:"auto",spaceBetween:8});function i(t){l(t).on("click touch",function(){var e=l(this),o=e.data("up-sell"),a=l(".gallery__photo .swiper-wrapper .swiper-slide img").first();if(0===a.length)console.log("Изображение не найдено.");else{var s=l(".header__cart"),n=s.find(".ico-cart");let i=s.find(".header__cart--count");var s=i.find(".count"),c=parseInt(s.text())+1;if(o)c<=99&&s.text(c),o=o,d=l(".popup-cart__products form"),(p=l(".banner-cart")).find(".banner-cart__up-sell").last().show(),p.find(`#up-sell-${o}.banner-cart__up-sell`).hide(),(p={1:{id:1,img:"assets/img/content/popup-cart-banner-2x.jpg",title:"Мышка-игрушка Mr. Pickles",discount:"-30%",price:"₴ 90",price_discount:"₴ 125"},2:{id:2,img:"assets/img/content/main-card-about-2x.jpg",title:"Домик для кота Mr. Whiskers",discount:"-20%",price:"₴ 150",price_discount:"₴ 200"}})[o]?(p=`
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
        `,0===(r=d.find(".popup-cart__product")).length?d.prepend(p):r.last().after(p),u(d)):console.log(`Товар с ID ${o} не найден.`);else{let t=a.clone().addClass("fly-image").appendTo("body");var r=e.offset(),p=r.left+e.outerWidth()/2,d=r.top+e.outerHeight()/2-3*e.outerHeight(),o=n.offset(),e=o.left+n.width()/2,o=o.top+n.height()/2,n=(t.css({top:d-a.height()/2,left:p-a.width()/2,width:a.width(),height:a.height(),position:"absolute",zIndex:1e3,pointerEvents:"none"}),n.width()/a.width()),a=(t.css({transition:"transform 1000ms ease-in-out, opacity 1000ms ease-in-out",transformOrigin:"center center",transform:`translate(${e-p}px, ${o-d}px) scale(${n})`,opacity:.3}),{1:{id:1,img:"assets/img/catalog/grace-pro-black-2x.png",title:"Кiгтеточка-лежанка Grace Pro Max",price:"₴ 1590"}});a[1]?(o=`
                    <div class="popup-cart__product">
                        <div class="popup-cart__item ">
                            <div class="popup-cart__item--photo">
                                <img src="${(e=a[1]).img}" alt="${e.title}">
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
                `,(n=l(".popup-cart__products form")).prepend(o),u(n),(a=n.find(".popup-cart__product").first()).find(".popup-cart__calc .quantity").val(1),a.find(".popup-cart__calc").each(function(){var t=l(this);t.on("click touch",".minus",function(){var t=l(this).siblings(".quantity"),i=parseInt(t.val(),10);1<i&&t.val(i-1)}),t.on("click touch",".plus",function(){var t=l(this).siblings(".quantity"),i=parseInt(t.val(),10);t.val(i+1)}),t.on("input",".quantity",function(){var t=l(this).val();(!/^\d+$/.test(t)||parseInt(t,10)<1)&&l(this).val(1)})}),c<=99&&s.text(c),setTimeout(()=>{t.remove(),i.show()},1e3)):console.log("Товар с ID 1 не найден.")}}})}function u(t){3<t.find(".popup-cart__product").length&&(l(".popup-cart").css("margin-bottom","155px"),l(".banner-cart").css("margin","20px 0"),t.find(".popup-cart__totals.responsive").addClass("popup-cart__responsive"),t.find(".banner-cart__up-sell.responsive").addClass("banner-cart__responsive"))}new Swiper(".gallery__photo.swiper-container",{spaceBetween:0,thumbs:{swiper:t}}),new Swiper(".offers-card__slider.swiper-container",{slidesPerView:"auto",direction:"horizontal",width:960,centeredSlides:!0,spaceBetween:6,navigation:{nextEl:".offers-card__navigation--next",prevEl:".offers-card__navigation--prev"}}),i(".product-card__buttons .add_to_cart"),i(".banner-cart__up-sell .add_to_cart")})(jQuery);
//# sourceMappingURL=main.js.map
