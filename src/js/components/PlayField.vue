<template>
        <div class="play-field">
            <div class="play-field-block" v-if="pause">
                <div class="play-field-block-inner">
                    ...Pause...
                </div>
            </div>
            <div class="play-field-row" v-for="y in height">
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
