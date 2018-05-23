Vue.component('fullcalendar', {
    template: '#vue-fullcalendar',
    data: function() {
        return {events: []};
    },
    props: {
        eventclick: {type: Function, default: () => {
            }},
        dayclick: {type: Function, default: () => {
            }},
        daydbclick: {type: Function, default: () => {
            }},
    },
    methods: {
        createFullcalendar: function() {
            var vue = this;
            $(vue.$el).fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    //right: 'month,basicWeek,basicDay'
                    right: 'month,basicWeek'
                },
                navLinks: true,
                editable: true,
                eventLimit: true,
                eventClick: function(date, jsEvent, view) {
                    var self = this;
                    vue.eventclick(self, date, jsEvent, view);
                },
                dayClick: function(date, jsEvent, view) {
                    var self = this;
                    vue.dayclick(self, date, jsEvent, view);
                },
                dayRender: function(date, element) {
                    var self = this;
                    var d = $(vue.$el).fullCalendar('getDate');
                    element.bind('dblclick', function() {
                        vue.daydbclick(self, date, element);
                    });
                    element.bind('mouseover', function() {
                        $(element).css('background-color', '#e3e3e3');
                    });
                    element.bind('mouseout', function() {
                        if (vue.compareDate(d, date)) {
                            $(element).css('background-color', '#FCF8E3');
                        } else {
                            $(element).css('background-color', '#fff');
                        }
                    });
                }
            });
        },
        fireMethod(...options) {
            var vue = this;
            return $(vue.$el).fullCalendar(...options);
        },
        render() {
            var vue = this;
            $(vue.$el).fullCalendar('render');
        },
        removeEvents(event) {
            var vue = this;
            if (event && event.hasOwnProperty('id')) {
                $(vue.$el).fullCalendar('removeEvents', event.id);
            } else {
                $(vue.$el).fullCalendar('removeEvents', event);
            }
        },
        rerenderEvents() {
            var vue = this;
            $(vue.$el).fullCalendar('rerenderEvents');
        },
        refetchEvents() {
            var vue = this;
            $(vue.$el).fullCalendar('refetchEvents');
        },
        renderEvent(event) {
            var vue = this;
            $(vue.$el).fullCalendar('renderEvent', event);
        },
        addEventSource(source) {
            var vue = this;
            vue.events = source;
        },
        reloadEvents() {
            var vue = this;
            $(vue.$el).fullCalendar('removeEvents');
            $(vue.$el).fullCalendar('addEventSource', this.events);
        },
        rebuildSources() {
            var vue = this;
            $(vue.$el).fullCalendar('removeEventSources');
            this.eventSources.map(event => {
                $(vue.$el).fullCalendar('addEventSource', event);
            });
        },
        compareDate(date1, date2) {
            var x = new Date(date1);
            var y = new Date(date2);
            var day1 = x.getDate();
            var month1 = x.getMonth();
            var year1 = x.getFullYear();
            var day2 = y.getDate();
            var month2 = y.getMonth();
            var year2 = y.getFullYear();
            if (day1 === day2 && month1 === month2 && year1 === year2) {
                return true;
            }
            return false;
        }
    },
    mounted() {
        var vue = this;
        vue.createFullcalendar();
    },
    watch: {
        events: {
            deep: true,
            handler(val) {
                var vue = this;
                $(vue.$el).fullCalendar('removeEvents');
                $(vue.$el).fullCalendar('addEventSource', this.events);
            }
        },
        eventSources: {
            deep: true,
            handler(val) {
                this.$emit('rebuild-sources');
            }
        }
    },
});
