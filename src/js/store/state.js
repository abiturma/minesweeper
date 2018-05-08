import Playfield from '../src/PlayField'; 

export default {
    
    elapsedTimeInSeconds: 0, 
    
    playField: new Playfield(),
    
    playing: false, 
    
    pause: false,
    
    explosion: false, 
    
    level: 1,
    
    givenWidth: 10,
    
    givenHeight: 10,
    
    givenMines: 10 
}
