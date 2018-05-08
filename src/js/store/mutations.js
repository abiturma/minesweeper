export default {
    
    resetTimer(state) {
        state.elapsedTimeInSeconds = 0;         
    },
    
    incrementTimer(state) {
        state.elapsedTimeInSeconds++; 
    },
    
    setPlayField(state,field) {
        state.playField = field;     
    },
    
    revealField(state,field) {
        state.playField.revealField(field);     
    },
    
    setHeight(state,height) {
        state.givenHeight = height; 
    },
    
    setWidth(state,width) {
        state.givenWidth = width;     
    },
    
    setMines(state,mines) {
        state.givenMines = mines;     
    },
    
    setLevel(state,level) {
        state.level = level; 
    },
    
    setPlaying(state,playing) {
        state.playing = playing; 
    },
    
    setPause(state, pause) {
        state.pause = pause;
    },
    
    setExplosion(state,explosion) {
        state.explosion = explosion; 
    }
     
}
