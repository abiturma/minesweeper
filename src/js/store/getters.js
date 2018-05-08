import moment from 'moment';
import levels from '../config/levels'; 
import _ from 'lodash'; 

export default {

    elapsedTime(state) {
        return moment.utc(moment.duration(state.elapsedTimeInSeconds, 'seconds').as('milliseconds')).format('HH:mm:ss');
    },
    
    currentLevel(state) {
        return _.find(levels,{level:state.level});     
    },
    
    height(state,getters) {
        if(getters.currentLevel) {
            return getters.currentLevel.height; 
        }
        return Math.max(1,state.givenHeight); 
    },
    
    width(state,getters) {
        if(getters.currentLevel) {
            return getters.currentLevel.width;
        }
        return Math.max(1,state.givenWidth);
    },
    
    mines(state,getters) {
        if (getters.currentLevel) {
            return getters.currentLevel.mines;
        }
        return Math.min(state.givenMines, getters.width * getters.height);
    },
    
    gameOver(state) {
        return state.playField.gameOver()
    }
    
    
    


}
