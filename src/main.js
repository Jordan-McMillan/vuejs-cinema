import Vue from 'vue';
import './style.scss';

import genres from './util/genres';

new Vue({
    el: '#app',
    data: {
        genre: [],
        time: []
    },
    methods: {
        checkFilter(category, title, checked) {
            console.log('root' + title);
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
        'movie-list': {
            template: 
            `<div id="movie-list">
                <div v-for="movie in filteredMovies" class="movie">{{ movie.title }}</div>
            </div>`,
            data() {
                return {
                    movies: [
                        {
                            title: 'one',
                            genre: genres.CRIME
                        },
                        {
                            title: 'two',
                            genre: genres.COMEDY
                        },
                        {
                            title: 'threee',
                            genre: genres.COMEDY
                        }
                    ]
                };
            },
            props: ['genre', 'time'],
            methods: {
                moviePassesGenreFilter(movie) {
                    if (!this.genre.length)
                        return true;
                    return this.genre.find(genre => movie.genre == genre);
                }
            },
            computed: {
                filteredMovies() {
                    return this.movies.filter(this.moviePassesGenreFilter);
                }
            }
        },
        'movie-filter': {
            data() {
                return {
                    genres
                };
            },
            methods: {
                checkFilter(category, title, checked) {
                    this.$emit('check-filter', category, title, checked);
                }
            },
            template: 
            `<div id="movie-filter">
                <h2>Filter results</h2>
                <div class="filter-group">
                    <check-filter v-for="genre in genres" v-bind:title="genre" v-on:check-filter="checkFilter"></check-filter>
                </div>
            </div>`,
            components: {
                'check-filter': {
                    data() {
                        return {
                            checked: false
                        };
                    },
                    props: [
                        'title'
                    ],
                    methods: {
                        checkFilter() {
                            this.checked=!this.checked;
                            this.$emit('check-filter', 'genre', this.title, this.checked);
                        }
                    },
                    template: 
                    `<div v-bind:class="{'check-filter': true, active: checked}" @click="checkFilter">
                        <span class="checkbox"></span>
                        <span class="check-filter-title">{{ title }}</span>
                    </div>`

                }
            }
        }
    }
});