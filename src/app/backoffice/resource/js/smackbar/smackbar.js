if (window._) {
    _(init)
} else {
    init()
}

function init() {
    $.smackbar = function (obj) {
        obj = obj || {};
        obj.timeout = obj.timeout || 3000;

        if (!obj.message) {
            throw new Error('no message specified')
        }

        var $smackbar = $('<div/>');
        $smackbar.addClass('smackbar paToast');

        var icon = '<path d="M12,1C5.9,1,1,5.9,1,12s4.9,11,11,11s11-4.9,11-11S18.1,1,12,1z M18.5,9.8l-6.8,6.8c0,0,0,0,0,0c0,0,0,0,0,0 c-0.4,0.4-1.1,0.4-1.6,0l-3.8-3.8c-0.4-0.4-0.4-1.1,0-1.6c0.4-0.4,1.1-0.4,1.6,0l3,3l6-6c0.4-0.4,1.1-0.4,1.6,0 C18.9,8.6,18.9,9.3,18.5,9.8z"></path>';
        if (obj.type === "warning") {
            $smackbar.addClass('paToast paToast--warning');
            icon = '<path d="M22.2,19.2c-0.5-0.8-0.9-1.6-1.4-2.4c-0.7-1.2-1.3-2.4-2-3.6c-0.3-0.5-0.6-1.1-0.9-1.6c-0.7-1.2-1.3-2.4-2-3.6 c-0.3-0.6-0.6-1.1-0.9-1.7c-0.6-0.9-1.1-1.9-1.6-2.8c-0.3-0.5-0.7-0.8-1.2-0.8c-0.6,0-1,0.2-1.3,0.7c-0.3,0.5-0.5,0.9-0.8,1.4 C9.7,5.2,9.4,5.8,9.1,6.3c-0.7,1.2-1.3,2.4-2,3.6c-0.3,0.6-0.6,1.1-0.9,1.7c-0.7,1.2-1.3,2.4-2,3.6c-0.3,0.6-0.6,1.1-0.9,1.7 c-0.5,0.8-0.9,1.6-1.3,2.4c-0.2,0.4-0.3,0.9,0,1.3c0.3,0.5,0.7,0.7,1.3,0.7c3,0,6,0,9,0c2.2,0,4.5,0,6.7,0c0.8,0,1.6,0,2.4,0 c0.9,0,1.4-0.6,1.4-1.4C22.5,19.7,22.4,19.4,22.2,19.2z M12,18.3c-0.5,0-0.9-0.4-0.9-0.9c0-0.5,0.4-0.9,0.9-0.9s0.9,0.4,0.9,0.9 C12.9,17.9,12.5,18.3,12,18.3z M12.9,14.4c0,0.5-0.4,0.9-0.9,0.9s-0.9-0.4-0.9-0.9V9.9c0-0.5,0.4-0.9,0.9-0.9s0.9,0.4,0.9,0.9V14.4z "></path>';
        } else if (obj.type === "error") {
            $smackbar.addClass('paToast--error');
            icon = '<path d="M12,1C5.9,1,1,5.9,1,12s4.9,11,11,11s11-4.9,11-11S18.1,1,12,1z M12,18.7c-0.7,0-1.3-0.6-1.3-1.3s0.6-1.3,1.3-1.3 s1.3,0.6,1.3,1.3S12.7,18.7,12,18.7z M13.3,13.8c0,0.7-0.6,1.3-1.3,1.3s-1.3-0.6-1.3-1.3V6.6c0-0.7,0.6-1.3,1.3-1.3 s1.3,0.6,1.3,1.3V13.8z"></path>';
        } else if (obj.type === "info") {
            $smackbar.addClass('paToast--info');
            icon = '<path d="M12,1C5.9,1,1,5.9,1,12s4.9,11,11,11s11-4.9,11-11S18.1,1,12,1z M12,5.3c0.7,0,1.3,0.6,1.3,1.3S12.7,7.9,12,7.9 s-1.3-0.6-1.3-1.3S11.3,5.3,12,5.3z M10.7,10.2c0-0.7,0.6-1.3,1.3-1.3s1.3,0.6,1.3,1.3v7.2c0,0.7-0.6,1.3-1.3,1.3s-1.3-0.6-1.3-1.3 V10.2z"></path>';
        }

        function close() {
            $smackbar.removeClass('smackbar--shown');
            setTimeout(function () {
                $smackbar.remove()
            }, 1100);
            if (obj.onclose) obj.onclose()
        }

        $smackbar.html(
            '<div class="paToast__inbox">\n' +
            '    <svg view-box="0 0 24 24" class="paToast__icon">\n' + icon +
            '    </svg>\n' +
            '    <p class="paToast__msg">'+obj.message+'</p>\n' +
            '</div>'
        );

        if (obj.button) {
            var $smackbarButton = $('<div/>');
            $smackbarButton.addClass('smackbar-button btn');
            $smackbarButton.html(obj.button.text);

            $smackbar.prepend($smackbarButton);

            if (obj.button.onclick) {
                $smackbarButton.click(function () {
                    obj.button.onclick();

                    if (!obj.preventClose) {
                        close()
                    }
                })
            }
        }

        // $smackbar.prepend('<div class="smackbar-close">&#10005;</div>');

        $('body').append($smackbar);

        setTimeout(function () {
            $smackbar.addClass('smackbar--shown')
        }, 50);

        $('.smackbar .smackbar-close').click(function () {
            close()
        });

        if (obj.timeout) {
            setTimeout(close, obj.timeout)
        }
    }

}
