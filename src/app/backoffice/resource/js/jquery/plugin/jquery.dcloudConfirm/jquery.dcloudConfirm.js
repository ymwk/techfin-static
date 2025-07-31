/**
 * Dcloud Confirm
 * 2015.05.18 신승현
 * Confirm창 dcloud 스타일로 디자인 처리
 *
 * dcloudConfirm.alert("message", function(e){}, {option});
 * @param message
 * @param event
 * @param option
 */
;(function(window, document) {

    var dcloudConfirm = {
        dcloudConfirmtimeout: [],
        init: false,
        zindex: 2000,
        i: 0,

        bodyload: function(id) {
            var ff = document.createElement('div');
            ff.setAttribute('id','dcloudConfirm-out-'+id);
            ff.className = 'dcloudConfirm-base';
            ff.style.zIndex = dcloudConfirm.zindex;
            dcloudConfirm.zindex++;
            document.body.appendChild(ff);
        },

        newdialog: function() {
            var newid = new Date().getTime();
            newid = Math.random(1,99) + newid;

            if (!dcloudConfirm.init) {
                dcloudConfirm.listen(window,"load", function() {
                    dcloudConfirm.bodyload(newid);
                });
            }else{
                dcloudConfirm.bodyload(newid);
            }
            return newid;
        },

        forceload: function() {},

        build: function (e, f) {
            dcloudConfirm.i++;

            f.stack = dcloudConfirm.i;

            //e = e.replace(/\n/g,'<br />');
            //e = e.replace(/\r/g,'<br />');

            var prompt = '',
                ok = Lang.getMessage("confirm"),
                cancel = Lang.getMessage("cancel"),
                classname = '',
                buttons = '',
                box;

            var icon='<svg focusable="false" viewBox="0 0 76 70" style="display: inline-block; fill: rgb(254, 188, 44); height: 70px; width: 76px; user-select: none; margin-bottom: 9px;"><defs><filter id="q3fd15otra" width="76" height="70" x="0" y="0" filterUnits="userSpaceOnUse"><feOffset dy="3"></feOffset><feGaussianBlur result="blur" stdDeviation="4"></feGaussianBlur><feFlood flood-color="#febc2c" flood-opacity=".302"></feFlood><feComposite in2="blur" operator="in"></feComposite><feComposite in="SourceGraphic"></feComposite></filter></defs><g><g><g filter="url(#q3fd15otra)" transform="translate(-1274 -158) translate(-26 -501) translate(1300 659)"><path d="M20.777 9.241a6 6 0 0 1 10.447 0L46.94 37.048A6 6 0 0 1 41.717 46H10.283a6 6 0 0 1-5.223-8.952z" transform="translate(12 9)"></path></g><path fill="#fff" d="M0 20a2 2 0 1 1 2 2 2 2 0 0 1-2-2zm0-6V2a2 2 0 0 1 4 0v12a2 2 0 0 1-4 0z" transform="translate(-1274 -158) translate(-26 -501) translate(1336 686)"></path></g></g></svg>';

            if (f.type === 'prompt') {
                if (f.subtype === 'pw') {
                    prompt = '<div class="dialog-prompt">'+'<input id="dialog-input-'+f.newid+'" type="password" ' + (f.params.value ? 'value="' + f.params.value + '"' : '') + '/>'+'</div>';
                } else {
                    prompt = '<div class="dialog-prompt">'+'<input id="dialog-input-'+f.newid+'" type="text" ' + (f.params.value ? 'value="' + f.params.value + '"' : '') + ' />'+'</div>';
                }
            }

            if (f.params.ok) {
                ok = f.params.ok;
            }

            if (f.params.cancel) {
                cancel = f.params.cancel;
            }

            if (f.params.classname) {
                classname = f.params.classname;
            }

            if (f.type !== 'signal') {
                buttons = '<div class="dialog-buttons">';
                if (f.type === 'alert') {
                    buttons += '<button id="alert-ok-'+f.newid+'">'+ok+'</button>';
                }
                else if (f.type === 'choice') {
                    if (f.params.button_gray) {
                        buttons += '<button class="choice-button choice-button-gray" id="'+f.type+'-okgray-'+f.newid+'">'+f.params.button_gray+'</button>';
                    }
                    if (f.params.button_1) {
                        buttons += '<button class="choice-button" id="'+f.type+'-ok1-'+f.newid+'">'+f.params.button_1+'</button>';
                    }
                    if (f.params.button_2) {
                        buttons += '<button class="choice-button" id="'+f.type+'-ok2-'+f.newid+'">'+f.params.button_2+'</button>';
                    }
                    if (f.params.button_3) {
                        buttons += '<button class="choice-button" id="'+f.type+'-ok3-'+f.newid+'">'+f.params.button_3+'</button>';
                    }
                    if (f.params.button_cancel) {
                        buttons += '<button id="'+f.type+'-cancel-'+f.newid+'" class="cancel">'+f.params.button_cancel+'</button>';
                    }
                }
                else if (f.type === 'prompt' || f.type === 'confirm') {
                    if (f.params.reverseButtons) {
                        buttons +=
                            '<button id="'+f.type+'-ok-'+f.newid+'">'+ok+'</button>' +
                            '<button id="'+f.type+'-cancel-'+f.newid+'" class="cancel">'+cancel+'</button>';
                    } else {
                        buttons +=
                            '<button id="'+f.type+'-cancel-'+f.newid+'" class="cancel">'+cancel+'</button>'+
                            '<button id="'+f.type+'-ok-'+f.newid+'">'+ok+'</button>';
                    }
                }
                buttons += '</div>';
            }


            box =
                '<div id="dcloudConfirm-bg-'+f.newid+'" class="dcloudConfirmbg"></div>'+
                '<div class="dialog dcloudConfirm '+classname+'">'+
                '<div class="dialog-inner">'+
                icon+
                e+
                prompt+
                buttons+
                '</div>'+
                '</div>';

            if (!dcloudConfirm.init) {
                dcloudConfirm.listen(window,"load", function() {
                    dcloudConfirm.finishbuild(e,f,box);
                });
            } else{
                dcloudConfirm.finishbuild(e,f,box);
            }

        },

        finishbuild: function(e, f, box) {

            var ff = document.getElementById('dcloudConfirm-out-'+f.newid);

            ff.className = 'dcloudConfirm-base dcloudConfirm-visible  dcloudConfirm-' + f.type;
            ff.innerHTML = box;

            while (ff.innerHTML === "") {
                ff.innerHTML = box;
            }

            if (dcloudConfirm.dcloudConfirmtimeout[f.newid]) {
                clearTimeout(dcloudConfirm.dcloudConfirmtimeout[f.newid]);
            }

            dcloudConfirm.listen(
                document.getElementById('dcloudConfirm-bg-'+f.newid),
                "click",
                function () {
                    /* 백그라운드 클릭시 닫히는 현상 fix
                    dcloudConfirm.destroy(f.type, f.newid);
                    if (f.type === 'prompt' || f.type === 'confirm' || f.type === 'choice') {
                        f.callback(false);
                    } else if (f.type === 'alert' && typeof f.callback !== 'undefined') {
                        f.callback();
                    }
                    */
                }
            );


            switch (f.type) {
                case 'alert':
                    dcloudConfirm.finishbuildAlert(e, f, box);
                    break;
                case 'confirm':
                    dcloudConfirm.finishbuildConfirm(e, f, box);
                    break;
                case 'choice':
                    dcloudConfirm.finishbuildchoice(e, f, box);
                    break;
                case 'prompt':
                    dcloudConfirm.finishbuildPrompt(e, f, box);
                    break;
                case 'signal':
                    dcloudConfirm.finishbuildSignal(e, f, box);
                    break;
                default:
                    throw "Unknown type: " + f.type;
            }
        },

        finishbuildAlert: function (e, f, box) {
            dcloudConfirm.listen(
                document.getElementById('alert-ok-'+f.newid),
                "click",
                function () {
                    dcloudConfirm.destroy(f.type, f.newid);
                    if (typeof f.callback !== 'undefined') {
                        f.callback();
                    }
                }
            );

            document.onkeyup = function (e) {
                if (!e) {
                    e = window.event;
                }
                if (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 27) {
                    dcloudConfirm.destroy(f.type, f.newid);
                    if (typeof f.callback !== 'undefined') {
                        f.callback();
                    }
                }
            };
            $("body").focus();
        },

        finishbuildConfirm: function (e, f, box) {
            dcloudConfirm.listen(
                document.getElementById('confirm-cancel-' + f.newid),
                "click",
                function ()
                {
                    dcloudConfirm.destroy(f.type, f.newid);
                    f.callback(false);
                }
            );

            dcloudConfirm.listen(
                document.getElementById('confirm-ok-' + f.newid),
                "click",
                function ()
                {
                    dcloudConfirm.destroy(f.type, f.newid);
                    f.callback(true);
                }
            );

            document.onkeyup = function (e) {
                if (!e) {
                    e = window.event;
                }
                if (e.keyCode === 13 || e.keyCode === 32) {
                    dcloudConfirm.destroy(f.type, f.newid);
                    f.callback(true);
                } else if (e.keyCode === 27) {
                    dcloudConfirm.destroy(f.type, f.newid);
                    f.callback(false);
                }
            };
            $("body").focus();
        },

        finishbuildchoice: function (e, f, box) {
            var a, b, c;
            /*
            dcloudConfirm.listen(
                document.getElementById('choice-cancel-' + f.newid),
                "click",
                function ()
                {
                    dcloudConfirm.destroy(f.type, f.newid);
                    f.callback(false);
                }
            );
            */

            if (a = document.getElementById('choice-ok1-'+f.newid))
                dcloudConfirm.listen(
                    a,
                    "click",
                    function () {
                        dcloudConfirm.destroy(f.type, f.newid);
                        f.callback(a.innerHTML);
                    }
                );


            if (b = document.getElementById('choice-ok2-'+f.newid))
                dcloudConfirm.listen(
                    b,
                    "click",
                    function () {
                        dcloudConfirm.destroy(f.type, f.newid);
                        f.callback(b.innerHTML);
                    }
                );


            if (c = document.getElementById('choice-ok3-'+f.newid))
                dcloudConfirm.listen(
                    c,
                    "click",
                    function () {
                        dcloudConfirm.destroy(f.type, f.newid);
                        f.callback(c.innerHTML);
                    }
                );

            if (d = document.getElementById('choice-okgray-'+f.newid))
                dcloudConfirm.listen(
                    d,
                    "click",
                    function () {
                        dcloudConfirm.destroy(f.type, f.newid);
                        f.callback(d.innerHTML);
                    }
                );


            document.onkeyup = function (e) {
                if (!e) {
                    e = window.event;
                }
                if (e.keyCode === 27) {
                    //dcloudConfirm.destroy(f.type, f.newid);
                    //f.callback(false);
                }
            };
            $("body").focus();
        },

        finishbuildPrompt: function (e, f, box) {
            var pi = document.getElementById('dialog-input-'+f.newid);

            setTimeout(function () {
                pi.focus();
                pi.select();
            }, 100);

            dcloudConfirm.listen(
                document.getElementById('prompt-cancel-'+f.newid),
                "click",
                function () {
                    dcloudConfirm.destroy(f.type, f.newid);
                    f.callback(false);
                }
            );

            dcloudConfirm.listen(
                document.getElementById('prompt-ok-'+f.newid),
                "click",
                function () {
                    dcloudConfirm.destroy(f.type, f.newid);
                    f.callback(pi.value);
                }
            );

            document.onkeyup = function (e) {
                if (!e) {
                    e = window.event;
                }

                if (e.keyCode === 13) {
                    dcloudConfirm.destroy(f.type, f.newid);
                    f.callback(pi.value);
                } else if (e.keyCode === 27) {
                    dcloudConfirm.destroy(f.type, f.newid);
                    f.callback(false);
                }
            };
            $("body").focus();
        },

        finishbuildSignal: function (e, f, box) {


            document.onkeyup = function (e) {
                if (!e) {
                    e = window.event;
                }
                if (e.keyCode === 27) {
                    dcloudConfirm.destroy(f.type, f.newid);
                    if (typeof f.callback !== 'undefined') {
                        f.callback();
                    }
                }
            };

            dcloudConfirm.dcloudConfirmtimeout[f.newid] = setTimeout(function () {
                dcloudConfirm.destroy(f.type, f.newid);
                if (typeof f.callback !== 'undefined') {
                    f.callback();
                }
            }, f.timeout);
            $("body").focus();
        },


        destroy: function (type,id) {

            var box = document.getElementById('dcloudConfirm-out-'+id);

            if (type !== 'choice') {
                var okButton = document.getElementById(type+'-ok-'+id);
            }

            var cancelButton = document.getElementById(type+'-cancel-'+id);
            box.className = 'dcloudConfirm-base';

            if (okButton) {
                dcloudConfirm.stoplistening(okButton, "click", function() {});
                document.onkeyup = null;
            }

            if (type === 'choice') {
                var choice_buttons = document.getElementsByClassName("choice-button");
                for (var i = 0; i < choice_buttons.length; i++) {
                    dcloudConfirm.stoplistening(choice_buttons[i], "click", function() {});
                    document.onkeyup = null;
                }
            }

            if (cancelButton) {
                dcloudConfirm.stoplistening(cancelButton, "click", function() {});
            }

            dcloudConfirm.i = 0;
            document.body.removeChild(box);
        },

        alert: function (e, f, g) {
            if (typeof g !== 'object') {
                g = false;
            }

            var id = dcloudConfirm.newdialog();

            dcloudConfirm.build(e, {
                type:     'alert',
                callback: f,
                params:   g,
                newid:    id
            });
        },

        signal: function (e, f, g) {
            if (typeof g !== 'object') {
                g = false;
            }

            var duration = 5000;
            if (g.duration !== 'undefined'){
                duration = g.duration;
            }

            var id = dcloudConfirm.newdialog();
            dcloudConfirm.build(e, {
                type:    'signal',
                callback: f,
                timeout: duration,
                params:  g,
                newid:   id
            });
        },

        confirm: function (e, f, g) {
            if (typeof g !== 'object') {
                g = false;
            }

            var id = dcloudConfirm.newdialog();
            dcloudConfirm.build(e, {
                type:     'confirm',
                callback: f,
                params:   g,
                newid:    id
            });
        },

        choice: function (e, f, g) {
            if (typeof g !== 'object') {
                g = false;
            }

            var id = dcloudConfirm.newdialog();
            dcloudConfirm.build(e, {
                type:     'choice',
                callback: f,
                params:   g,
                newid:    id
            });
        },

        prompt: function (e, f, g) {
            if (typeof g !== 'object') {
                g = false;
            }

            var id = dcloudConfirm.newdialog();
            return dcloudConfirm.build(e,{type:'prompt',callback:f,params:g,newid:id});
        },

        promptpw: function (e, f, g) {
            if (typeof g !== 'object') {
                g = false;
            }

            var id = dcloudConfirm.newdialog();
            return dcloudConfirm.build(e,{type:'prompt',callback:f,params:g,newid:id, subtype: "pw"});
        },

        listen: function (e, f, g) {
            if (e.addEventListener) {
                return e.addEventListener(f, g, false);
            }

            if (e.attachEvent) {
                return e.attachEvent('on'+f, g);
            }

            return false;
        },

        stoplistening: function (e, f, g) {
            if (e.removeEventListener) {
                return e.removeEventListener(f, g, false);
            }

            if (e.detachEvent) {
                return e.detachEvent('on'+f, g);
            }

            return false;
        }
    };


    dcloudConfirm.init = true;

    if (typeof module != 'undefined' && module.exports) {
        module.exports = dcloudConfirm;
    }
    else if (typeof define === 'function' && define.amd) {
        define('dcloudConfirm', [], function() {
            return dcloudConfirm;
        });
    }
    else {
        this.dcloudConfirm = dcloudConfirm;
    }

})(window, document);
