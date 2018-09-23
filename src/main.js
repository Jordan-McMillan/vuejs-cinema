import Vue from 'vue';
import './style.scss';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import moment from 'moment-timezone';
//not setup as a vue library
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', { get(){ return this.$root.moment } });

//global event bus
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });
import { checkFilter } from './util/bus.js';

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
    components: {
        MovieList,
        MovieFilter
    },
    created() {
        var me = this;
        this.$http.get('/api').then(response => {
            var movies = response.data;
            me.movies = movies;
        });

        me.$bus.$on('check-filter', checkFilter.bind(me));
    }
});