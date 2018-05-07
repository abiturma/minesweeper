import Vue from 'vue'
import Minesweeper from './components/Minesweeper.vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);

window.events = new Vue(); 

new Vue({
    
    el: '#app',
    components: {
        Minesweeper
    }
    
})