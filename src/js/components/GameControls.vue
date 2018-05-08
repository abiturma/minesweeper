<template>
    <div class="d-flex justify-content-between">
        <b-button size="sm" variant="outline-secondary" @click="setPause(true)">
            Pause
        </b-button>
        <b-button size="sm" variant="outline-danger" @click="stopGame()">
            Spiel beenden
        </b-button>
    </div>
</template>

<script>
    
    import {mapMutations, mapActions} from 'vuex';

    export default {

        props: {},

        computed: {},

        methods: {

            ...mapMutations(['setPause']),
            
            ...mapActions(['stopGame'])
        },
    }
    
</script>
