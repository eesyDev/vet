(t=>{t("form").on("submit",function(){let e=t(this),r=0;e.find(".error").remove(),e.find(".required").removeClass("required");var i=e.find('input[name="action"]').val();return e.find("input[data-required], textarea[data-required], select[data-required]").each(function(){var e=t(this).attr("data-error")||"This field is required";t(this).is(":checkbox")?t(this).is(":checked")||(t(this).closest(".inp-wrp").append(`<div class="error">${e}</div>`),t(this).addClass("required")):t(this).val().trim()||(t(this).closest(".inp-wrp").append(`<div class="error">${e}</div>`),t(this).addClass("required"))}),e.find("input.inp-email").each(function(){var e=t(this);r=e.val().trim()&&!/^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i.test(e.val())?(e.closest(".inp-wrp").append('<div class="error">Invalid email address</div>'),e.addClass("required"),0):1}),e.find(".required").length||0===r?"call"===i&&"consult"===i&&"work_offer"===i&&"order_products_one_click"===i||(i=e.find(".required").first()).length&&t("html, body").animate({scrollTop:i.offset().top-96},600):t.ajax({type:"POST",url:"/mailer/mail.php",data:e.serialize(),cache:!1,success:function(){t("#thanks-popup").show(),e[0].reset()},error:function(){alert("Error occurred while submitting the form.")}}),!1}),t("input, textarea, select").on("click focus change",function(){t(this).removeClass("required"),t(this).closest(".inp-wrp").find(".error").remove()}),t('input[type="checkbox"][data-required]').on("change",function(){t(this).is(":checked")&&(t(this).removeClass("required"),t(this).closest("label").find(".error").remove())}),t("#dont-call-back").on("change",function(){var e=t(this).closest(".order-form").find(".order-form__dont-call-back");t(this).is(":checked")?e.stop(!0,!0).slideDown(300):e.stop(!0,!0).slideUp(900)})})(jQuery);
//# sourceMappingURL=form.js.map
