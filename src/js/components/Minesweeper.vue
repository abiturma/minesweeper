<template>
    <div>
        <div v-if="playing" class="play-field-wrapper">
            <game-timer></game-timer>
            <play-field></play-field>
            <game-controls></game-controls>
        </div>

        <div v-else>
            <main-menu></main-menu>
        </div>
        
        <in-game-messages></in-game-messages>
    </div>

</template>

<script>

    import PlayField from './PlayField.vue';
    import GameTimer from './GameTimer.vue';
    import MainMenu from './MainMenu.vue';
    import InGameMessages from './InGameMessages.vue';
    import GameControls from './GameControls.vue'; 
    import {mapState} from 'vuex';

    export default {

        components: {
            PlayField,
            GameTimer,
            MainMenu,
            InGameMessages,
            GameControls
        },

        computed: {
            ...mapState(['playing']),
        },

    }
    
</script>
