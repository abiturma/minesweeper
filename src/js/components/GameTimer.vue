<template>
    <h5>Spielzeit: {{elapsedTime}}</h5>
</template>

<script>

    import {mapGetters, mapMutations, mapState} from 'vuex';

    export default {
        
        data() {
            return {
                interval: null
            }
        },

        computed: {
            ...mapState(['pause']),
            
            ...mapGetters(['elapsedTime', 'gameOver']),

            hasPause() {
                return this.pause || this.gameOver;
            }
        },

        methods: {

            ...mapMutations(['incrementTimer']),

            increment() {
                if (!this.hasPause) {
                    this.incrementTimer();
                }
            }


        },
        
        beforeDestroy() {
            clearInterval(this.interval); 
        },

        created() {
            this.interval = setInterval(this.increment, 1000);
        }
    }
    
</script>
