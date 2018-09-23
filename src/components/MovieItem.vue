<template>
    <div class="movie">
        <div class="movie-col-left">
            <img v-bind:src="movie.Poster" >
        </div>
        <div class="movie-col-right">
            <div class="movie-title">
                <h2>{{ movie.Title }}</h2>
                <span class="movie-rating">
                    {{ movie.Rated }}
                </span>
            </div>
            <div class="movie-sessions">
                <div 
                v-for="session in filteredSessions(sessions)" 
                v-bind:key="session.id" 
                class="session-time-wrapper">
                    <div class="session-time">
                        {{ formatSessionTime(session.time) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import times from '../util/times';

export default {
    props: ['movie', 'sessions', 'day', 'time'],
    methods: {
        formatSessionTime(time) {
            return this.$moment(time).format('h:mm A');
        },
        filteredSessions(sessions) {
            return sessions.filter(this.sessionPassesTimeFilter);
        },
        sessionPassesTimeFilter(session) {
            var sessionTime = this.$moment(session.time);

            if(!this.day.isSame(sessionTime, 'day')) {
                return false;
            } else if (this.time.length === 0 || this.time.length === 2) {
                // none or both selected
                return true;
            } else if (this.time[0] === times.AFTER_6PM) {
                return sessionTime.hour() >= 18;
            }
            else {
                return sessionTime.hour() < 18;
            }
        }
    }
}
</script>

