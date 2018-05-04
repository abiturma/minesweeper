<template>
    <div class="tile"
         @click="show=true"
         @contextmenu.prevent="isFlagged = !isFlagged"
    >
            <div class="tile--inner" :class="tileClass">
                <template v-if="show">
                    <span class="tile--inner__counter" :class="counterClass">{{adjacentBombs || ''}}</span>
                </template>
            </div>
    </div>
</template>

<script>
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
                type: Array,
                required: true
            },


        },

        data() {
            return {
                show: false,
                isFlagged: false,
            }
        },

        computed: {

            hasBomb() {
                return this.fields[this.y][this.x];
            },

            adjacentBombs() {
                return _(this.fields).filter((row, index) => Math.abs(index - this.y) <= 1)
                        .map((row) => _(row).filter((column, index) => Math.abs(index - this.x) <= 1).sum())
                        .sum()
                    - this.hasBomb;
            },

            tileClass() {
                return {
                    bomb: this.hasBomb && this.show,
                    flagged: this.isFlagged,
                    shown: this.show && !this.hasBomb
                }
            },

            counterClass() {
                return this.adjacentBombs ? 'level-' + this.adjacentBombs : 'test';
            }

        },

        methods: {

            revealIfEmpty(point) {
                if (
                    Math.abs(this.x - point.x) <= 1
                    && Math.abs(this.y - point.y) <= 1
                    && !this.hasBomb
                    && this.adjacentBombs == 0
                ) {
                    this.show = true;
                }
            }


        },

        watch: {
            show(show) {
                if (!show) {
                    return;
                }
                if (!this.adjacentBombs) {
                    events.$emit('emptyTile', {x: this.x, y: this.y});
                }
                this.isFlagged = false;
                if (this.hasBomb) {
                    this.$emit('explode');
                    setTimeout(() => alert('Booom!'), 100);
                }
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

    .tile {
        border-top: 2px grey solid;
        border-left: 2px grey solid;
        border-bottom: 2px black solid;
        border-right: 2px black solid;
        height: 30px;
        width: 30px;
        background-color: #ddd;
    }

    .tile:hover {
        background-color: grey;
    }

    .tile .flagged {
        background-color: green;
        opacity: 0.3;
    }

    .tile .flagged {
        background-color: green;
        opacity: 0.6;
    }

    .tile .shown {
        background-color: white;
    }

    .tile .bomb {
        background-color: black;
    }

    .tile--inner {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        transition: background-color 0.3s;

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