$(function(){$.fn.percentOfViewport=function(){var t=$(window).height(),e=$(this).offset().top,o=e+$(this).height(),i=$(window).scrollTop(),a=i+t;return{ELtop_to_VPtop:(e-i)/t*100,ELbottom_to_VPtop:(o-i)/t*100,ELtop_to_VPbottom:(a-e)/t*100,ELbottom_to_VPbottom:(a-o)/t*100,viewportHeight:t}},$.fn.isInViewport=function(){var t=$(this).percentOfViewport();return t.ELtop_to_VPtop<100&&0<t.ELbottom_to_VPtop},$(".sandwich").on("click touch",function(){$(this).toggleClass("active"),$(".header__navigation").slideToggle();var t=$(".header__wrapper--navigation");"40px"===t.css("padding-bottom")?t.removeAttr("style"):t.css({"padding-bottom":"40px"})}),$(".inp-phone").mask("+38 (999) 999-99-99"),$("a.smooth, nav > ul li a").on("click touch",function(){var t=$(this).attr("href"),t=(window.location.pathname,$(t).offset().top-$("header").outerHeight()-49);return $("html, body").animate({scrollTop:t},1e3),!1}),$(".container").on("click touch",".js-play-video",function(){var t=$(this).siblings("video")[0];t.play(),t.controls="controls",$(this).hide()}),$("body").on("click touch",".open-dialog, .open-popup, .open-form, .open-modal",function(t){t.preventDefault();var t=$(this).attr("href"),e=$(".dialogs");let o=e.find(t);var i=e.find(".flex-popup"),a=t.replace("#","popup--");return o.length?("popup--policy"!==a&&e.find(".popup").removeClass("active").hide(),o.show(),e.show(),i.addClass(a),e.animate({opacity:1},300,()=>{o.addClass("active"),$("body").css({"overflow-y":"hidden"})})):console.log(`Попап с ID ${t} не найден.`),!1}),$(".dialogs").on("click touch",".close, .close-bg",function(){let e=$(".dialogs"),o=e.find(".flex-popup");var t=e.find(".popup.active").attr("id");let i=()=>{$("body").css({"overflow-y":"auto"})},a=()=>{o.removeClass(function(t,e){return(e.match(/popup--\S+/g)||[]).join(" ")})};if("cart"===t){let t=o.find(".popup.active");t.animate({right:"-100%",opacity:0},600,function(){e.animate({opacity:0},300,function(){e.find(".popup").removeClass("active").hide(),t.removeAttr("style"),e.hide(),e.find(".thanks-popup").hide(),a()}),i()})}else"policy"===t?e.find(".popup--policy").hide():(e.find(".popup").removeClass("active").hide(),e.animate({opacity:0},300,function(){e.hide(),e.find(".thanks-popup").hide(),a()})),i()}),$(document).on("keyup",function(t){"Escape"!==t.key&&27!==t.keyCode||$(".dialogs .popup.active .close").trigger("click")});let a=".dropdown";$(a).on("click touch",a+"__item",function(t){$(this).toggleClass("active").trigger("filtered"),t.stopPropagation()}),$(a).on("filtered",a+"__item",function(){var t=$(this).closest(a),e=t.closest("section").find(".filtered-list"),t=t.find(a+"__item.active").map(function(){return $(this).data("filter")}).get();let o=e.find(a+"__item");if(o.hide().removeClass("left right"),0<t.length){let e=0;t.forEach(t=>{o.filter(`[data-filter*="${t}"]`).each(function(){$(this).show().addClass(e%2==0?"left":"right"),e++})})}else o.show()}),$(document).on("click touch",".mini-card__option--link",function(t){t.preventDefault();var e,o,t=$(this).data("mini-card-option");t&&(o=(e=$(this).closest(".mini-card")).find(".mini-card-img"),e.find(".mini-card__option--link").removeClass("active"),$(this).addClass("active"),o.removeClass("active").hide(),e.find(".mini-card-img.img-"+t).addClass("active").fadeIn())}),$(document).on("click touch",".product-card__option--link",function(t){t.preventDefault();var e,o,t=$(this).data("product-card-option");t&&(e=$(this).data("product-card-title"))&&((o=$(this).closest(".product-card__option")).find(".product-card__option--title").text(e),o.find(".product-card__option--link").removeClass("active"),$(this).addClass("active"),console.log(t))}),$(window).on("load",function(){var t,e,o;t=$(".product-card__item:first-child"),i=$(".product-card__photo-gallery"),e=$(".product-card__description"),o=i.outerHeight(),e=e.outerHeight(),o<=e&&(i.css("position","sticky"),t.css("height",e+"px")),o=(o=[".dropdown-language",".dropdown-filter",".dropdown-category"]).join(","),$(document).on("click touch",o,function(t){var e=$(this).next(a);if(!e.hasClass("active"))return $(a).removeClass("active"),e.addClass("active"),t.stopPropagation(),!1;e.removeClass("active")}),$(document).on("click touch",function(t){$(t.target).closest(a).length||$(a).removeClass("active")});{var i=".catalog-view a";let o=$(i);o.on("click",function(t){t.preventDefault();var t=$(this).data("view"),e=(o.removeClass("active"),$(this).addClass("active"),$(".view__wrapper"));e.removeClass(function(t,e){return(e.match(/view__wrapper--\S+/g)||[]).join(" ")}),t&&"default"!==t&&e.addClass("view__wrapper--"+t)})}}),$(window).on("load resize",function(){setTimeout(function(){$("body").find("img[data-src]").each(function(){var t,e=$(this).attr("data-src"),o=$(this).attr("data-srcset"),i=$(this).attr("class"),a=$(this).attr("alt"),n=$(this).attr("title");e&&(t=new Image,$(t).hide(),$(t).on("load",function(){$(this).fadeIn(400),setTimeout(function(){$(t).addClass("transition")},400)}),$(t).attr("srcset",o),$(t).attr("src",e),$(t).attr("alt",a),$(t).attr("title",n),$(t).addClass(i),$(this).replaceWith(t))})},150)}),$(window).on("load scroll",function(){$(window).scrollTop(),$(".js-wait-animation").each(function(){$(this).isInViewport()?$(this).addClass("animate").removeClass("out-of-viewport"):$(this).addClass("out-of-viewport")})});var t=new Swiper(".gallery__preview.swiper-container",{direction:"vertical",slidesPerView:"auto",spaceBetween:8});new Swiper(".gallery__photo.swiper-container",{spaceBetween:0,thumbs:{swiper:t}}),new Swiper(".offers-card__slider.swiper-container",{slidesPerView:"auto",direction:"horizontal",width:960,centeredSlides:!0,spaceBetween:6,navigation:{nextEl:".offers-card__navigation--next",prevEl:".offers-card__navigation--prev"}});$(".product-card__buttons .add_to_cart").on("click touch",function(){var e=$(this),o=$(".gallery__photo .swiper-wrapper .swiper-slide:first-child img").first();if(0===o.length)console.log("Изображение не найдено.");else{var i=$(".header__cart .ico-cart"),a=$(".header__cart .header__cart--count .count"),n=parseInt(a.text())+1;let t=o.clone().addClass("fly-image").appendTo("body");var r=e.offset(),s=r.left+e.outerWidth()/2,r=r.top+e.outerHeight()/2-3*e.outerHeight(),e=i.offset(),c=e.left+i.width()/2,e=e.top+i.height()/2,i=(t.css({top:r-o.height()/2,left:s-o.width()/2,width:o.width(),height:o.height(),position:"absolute",zIndex:1e3,pointerEvents:"none"}),i.width()/o.width());t.css({transition:"transform 1000ms ease-in-out, opacity 1000ms ease-in-out",transformOrigin:"center center",transform:`translate(${c-s}px, ${e-r}px) scale(${i})`,opacity:.3}),n<=99&&a.text(n),setTimeout(()=>{t.remove()},1e3),$(".popup-cart__products form:first-child .popup-cart__product").first().clone().prependTo(".popup-cart__products form")}})});
//# sourceMappingURL=main.js.map
