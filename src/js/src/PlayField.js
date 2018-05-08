import _ from 'lodash'; 

export default class PlayField {


    constructor(specs) {
        
        if(!specs || _.isEmpty(specs)) {
            this.field = {}; 
            return; 
        }
        
        this.field = this._buildField(specs.height, specs.width, specs.mines)
    }
    
    
    getFieldByCoordinates(x,y) {
        return this.field[x+'#'+y]; 
    }
    
    adjacentMines(field) {
        return _(this.adjacentFields(field)).filter('isMine').size() - field.isMine;
    }
    
    adjacentFields({x,y}) {
        return _(this.field).filter((field) => Math.abs(field.x-x)<=1 && Math.abs(field.y - y)<=1).value(); 
    }
    
    revealField({x,y}) {
        let field = this.getFieldByCoordinates(x,y)   
        if(field) {
            field.revealed = 1; 
        }
    }
    
    gameOver() {
        if(_.isEmpty(this.field)) {
            return false; 
        } 
        return _(this.field).reject((field) => field.revealed || field.isMine).isEmpty();
    }

    _buildField(height, width, mines) {

        let x, y;
        let minesLeft = mines;
        let fieldsLeft = height * width;
        let result = {};
        for (x = 0; x < width; x++) {
            for (y = 0; y < height; y++) {
                let revealed = 0;
                let adjacent = 0;
                let isMine = this._roll(minesLeft / fieldsLeft);
                minesLeft -= isMine;
                result[x + '#' + y] = {x, y, isMine, revealed, adjacent};
                fieldsLeft--;
            }
        }
        return result;

    }

    _roll(probability) {
        return Math.random() < probability ? 1 : 0;
    }
    
    
    
}
    

