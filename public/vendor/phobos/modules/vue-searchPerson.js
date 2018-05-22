Vue.component('search-person', {
    template: '#searchperson',
    props: {

    },
    data: function () {
        return {
            personas: [],
            personaSelected: {}
        }
    },
    methods: {
        seleccionado() {
            let $vue = this;
            console.log($vue.personaSelected);
            $global.$emit("personaSeleccionada", $vue.personaSelected);
        },
        searchPerson(valor) {
            if (valor == undefined) {
                return;
            }
            let $vue = this;
            $.ajax({
                url: APP.url('general/oficina/searchPersona'),
                type: 'POST',
                data: {nombre: valor},
                success: function (response) {
                    $vue.personas = response.data;
                },
                error: function (error) {
                    notify(MESSAGES.errorComunicacion, "error");
                }
            });
        },
    }
});
