import Vue from 'vue'
import Minesweeper from './components/Minesweeper.vue'
import BootstrapVue from 'bootstrap-vue'
import store from './store'; 

Vue.use(BootstrapVue);

window.events = new Vue(); 

new Vue({
    
    el: '#app',
    store: store,
    components: {
        Minesweeper
    }
    
})