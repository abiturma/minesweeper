<template>
    <div>
        <b-modal id="pause-modal" size="lg" title="Pause!" v-model="isPause" ok-only ok-title="Weiter geht's">
            <p class="my-4">Das Spiel ist pausiert. Klicke unten um weiterzuspielen...</p>
        </b-modal>

        <b-modal id="pause-modal"
                 size="lg"
                 title="Gewonnen!"
                 v-model="isGameOver"
                 ok-only
                 ok-title="Yeah - lass nochmal spielen!"
                 @ok="stopGame()"
        >
            <p class="my-4">Du hast alle Felder aufgedeckt und das Spiel gewonnen</p>
            <p class="my-4">Spielzeit: {{elapsedTime}}</p>
        </b-modal>


        <b-modal id="explosion-modal" size="lg" title="Boom!"
                 v-model="isExplosion"
                 cancel-variant="danger"
                 @cancel="stopGame()"
                 ok-title="Weiter geht's"
                 cancel-title="Spiel beenden"
        >
            <p class="my-4">Da hast Du eine Mine erwischt!</p>
        </b-modal>
    </div>
</template>

<script>

    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

    export default {

        props: {},

        computed: {

            ...mapState(['pause', 'explosion']),

            ...mapGetters(['elapsedTime', 'gameOver']),

            isPause: {
                get: (vm) => vm.pause,
                set(value) {
                    this.setPause(value);
                }
            },

            isGameOver: {
                get: (vm) => vm.gameOver,
                set: () => {
                }
            },

            isExplosion: {
                get: vm => vm.explosion,
                set(value) {
                    this.setExplosion(value)
                }
            }

        },

        methods: {

            ...mapMutations(['setPause', 'setExplosion']),

            ...mapActions(['stopGame'])
        },
    }
    
</script>
