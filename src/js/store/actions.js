import PlayField from "../src/PlayField";

export default {
    
    startGame({commit,getters}) {
        let specs = {width: getters.width, height: getters.height, mines: getters.mines}
        commit('resetTimer'); 
        commit('setPlayField',new PlayField(specs));         
        commit('setPlaying',true); 
        commit('setPause',false)
        commit('setExplosion',false); 
    },
    
    stopGame({commit}) {
        commit('setPlayField', new PlayField())
        commit('setPlaying',false); 
        commit('setPause',false); 
        commit('setExplosion',false); 
    }
    
}
