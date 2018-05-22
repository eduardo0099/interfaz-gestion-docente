// Ref: https://github.com/joturako/vue2-bootstrap-modal/tree/master/src

Vue.component('modal-vik', {
    template: '#modal-vik-template',
    props: {
        id: {type: String, default: null},
        header: {type: Boolean, default: false},
        footer: {type: Boolean, default: true},
        title: {type: String, default: 'Modal Vik'},
        okbtn: {type: String, default: 'Aceptar'},
        okaction: {type: Function, default: () => {
            }},
        okclass: {type: String, default: 'btn-success'},
        cancelbtn: {type: String, default: 'Cancelar'},
        cancelaction: {type: Function, default: () => {
            }},
        cancelclass: {type: String, default: 'btn-default'},
        modalsize: {type: String, default: "modal-md"},
        showaccept: {type: Boolean, default: true},
        modalscroll: {type: String, default: ''},
        styleModal: {type: Object, default: null},
        dataBackdrop: {type: String, default: null},
        dataKeyboard: {type: String, default: null},
    },
    methods: {
        open() {
            let $vue = this;
            $('#' + $vue.id).modal('show');
        },
        close() {
            let $vue = this;
            $('#' + $vue.id).modal('hide');
            this.cancelaction();
        }
    }
});
