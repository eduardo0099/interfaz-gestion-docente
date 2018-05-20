+function ($) {
    "use strict";
    $(function () {

        function addMsg($msg) {
            var $el = $('.nav-user'), $n = $('.count:first', $el), $v = parseInt($n.text());
            $('.count', $el).fadeOut().fadeIn().text($v + 1).removeClass('hide');
            $($msg).hide().prependTo($el.find('.list-group')).slideDown().css('display', 'block');
        }

        function notificaciones() {

            $.ajax({
                url: APP.url('notifica/list'),
                type: 'POST',
                success: function (response) {
                    if (response.success) {
                        var exist = $('.nav-user .count:first').text();
                        if (response.total > exist) {

                            $('.count:first', '.nav-user').text(0);
                            $('.nav-user').find('.list-group').html('');

                            $.each(response.data, function (index, json) {

                                var html = $.templates("#templateNotificacion").render({
                                    titulo: json.titulo,
                                    fechaHora: moment(json.fecha, "YYYYMMDD hh:mm:ss").fromNow(),
                                    texto: json.texto,
                                    url: json.id
                                });

                                addMsg(html);
                            });
                        }
                    }
                }
            });
        }

        notificaciones();

        setInterval(function() {
            notificaciones();
        }, 40000);


        $('body').delegate('.notificaLink', 'click', function () {
            var link = $(this).attr('rel');
            $(location).attr("href", APP.url('/notifica/' + link + '/check'));
        });

    });

}(window.jQuery);
