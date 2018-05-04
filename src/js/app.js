import Vue from 'vue'
import Minesweeper from './components/Minesweeper.vue'

window.events = new Vue(); 

new Vue({
    
    el: '#app',
    components: {
        Minesweeper
    }
    
})