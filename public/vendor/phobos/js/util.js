$(function() {
    $('input').attr('autocomplete', 'off');

    $('.scrollable').scroll(function() {

        var limit = ($('#profileContainer').length === 1) ? 230 : 0;
        var nav = $('.subbar');

        if ($(this).scrollTop() > limit) {
            nav.addClass("f-nav");
        } else {
            nav.removeClass("f-nav");
        }
    });


    var alto = $('.main-sidebar').height() - 100;
    $('.contenedor-secciones').height(alto);

    $(window).resize(function() {
        var alto = $('.main-sidebar').height() - 100;
        $('.contenedor-secciones').height(alto);
    });

});

Messenger.options = {
    extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
    theme: 'flat'
}

function notify(message, type) {
    var t = (type == null) ? 'success' : type;
    setTimeout(function() {
        Messenger().post({
            message: message,
            type: t,
            hideAfter: 12,
            showCloseButton: true
        });
    }, 900);
}

function exitSession() {
    var win = window.open('http://www.google.com.mx/accounts/Logout2', '_blank', 'modal=yes,width=500,height=500');
    location.href = "/logout";
}

function randString(n) {
    if (!n) {
        n = 5;
    }

    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < n; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

$.fn.datepicker.defaults.format = "dd/mm/yyyy";
$.fn.datepicker.defaults.language = "es";
$.fn.datepicker.defaults.autoclose = true;
$.fn.datepicker.defaults.todayHighlight = false;
$.fn.datepicker.defaults.showButtonPanel = false;

Sidebar = {
    position: function(str, m, i) {
        return str.split(m, i).join(m).length;
    },
    initialize: function() {
        var t = $(".nav-primary"),
                i = window.location.pathname,
                u = i.substr(0, Sidebar.position(i, '/', 3));
        t.find(".nav li").removeClass("active");
        var s = t.find("a[href='" + u + "']").parent();
        if (s.length) {
            if (s.addClass("active"), s.parents(".nav").length) {
                s.parents(".nav").parent().addClass("active")
            }
        } else {
            t.find(".nav li:eq(0)").addClass("active");
        }
    }
};

//Sidebar.initialize();

Topbar = {
    position: function(str, m, i) {
        return str.split(m, i).join(m).length;
    },
    initialize: function() {
        var t = $(".nav-topbar"),
                i = window.location.pathname;

        var u = i.substr(0, Sidebar.position(i, '/', 4));
        if ((i.match(/\//g) || []).length > 5) {
            u = i.substr(0, Sidebar.position(i, '/', 5));
        }
        var s = t.find("a[href='" + u + "']").parent();

        if (s.length) {
            if (s.addClass("active"), s.parents(".nav").length) {
                s.parents("li").addClass("active");
            }
        } else {
            t.find(".nav li:eq(0)").addClass("active");
        }
    }
};

//Topbar.initialize();

MODAL = {
    idModalMd: "modalVik",
    idModalLg: "modalVikLarge",
    idModalSm: "modalVikSmall",
    idModalFoto: "modalVikFoto",
    modalActivo: null,
    idContent: "contentModalVik",
    idTitle: "titleModalVik",
    idSize: "modalVik-size",
    idBody: "bodyModalVik",
    idFooter: "footerModalVik",
    idBtnClose: "btnCerrarModalVik",
    idDivButtons: "buttonsModalVik",
    textButtonAffected: "",
    textModalWait: "",
    buttonAffected: null,
    init: function(type) {
        if (type == "sm") {
            MODAL.modalActivo = $("#" + MODAL.idModalSm);
        } else if (type == "lg") {
            MODAL.modalActivo = $("#" + MODAL.idModalLg);
        } else if (type == "md") {
            MODAL.modalActivo = $("#" + MODAL.idModalMd);
        } else if (type == "foto") {
            MODAL.modalActivo = $("#" + MODAL.idModalFoto);
        }
        MODAL.body("");
        MODAL.buttons("");
        MODAL.activateButtons();
    },
    size: function(size) {
        var divSize = MODAL.modalActivo.find("#" + MODAL.idSize);
        divSize.removeClass("modal-sm");
        divSize.removeClass("modal-lg");
        divSize.removeClass("modal-md");

        if (size == "sm") {
            divSize.addClass("modal-sm");
        } else if (size == "lg") {
            divSize.addClass("modal-lg");
        } else if (size == "md") {
            divSize.addClass("modal-md");
        }
    },
    modalDefault: function() {
        if (MODAL.modalActivo == null) {
            MODAL.modalActivo = $("#" + MODAL.idModalMd);
        }
    },
    title: function(html) {
        MODAL.modalDefault();
        var title = MODAL.modalActivo.find("#" + MODAL.idTitle);
        var div = title.closest("div");
        if (html != "") {
            div.removeClass("hide");
            title.html(html);
        } else {
            div.addClass("hide");
        }
    },
    buttons: function(html) {
        MODAL.modalDefault();
        if (html == null) {
            return MODAL.modalActivo.find("#" + MODAL.idDivButtons);
        }
        MODAL.modalActivo.find("#" + MODAL.idDivButtons).html(html);
    },
    body: function(html) {
        MODAL.modalDefault();
        if (html == null) {
            return MODAL.modalActivo.find("#" + MODAL.idBody);
        }
        MODAL.modalActivo.find("#" + MODAL.idBody).html(html);
    },
    getBody: function() {
        MODAL.modalDefault();
        return MODAL.modalActivo.find("#" + MODAL.idBody);
    },
    getFooter: function() {
        MODAL.modalDefault();
        return MODAL.modalActivo.find("#" + MODAL.idFooter);
    },
    show: function() {
        MODAL.modalDefault();
        MODAL.modalActivo.modal();
    },
    invisible: function() {
        MODAL.modalDefault();
        MODAL.modalActivo.modal("hide");
    },
    hide: function() {
        MODAL.modalDefault();
        MODAL.modalActivo.modal("hide");
        MODAL.limpiar(MODAL.modalActivo);
    },
    limpiar: function(modal) {
        MODAL.modalDefault();
        modal.find("#" + MODAL.idTitle).html("");
        modal.find("#" + MODAL.idBody).html("");
        modal.find("#" + MODAL.idDivButtons).html("");
    },
    disableButtons: function(btn, htmlBtn) {
        MODAL.modalActivo.find("button").each(function(i, item) {
            $(item).attr("disabled", "disabled");
        });
        MODAL.modalActivo.find("a").each(function(i, item) {
            $(item).attr("disabled", "disabled");
        });
        if (btn != null) {
            MODAL.buttonAffected = btn;
            if (htmlBtn != null) {
                MODAL.textButtonAffected = btn.html();
                btn.html(htmlBtn);
            } else {
                MODAL.textButtonAffected = btn.html();
                btn.html('<i class="fa fa-spinner fa-spin fa-lg"></i> Procesando');
            }
        }
    },
    activateButtons: function(btn, htmlBtn) {
        setTimeout(function() {
            var footer = MODAL.modalActivo.find("#" + MODAL.idFooter);
            footer.find("button").each(function(i, item) {
                $(item).removeAttr("disabled");
            });
            footer.find("a").each(function(i, item) {
                $(item).removeAttr("disabled");
            });
            if (btn != null) {
                btn.html(htmlBtn);
                return;
            }
            if (MODAL.buttonAffected != null && htmlBtn != null) {
                MODAL.buttonAffected.html(htmlBtn);
                return;
            }
            if (MODAL.buttonAffected != null) {
                MODAL.buttonAffected.html(MODAL.textButtonAffected);
            }
        }, 800);
    },
    showWait: function(msg) {
        if (msg != null) {
            MODAL.textModalWait = $("#bodyModalWait").html();
            $("#bodyModalWait").html(msg);
        }
        $("#modalWait").modal();
    },
    hideWait: function() {
        setTimeout(function() {
            $("#bodyModalWait").html(MODAL.textModalWait);
            $("#modalWait").modal('hide');
        }, 1000);
    }
};

function pause(milliseconds) {
    var dt = new Date();
    while ((new Date()) - dt <= milliseconds) {
        /* Do nothing */
    }
}

APP = {
    colorEstado: {
        CRE: "default",
        ACT: "success", MAT: "success", ABI: "success",
        ANU: "danger", BLO: "danger", INA: "danger", RHZ: "danger", RCU: "danger", RCI: "danger",
        APR: "primary", ACEP: "primary",
        OBS: "warning",
        SOL: "info",
        REE: "info"},
    getEstadoClass: function(estadoCode) {
        return "label-" + APP.colorEstado[estadoCode];
    },
    cleanForm: function(f) {
        f.find("input[type=text], textarea, #id").val("");
        f.find("input[type=checkbox]").prop("checked", false);
        f.find("input[name='*[]']").prop("checked", false);
        f.find("input[name='id*']").val("");
    },
    cleanAll: function(f) {
        f.find("input, textarea").val("");
    },
    fillFormById: function(data, f) {
        $.each(data, function(index, value) {
            f.find('#' + index).val(value);
        });
    },
    fillFormByName: function(data, f) {
        $.each(data, function(index, value) {
            f.find('[name="' + index + '"]').val(value);
        });
    },
    select2: function() {
        $(".select2single").select2({minimumResultsForSearch: -1});
        $(".select2singleclear").select2({minimumResultsForSearch: -1, allowClear: true});
        $(".select2").select2();
    },
    url: function(relative) {
        return contextPath + relative;
    },
    timePicker: {
        minuteStep: 5,
        showInputs: true,
        disableFocus: true,
        showSeconds: false,
        showMeridian: false,
    },
    disableButtonsModal: function(idFooter, btn, htmlBtn) {
        $("#" + idFooter).find("button").each(function(i, item) {
            $(item).attr("disabled", "disabled");
        });
        $("#" + idFooter).find("a").each(function(i, item) {
            $(item).attr("disabled", "disabled");
        });
        if (btn != null) {
            if (htmlBtn != null) {
                btn.html(htmlBtn);
            } else {
                btn.html('<i class="fa fa-spinner fa-spin fa-lg"></i> Procesando');
            }
        }
    },
    activatedButtonsModal: function(idFooter, btn, htmlBtn) {
        setTimeout(function() {
            $("#" + idFooter).find("button").each(function(i, item) {
                $(item).removeAttr("disabled");
            });
            $("#" + idFooter).find("a").each(function(i, item) {
                $(item).removeAttr("disabled");
            });
            if (btn != null) {
                btn.html(htmlBtn);
            }
        }, 1000);
    },
    disableButtonsModalVik: function(btn, htmlBtn) {
        $("#footerModalVik").find("button").each(function(i, item) {
            $(item).attr("disabled", "disabled");
        });
        $("#footerModalVik").find("a").each(function(i, item) {
            $(item).attr("disabled", "disabled");
        });
        if (btn != null) {
            if (htmlBtn != null) {
                btn.html(htmlBtn);
            } else {
                btn.html('<i class="fa fa-spinner fa-spin fa-lg"></i> Procesando');
            }
        }
    },
    activatedButtonsModalVik: function(btn, htmlBtn) {
        setTimeout(function() {
            $("#footerModalVik").find("button").each(function(i, item) {
                $(item).removeAttr("disabled");
            });
            $("#footerModalVik").find("a").each(function(i, item) {
                $(item).removeAttr("disabled");
            });
            if (btn != null) {
                btn.html(htmlBtn);
            }
        }, 1000);
    },
    activatedRapidoButtonsModalVik: function(btn, htmlBtn) {
        $("#footerModalVik").find("button").each(function(i, item) {
            $(item).removeAttr("disabled");
        });
        $("#footerModalVik").find("a").each(function(i, item) {
            $(item).removeAttr("disabled");
        });
        if (btn != null) {
            btn.html(htmlBtn);
        }
    },
    verModalWait: function(msg) {
        if (msg != null) {
            $("#bodyModalWait").html(msg);
        }
        $("#modalWait").modal();
    },
    cerrarModalWait: function() {
        setTimeout(function() {
            $("#modalWait").modal('hide');
        }, 1000);
    },
    cerrarRapidoModalWait: function() {
        $("#modalWait").modal('hide');
    },
    limpiarRaros: function($this) {
        var conte = $this.val();
        conte = conte.replace(/[\n\f\b\r\t]/g, '');
        $this.val(conte);
    },
    revisarNombre: function($this) {
        var nom = $this.val().toLowerCase().replace(/[^a-zçñáéíóúü\s'\-]/g, '');
        nom = nom.replace(/[\n\f\b\r|,\t]/g, ' ').replace(/\s\s+/g, ' ').trim();
        nom = APP.capitalize(nom, " ");
        nom = APP.capitalize(nom, "'");
        nom = APP.capitalize(nom, "-");

        $this.val(nom);
    },
    capitalize: function(string, separator) {
        var arr = string.split(separator);
        $.each(arr, function(i, value) {
            arr[i] = value.charAt(0).toUpperCase() + value.substr(1);
        });
        return arr.join(separator);
    },
    eliminarEspacios: function($this) {
        var conte = $this.val().replace(/[\s\n\f\b\r\t]/g, '');
        $this.val(conte);
    },
    revisarDireccion: function($this) {
        var conte = $this.val().replace(/[\n\f\b\r\t|]/g, ' ').replace(/\s\s+/g, ' ').trim();
        $this.val(conte);
    },
    revisarEmail: function($this) {
        var conte = $this.val().toLowerCase().replace(/[\n\f\b\r\t\s|,'"!$%&/]/g, '').trim();
        conte = APP.stripAccents(conte);
        $this.val(conte);
    },
    stripAccents: function(str) {
        var from = "àáäâèéëêìíïîòóöôùúüûñç";
        var to = "aaaaeeeeiiiioooouuuunc";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
        return str;
    },
    template: {
        spin: "<i class='fa fa-spinner fa-spin' aria-hidden='true'></i>",
        spincenter: "<div class='text-center'><i class='fa fa-spinner fa-spin' aria-hidden='true'></i></div>",
        dynadiv: "<div class='panel-body'><div class='row' id='dynatable'></div></div>",
        inext: "<i class='fa fa-chevron-right' aria-hidden='true'></i>",
        iprev: "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
        wait: '<div class="m-t m-b text-center"><i class="fa fa-spinner fa-spin fa-2x"></i>&nbsp; <span class="h3 bold">Espere un momento por favor...</span>',
        color: '<div class="colorpicker dropdown-menu"><div class="colorpicker-saturation"><i><b></b></i></div><div class="colorpicker-hue"><i></i></div><div class="colorpicker-color"><div /></div><div class="colorpicker-selectors"></div></div>'
    },
    recDynatable: function(dynatable, e) {
        var self = $(e.currentTarget);
        var tr = self.closest("tr");
        var idx = tr.attr("rel");
        var rec = dynatable.settings.dataset.records[idx];
        return rec;
    },
    goUrlReturn(url) {
        var myform = document.createElement("form");
        myform.action = APP.url(url);
        myform.method = "GET";

        var origen = location.pathname + location.search;
        product = document.createElement("input");
        product.value = Usuario.b64EncodeUnicode(origen);
        product.name = "origen";

        myform.appendChild(product);
        document.body.appendChild(myform);
        myform.submit();
    }
};

MESSAGES = {
    errorComunicacion: 'Error de conexión con el servidor.',
    confirmDelete: '¿Seguro que desea eliminar?',
    confirmActive: '¿Seguro que desea activar?',
    confirmDesActive: '¿Seguro que desea desactivar?',
    confirmReject: '¿Seguro que desea rechazar?',
    confirmApprove: '¿Seguro que desea aprobar?',
    confirmObserve: '¿Seguro que desea observar?',
    confirmAccept: '¿Seguro que desea aceptar?',
};


APP.select2();

$.fn.disableButtonsModal = function(btn, htmlBtn)
{
    var el = this;

    $(el).find(".modal-footer>button").each(function(i, item) {
        $(item).attr("disabled", "disabled");
    });
    $(el).find(".modal-footer>a").each(function(i, item) {
        $(item).attr("disabled", "disabled");
    });
    if (btn != null) {
        if (htmlBtn != null) {
            btn.html(htmlBtn);
        } else {
            btn.html('<i class="fa fa-spinner fa-spin fa-lg"></i> Procesando');
        }
    }
    return el;
};

$.fn.enableButtonsModal = function(btn, htmlBtn)
{
    var el = this;

    setTimeout(function() {

        $(el).find(".modal-footer>button").each(function(i, item) {
            $(item).removeAttr("disabled");
        });

        $(el).find(".modal-footer>a").each(function(i, item) {
            $(item).removeAttr("disabled");
        });

        if (btn != null) {
            btn.html(htmlBtn);
        }

    }, 1000);

    return el;
};

$.fn.cleanForm = function()
{
    $(this).find("input[type=text], textarea, #id, input[name='id'] ").val("");
    $(this).find("input[type=checkbox]").prop("checked", false);
    $(this).find("input[type=radio]").prop("checked", false);
    $(this).find("input[name='*[]']").prop("checked", false);
    $(this).find("input[name='id*']").val("");
    return this;
};

$.fn.cleanAll = function()
{
    $(this).find("input, textarea").val("");
    return this;
};

$.fn.treeview = function() {
    var self = $(this);
    self.find('li:has(ul)').addClass('parent_li').find(' > div > span').attr('title', 'Colapsar este menú');
    self.find('li.parent_li > div > span').on('click', function(e) {
        var yourself = $(e.currentTarget);
        var children = yourself.parent("div").parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            yourself.attr('title', 'Expandir este menú').find(' > i').addClass('fa-folder-o').removeClass('fa-folder-open-o');
        } else {
            children.show('fast');
            yourself.attr('title', 'Colapsar este menú').find(' > i').addClass('fa-folder-open-o').removeClass('fa-folder-o');
        }
        e.stopPropagation();
    });
};

$.fn.btnEnable = function() {
    $(this).removeProp("disabled");
    $(this).html($(this).data("btn-nombre"));
};

$.fn.btnDisabled = function() {
    $(this).data("btn-nombre", $(this).prop('innerHTML'));
    $(this).prop("disabled", true);
    $(this).html('<i class="fa fa-spinner fa-spin"></i>  ' + $(this).data("btn-nombre"));
};
$.fn.upperCase = function() {
    $(this).keyup(function(e) {
        var str = $(this).val();
        $(this).val(str.toUpperCase());
    });
};
var $global = new Vue({});
