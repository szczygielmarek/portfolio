<template>
    <div class="p-portfolio o-page">

        <!-- LOADER -->
        <div class="pre-loader"></div>
        <div :class="{'loader--active': loading}" class="loader"><div class="sprite"></div></div>

        <div class="p-portfolio__content o-page__content">

            <div>
                <div>Project</div>
            </div>

        </div>

    </div>
</template>

<script>
import { GlobalEvents } from './../global-events.js';

export default {
    data () {
        return {
            loading: {
                type: Boolean,
                default: true
            }
        }
    },
    created() {        
        this.loading = false;
        this.$emit('loaded');
        GlobalEvents.$emit('page-loaded');
    },
    watch: {
        
    },
    methods: {
        
    }
}
</script>


