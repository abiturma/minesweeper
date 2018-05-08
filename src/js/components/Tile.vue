<template>
    <div class="tile"
         @mousedown="mouseDown"
         @mouseup="mouseUp"
         @click="show=true"
         @contextmenu.prevent="flag"
         :class="clicked ? 'active' : ''"
    >
        <div class="tile--inner" :class="tileClass">
            <template v-if="show && !isMine">
                <span class="tile--inner__counter" :class="counterClass">{{adjacentMines || ''}}</span>
            </template>
           
        </div>
    </div>
</template>

<script>
    
    import {mapState, mapMutations} from 'vuex'; 
    
    export default {

        props: {
            x: {
                type: Number,
                required: true,
            },

            y: {
                type: Number,
                required: true
            },

        },

        data() {
            return {
                clicked: false, 
                show: false,
                isFlagged: false,
            }
        },

        computed: {

            ...mapState(['playField']),
            
            field() {
                return this.playField.getFieldByCoordinates(this.x,this.y)
            },
            
            isMine() {
                return this.field.isMine;
            },

            adjacentMines() {
                return this.playField.adjacentMines(this.field)
            },

            tileClass() {
                return {
                    bomb: this.isMine && this.show,
                    flagged: this.isFlagged,
                    shown: this.show && !this.isMine,
                    bordered: !this.show && !this.isFlagged,
                    active: this.clicked
                }
            },

            counterClass() {
                return this.adjacentMines ? 'level-' + this.adjacentMines : '';
            }

        },

        methods: {

            ...mapMutations(['revealField','setExplosion']),
            
            revealIfEmpty(point) {
                if (
                    Math.abs(this.x - point.x) <= 1
                    && Math.abs(this.y - point.y) <= 1
                    && !this.isMine
                ) {
                    this.show = true;
                }
            },
            
            mouseDown(e) {
                this.clicked = true;
            },
            
            mouseUp(e) {
                this.clicked= false; 
            },
            
            flag() {
                if(this.show) {
                    return ; 
                }
                this.isFlagged = !this.isFlagged
            }


        },

        watch: {
            show(show) {
                
                if (!show) {
                    return;
                }
                
                if (!this.adjacentMines && !this.isMine) {
                    setTimeout(() => events.$emit('emptyTile',this.field), 30)
                }
                
                this.isFlagged = false;
                
                if (this.isMine) {
                    this.setExplosion(true); 
                }
                
                this.revealField(this.field); 
            }
        },

        created() {
            events.$on('emptyTile', this.revealIfEmpty)
        }
    }
    
</script>

<style scoped>

    .tile .flagged {
        background: url(../../img/flag.svg);
        background-size: 24px 24px;
        background-position: center;
        opacity: 0.6
    }

    .tile .bomb {
        background-image: url(../../img/mine.svg);
        background-size: 30px 30px;
        background-position: center;
    }

    .tile .shown, .tile .flagged {
        background-color: white;
    }

</style>