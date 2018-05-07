<template>
    <div class="play-field">
        <div class="block" v-if="hide">
            <div class="block-inner">
                ...Pause...
            </div>
        </div>
        <div class="play-field--row" v-for="y in height">
            <tile v-for="x in width" :x="x-1" :y="y-1" :fields="fields" :key="x +'#' + y" @revealed="reveal(x-1,y-1)"></tile>
        </div>
    </div>
</template>

<script>

    import Tile from './Tile.vue'

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
            },
            hide: {
                type: Boolean,
                default: false
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

        computed: {
            
            gameOver() {
                return _(this.fields).reject((field) => field.open || field.isBomb).isEmpty(); 
            }
            
        },

        methods: {

            buildFields() {

                let x, y;
                let bombsLeft = this.bombs;
                let fieldsLeft = this.height * this.width;
                let result = {};
                for (x = 0; x < this.width; x++) {
                    for (y = 0; y < this.height; y++) {
                        let open = 0;
                        let isBomb = this.roll(bombsLeft / fieldsLeft);
                        bombsLeft -= isBomb;
                        result[x + '#' + y] = {x, y, isBomb, open};
                        fieldsLeft--;
                    }
                }
                return result;

            },

            roll(propability) {
                return Math.random() < propability ? 1 : 0;
            },

            reveal(x,y) {
                this.fields[x + '#' + y].open = 1;
            }
            
        },
        
        watch: {
            gameOver(value) {
                if(value) {
                    this.$emit('gameOver')
                }    
            }
        }

    }
</script>

<style scoped>

    .block {
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 2;
        background-color: #ddd;
        opacity: 0.85;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .block-inner {
        color: #000;
        font-size: 40px;
        font-weight: bold;
    }

    .play-field {
        display: flex;
        position: relative;
        flex-direction: column;
    }

    .play-field.hide {
        opacity: 0.2;
    }

    .play-field--row {
        display: flex;
    }

    .play-field--row /deep/ .tile:first-child {
        border-width: 0 1px 1px 1px;
    }

    .play-field--row:first-child /deep/ .tile {
        border-width: 1px 1px 1px 0px;
    }

    .play-field--row:first-child /deep/ .tile:first-child {
        border-width: 1px 1px 1px 1px;
    }

</style>