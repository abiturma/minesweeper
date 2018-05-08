<template>
        <div class="play-field">
            <div class="block" v-if="pause">
                <div class="block-inner">
                    ...Pause...
                </div>
            </div>
            <div class="play-field--row" v-for="y in height">
                <tile v-for="x in width" :x="x-1" :y="y-1" :key="x +'#' + y"></tile>
            </div>
        </div>
</template>

<script>

    import Tile from './Tile.vue'
    import {mapState, mapGetters} from 'vuex';

    export default {

        components: {
            Tile
        },

        computed: {

            ...mapState(['pause']),

            ...mapGetters(['height', 'width']),
        },
       
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
        margin-bottom: 10px; 
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