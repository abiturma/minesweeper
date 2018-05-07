<template>
        <h5>Spielzeit: {{elapsedTime}}</h5>
</template>

<script>
    
    import moment from 'moment'; 
    
    export default {

        props: {
            
            value: null,
            
            pause: {
                type: Boolean, 
                default: false
            }
        },

        computed: {
            
            elapsedTime() {
                return moment.utc(moment.duration(this.seconds,'seconds').as('milliseconds')).format('HH:mm:ss');     
            }
        },

        data() {
            return {
                seconds: 0,
            }
        },
        
        methods: {
            
            increment() {
                if(!this.pause) {
                    this.seconds ++; 
                    this.$emit('input',this.seconds)
                }
            }
            
            
        },
        
        created() {
            setInterval(this.increment ,1000); 
        }
    }
</script>

<style scoped>

</style>