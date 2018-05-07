<template>
    <div>
        <div v-if="start" class="play-field-wrapper">
            <game-timer :pause="pause || gameOver" v-model="elapsedTime"></game-timer>
            <play-field :bombs="finalBombs"
                        :height="finalHeight"
                        :width="finalWidth"
                        :hide="pause"
                        @gameOver="gameOver=true"></play-field>
            <div class="d-flex justify-content-between">

                <b-button size="sm" variant="outline-secondary" @click="pause=true">
                    Pause
                </b-button>

                <b-button size="sm" variant="outline-danger" @click="start=false">
                    Spiel beenden
                </b-button>
            </div>


            <b-modal id="pause-modal"
                     size="lg"
                     title="Gewonnen!"
                     v-model="gameOver"
                     ok-only
                     ok-title="Yeah - lass nochmal spielen!"
                     @ok="start=false"
            >
                <p class="my-4">Du hast alle Felder aufgedeckt und das Spiel gewonnen</p>
                <p class="my-4">Spielzeit: {{formattedTime}}</p>
            </b-modal>

            <b-modal id="pause-modal" size="lg" title="Pause!" v-model="pause" ok-only ok-title="Weiter geht's">
                <p class="my-4">Das Spiel ist pausiert. Klicke unten um weiterzuspielen...</p>
            </b-modal>


            <b-modal id="explosion-modal" size="lg" title="Boom!"
                     v-model="explosion"
                     cancel-variant="danger"
                     @cancel="start=false"
                     ok-title="Weiter geht's"
                     cancel-title="Spiel beenden"
            >
                <p class="my-4">Da hast Du eine Mine erwischt!</p>
            </b-modal>


        </div>
        <div v-else>
            <b-form>
                <b-row>
                    <b-col>
                        <b-form-group label="Schwierigkeitsgrad">
                            <b-form-radio-group id="radios1"
                                                v-model.number="level"
                                                :options="levelOptions"
                                                name="radioOpenions">
                            </b-form-radio-group>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row v-if="!level">
                    <b-col>
                        <div class="form-group">
                            <label>Höhe</label>
                            <input type="number" v-model="height" class="form-control">
                        </div>
                    </b-col>
                    <b-col>

                        <div class="form-group">
                            <label>Breite</label>
                            <input type="number" v-model="width" class="form-control">
                        </div>
                    </b-col>
                    <b-col>

                        <div class="form-group">
                            <label>Minen</label>
                            <input type="number" v-model="bombs" class="form-control">
                        </div>
                    </b-col>
                </b-row>
                <b-button variant="primary" @click="start=true">
                    Los geht's
                </b-button>
            </b-form>
        </div>
    </div>


</template>

<script>

    import PlayField from './PlayField.vue';
    import GameTimer from './GameTimer.vue';
    import moment from 'moment'; 

    export default {

        props: {},

        components: {
            PlayField,
            GameTimer
        },

        data() {
            return {
                level: 1,
                height: 10,
                width: 10,
                bombs: 10,
                start: false,
                pause: false,
                explosion: false,
                gameOver: false,
                elapsedTime: 0, 
            }
        },

        computed: {

            levelOptions() {
                return [
                    {value: 1, text: 'Anfänger'},
                    {value: 2, text: 'Fortgeschrittene'},
                    {value: 3, text: 'Profis'},
                    {value: 0, text: 'Maßgeschneidert'},
                ]
            },
            
            formattedTime() {
                return moment.utc(moment.duration(this.elapsedTime,'seconds').as('milliseconds')).format('HH:mm:ss');
            },

            levelStats() {
                let stats = {
                    1: {
                        height: 8,
                        width: 8,
                        bombs: 10
                    },

                    2: {
                        height: 16,
                        width: 16,
                        bombs: 40
                    },

                    3: {
                        height: 16,
                        width: 30,
                        bombs: 99
                    }
                }

                return stats[this.level];
            },


            finalHeight() {
                if (this.levelStats) {
                    return this.levelStats.height;
                }

                return Math.max(1, this.height);

            },

            finalWidth() {
                if (this.levelStats) {
                    return this.levelStats.width;
                }

                return Math.max(1, this.width);
            },

            finalBombs() {
                if (this.levelStats) {
                    return this.levelStats.bombs;
                }
                return Math.min(this.bombs, this.finalWidth * this.finalHeight);
            }


        },

        methods: {},

        created() {
            events.$on('boom', () => this.explosion = true)
        }
    }
</script>

<style scoped>

    .play-field-wrapper {
        margin-top: 20px;
        width: fit-content
    }

    .play-field {
        margin-bottom: 10px;
    }


</style>