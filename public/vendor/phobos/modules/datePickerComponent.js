Vue.component("v-date-picker", {
    template: `<div><div class='input-group date vdate'>
                        <input  type="text" 
                               class="form-control"
                               v-bind:data-parsley-errors-container="'#'+'error'+id"
                               v-bind:required="required"/>
                        <span class="input-group-addon">
                            <i class="fa fa-calendar" aria-hidden="true"></i>
                        </span>
                    </div>
                    <span v-bind:id="'error'+id"></span></div>`,
    props: {
        name: {
            required: false,
            default: "datePickerName"
        },
        id: {
            name: false,
            default: "datePickerId"
        },
        required: {
            required: false,
            default: false
        },
        readonly: {
            required: false,
            default: false
        },
        disabled: {
            required: false,
            default: false
        },
        value: {
            default: null,
            required: true,
            validator(value) {
                return value === null || value instanceof Date || typeof value === 'string' || value instanceof String || value instanceof moment
            }
        },
        startdate: {required: false, default: null},
        enddate: {required: false, default: null},
        daysweekdisabled: {required: false, default: null},
        datesdisabled: {required: false, default: null}
    },
    data: function () {
        return {
            dp: null,
            elem: null
        }
    },
    methods: {
        createdDP($vue) {
            $vue.elem = $(this.$el).find(".vdate");
            $('.date').datepicker({
                format: 'dd/mm/yyyy'
            });

            if (this.value != null) {
                this.elem.datepicker().datepicker('setDate', this.value);
            }
            $vue.elem.datepicker().on('changeDate', function () {
                if ($vue.required) {
                    let target = $vue.elem.find("input");
                    target.parsley().destroy();
                    target.parsley();
                    if (target.parsley().validate() !== true) {
                        return;
                    }
                }
                var dateObject = $vue.elem.datepicker('getDate');
                $vue.$emit('input', dateObject);
                $vue.value = dateObject;
                //    $vue.elem.datepicker().datepicker('setFormat', 'dd/mm/yyyy');
                $vue.$emit("changedate");
            });

            if ($vue.startdate != null) {
                $vue.elem.datepicker().datepicker('setStartDate', $vue.startdate);
            }
            if ($vue.enddate != null) {
                $vue.elem.datepicker().datepicker('setEndDate', $vue.enddate);
            }
            if ($vue.daysweekdisabled != null) {
                $vue.elem.datepicker().datepicker('setDaysOfWeekDisabled', $vue.daysweekdisabled);
            }
            if ($vue.setDatesDisabled != null) {
                $vue.elem.datepicker().datepicker('setDatesDisabled', $vue.datesdisabled);
            }
        }
    }, created: function () {
        console.log("created datepicker");

    },
    mounted: function () {
        console.log("mounted datepicker");
        var $vue = this;
        this.createdDP($vue);
    }, watch: {
        startdate(newValue) {
            this.elem.datepicker().datepicker('setStartDate', newValue);
        }, enddate(newValue) {
            this.elem.datepicker().datepicker('setEndDate', newValue);
        }, daysweekdisabled(newValue) {
            this.elem.datepicker().datepicker('setDaysOfWeekDisabled', newValue);
        }, datesdisabled(newValue) {
            this.elem.datepicker().datepicker('setDatesDisabled', newValue);
        }
    }, beforeDestroy() {
        //  console.log("destruira datepicker")
    }
});

