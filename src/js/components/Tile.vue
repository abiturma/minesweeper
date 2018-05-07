<template>
    <div class="tile"
         @mousedown="mouseDown"
         @mouseup="mouseUp"
         @click="show=true"
         @contextmenu.prevent="flag"
         :class="clicked ? 'active' : ''"
    >
        <div class="tile--inner" :class="tileClass">
            <template v-if="show && !hasBomb">
                <span class="tile--inner__counter" :class="counterClass">{{adjacentBombs || ''}}</span>
            </template>
           
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'; 
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

            fields: {
                type: Object,
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

            hasBomb() {
                return this.fields[this.x+ '#' + this.y].isBomb;
            },

            adjacentBombs() {
                
                return _(this.fields).filter((field) => Math.abs(field.x-this.x)<=1 && Math.abs(field.y - this.y)<=1)
                        .filter('isBomb')
                        .size()
                    - this.hasBomb;
            },

            tileClass() {
                return {
                    bomb: this.hasBomb && this.show,
                    flagged: this.isFlagged,
                    shown: this.show && !this.hasBomb,
                    bordered: !this.show && !this.isFlagged,
                    active: this.clicked
                }
            },

            counterClass() {
                return this.adjacentBombs ? 'level-' + this.adjacentBombs : '';
            }

        },

        methods: {

            revealIfEmpty(point) {
                if (
                    Math.abs(this.x - point.x) <= 1
                    && Math.abs(this.y - point.y) <= 1
                    && !this.hasBomb
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
                if (!this.adjacentBombs) {
                    setTimeout(() => events.$emit('emptyTile', {x: this.x, y: this.y}), 30)
                }
                this.isFlagged = false;
                
                if (this.hasBomb) {
                    events.$emit('boom');
                }
                
                this.$emit('revealed')
            }
        },

        created() {
            events.$on('emptyTile', this.revealIfEmpty)
        }
    }
</script>

<style lang="scss" scoped>

    $blue: #0000ff;
    $orange: #ffaa00;
    $red: #aa0000;
    $darkGrey: #aaa;
    $frame: #777;
    $lightGrey: #ccc;
    $tileBackground: #ddd;

    .tile {
        box-sizing: content-box;
        height: 30px;
        width: 30px;
        border: 1px solid $frame;
        border-width: 0 1px 1px 0;
        background-color: $tileBackground;
    }
    
    .tile.active:hover {
        background-color: darken($tileBackground, 20);
        .tile--inner.bordered {
            border-color: darken($darkGrey, 10) darken($lightGrey, 10) darken($lightGrey, 10) darken($darkGrey, 10);
        }
    }

    .tile:hover {
        background-color: darken($tileBackground, 10);
        .tile--inner.bordered {
            border-color: darken($lightGrey, 10) darken($darkGrey, 10) darken($darkGrey, 10) darken($lightGrey, 10);
        }
    }

    .tile .flagged {
        background: url(../../img/flag.svg);
        background-size: 24px 24px; 
        background-position: center; 
        opacity: 0.6
    }

    .tile .shown, .tile .flagged {
        background-color: white;
    }

    .tile .bomb {
        background-image: url(../../img/mine.svg);
        background-size: 30px 30px; 
        background-position: center;
    }

    .tile--inner {
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        transition: background-color 0.3s;
    }

    .tile--inner.bordered {
        border: 2px solid;
        border-color: $lightGrey $darkGrey $darkGrey $lightGrey;
    }

    .level-1 {
        color: $blue;
    }

    .level-2 {
        color: $orange
    }

    .level-3 {
        color: darken($orange, 10)
    }

    .level-4 {
        color: darken($orange, 20)
    }

    .level-5 {
        color: lighten($red, 20);
    }

    .level-6 {
        color: lighten($red, 10);
    }

    .level-7 {
        color: $red;
    }

    .level-8 {
        color: darken($red, 10)
    }


</style>