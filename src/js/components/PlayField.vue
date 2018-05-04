<template>
    <div class="play-field">
        <div class="play-field--row" v-for="y in height">
            <tile v-for="x in width" :x="x-1" :y="y-1" :fields="fields"></tile>
        </div>
    </div>
</template>

<script>

    import Tile from './Tile.vue'
    import _ from 'lodash';

    export default {

        props: {
            width: {
                type: Number,
                default: 10
            },
            height: {
                type: Number,
                default: 10
            },
            bombs: {
                type: Number,
                default: 10
            }
        },

        data() {
            return {
                fields: this.buildFields()
            }
        },

        components: {
            Tile
        },

        computed: {},

        methods: {

            buildFields() {

                let x, y;
                let bombsLeft = this.bombs;
                let fieldsLeft = this.height * this.width;
                let result = [];
                for (y = 0; y < this.height; y++) {
                    result[y] = [];
                    for (x = 0; x < this.width; x++) {
                        let isBomb = this.roll(bombsLeft / fieldsLeft);
                        bombsLeft -= isBomb;
                        result[y][x] = isBomb;
                        fieldsLeft--;
                    }
                }
                return result;

            },

            roll(propability) {
                return Math.random() < propability ? 1 : 0;
            }

        },

    }
</script>

<style scoped>
    .play-field {
        display: flex;
    }

    .play-field--row {
        display: flex;
        flex-direction: column;
    }
</style>