(function ($) {
    $("form").on('submit', function () {

        let form = $(this),
            emailApprove = 0;

        // Удаляем предыдущие ошибки
        form.find('.error').remove();
        form.find('.required').removeClass('required');

        let actionValue = form.find('input[name="action"]').val();

        // Проверка полей
        form.find('input[data-required], textarea[data-required], select[data-required]').each(function () {
            let errorText = $(this).attr('data-error') || 'This field is required';

            if ($(this).is(':checkbox')) {
                // Проверка чек-боксов
                if (!$(this).is(':checked')) {
                    $(this).closest('.inp-wrp').append(`<div class="error">${errorText}</div>`);
                    $(this).addClass('required');
                }
            } else {
                // Проверка текстовых полей и textarea
                if (!$(this).val().trim()) {
                    $(this).closest('.inp-wrp').append(`<div class="error">${errorText}</div>`);
                    $(this).addClass('required');
                }
            }

        });

        // Проверка email (если присутствует)
        form.find('input.inp-email').each(function () {
            let emailInput = $(this),
                pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
            if (emailInput.val().trim() && !pattern.test(emailInput.val())) {
                emailInput.closest('.inp-wrp').append(`<div class="error">Invalid email address</div>`);
                emailInput.addClass('required');
                emailApprove = 0;
            } else {
                emailApprove = 1;
            }
        });

        // Если есть ошибки, отменяем отправку
        if (form.find('.required').length || emailApprove === 0) {

            // Не скролить, если popup form окна
            if (
                actionValue !== 'call' &&                     // Popup call
                actionValue !== 'consult' &&                  // Popup consultation
                actionValue !== 'work_offer' &&               // Popup work-offer
                actionValue !== 'order_products_one_click'    // Замовлення в один клік
            ) {
                const $firstError = form.find('.required').first();
                if ($firstError.length) {
                    $('html, body').animate({
                        scrollTop: $firstError.offset().top - 96 // 48px header + 24px отступ до поля
                    }, 600);
                }
            }
            return false;
        }

        // Ваш AJAX-запрос
        $.ajax({
            type: "POST",
            url: "/mailer/mail.php",
            data: form.serialize(),
            cache: false,
            success: function () {
                $('#thanks-popup').show();
                form[0].reset(); // Сбрасываем форму
            },
            error: function () {
                alert('Error occurred while submitting the form.');
            }
        });

        return false; // Предотвращаем стандартную отправку формы
    });

    // Удаление ошибок при фокусе/изменении
    $('input, textarea, select').on('click focus change', function () {
        $(this).removeClass('required');
        $(this).closest('.inp-wrp').find('.error').remove();
    });

    // Удаление ошибки для чекбокса при изменении
    $('input[type="checkbox"][data-required]').on('change', function () {
        if ($(this).is(':checked')) {
            $(this).removeClass('required');
            $(this).closest('label').find('.error').remove();
        }
    });

    // Не передзвонювати мені для підтвердження замовлення
    $('#dont-call-back').on('change', function () {
        const $dontCallBackBlock = $(this).closest('.order-form').find('.order-form__dont-call-back');
        if ($(this).is(':checked')) {
            $dontCallBackBlock.stop(true, true).slideDown(300);
        } else {
            $dontCallBackBlock.stop(true, true).slideUp(900);
        }
    });

})(jQuery);