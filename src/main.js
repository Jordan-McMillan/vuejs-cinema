import Vue from 'vue';
import './style.scss';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import moment from 'moment-timezone';
//not setup as a vue library
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', { get(){ return this.$root.moment } });

//global event bus
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });
import { checkFilter, setDay } from './util/bus.js';

import routes from './util/routes';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const router = new VueRouter({
    routes
});

new Vue({
    el: '#app',
    data: {
        genre: [],
        time: [],
        movies: [],
        moment,
        day: moment(),
        bus
    },
    created() {
        var me = this;
        this.$http.get('/api').then(response => {
            var movies = response.data;
            me.movies = movies;
        });

        me.$bus.$on('check-filter', checkFilter.bind(me));
        me.$bus.$on('set-day', setDay.bind(me));
    },
    router
});