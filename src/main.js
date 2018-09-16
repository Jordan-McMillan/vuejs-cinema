import Vue from 'vue';
import './style.scss';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import VueResource from 'vue-resource';
Vue.use(VueResource);

new Vue({
    el: '#app',
    data: {
        genre: [],
        time: [],
        movies: []
    },
    methods: {
        checkFilter(category, title, checked) {
            var collection = this[category];
            if(checked) {
                collection.push(title);
            }
            else {
                let index = collection.indexOf(title);
                if(index > -1) {
                    collection.splice(index);
                }
            }
            console.log(collection);
        }
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
    }
});