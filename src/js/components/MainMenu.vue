<template>
    <div>
        <b-row>
            <b-col>
                <b-form-group label="Schwierigkeitsgrad">
                    <b-form-radio-group v-model.number="level"
                                        :options="levelOptions"
                                        value-field="level"
                                        text-field="name"
                    >
                    </b-form-radio-group>
                </b-form-group>
            </b-col>
        </b-row>

        <b-row v-if="!level">
            <b-col>
                <div class="form-group">
                    <label>Höhe</label>
                    <input type="number" v-model.number="height" class="form-control">
                </div>
            </b-col>
            <b-col>

                <div class="form-group">
                    <label>Breite</label>
                    <input type="number" v-model.number="width" class="form-control">
                </div>
            </b-col>
            <b-col>

                <div class="form-group">
                    <label>Minen</label>
                    <input type="number" v-model.number="mines" class="form-control">
                </div>
            </b-col>
        </b-row>
        <b-button variant="primary" @click="startGame()">
            Los geht's
        </b-button>
    </div>

</template>

<script>

    import Levels from '../config/levels';
    import {mapState, mapMutations, mapActions} from 'vuex';

    export default {


        props: {},

        computed: {

            ...mapState({
                givenHeight: 'givenHeight',
                givenWidth: 'givenWidth',
                givenMines: 'givenMines',
                givenLevel: 'level'
            }),

            height: {

                get: (vm) => vm.givenHeight,

                set(value) {
                    this.setHeight(value)
                }
            },

            width: {

                get: (vm) => vm.givenWidth,

                set(value) {
                    this.setWidth(value)
                }
            },

            mines: {

                get: (vm) => vm.givenMines,

                set(value) {
                    this.setMines(value)
                }
            },

            level: {

                get: (vm) => vm.givenLevel,

                set(value) {
                    this.setLevel(value)
                }
            },


            levelOptions() {
                return [...Levels, {level: 0, name: 'Maßgeschneidert'}]
            }

        },

        methods: {

            ...mapMutations(['setHeight', 'setWidth', 'setMines', 'setLevel']),
            
            ...mapActions(['startGame'])

        },
    }
    
</script>
