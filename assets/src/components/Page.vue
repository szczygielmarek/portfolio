<template>
    <div class="p-page o-page">

        <!-- LOADER -->
        <div class="pre-loader"></div>
        <div :class="{'loader--active': loading}" class="loader"><div class="sprite"></div></div>

        <div class="p-page__content o-page__content">

            <div>
                <div>{{ page.title }}</div>
            </div>

        </div>

    </div>
</template>

<script>
import Page from './../types/Page';
import PageService from './../services/page.services';
import { GlobalEvents } from './../global-events.js';

export default {
    data () {
        return {
            page: new Page(),
            loading: {
                type: Boolean,
                default: true
            }
        }
    },
    created() {        
        this.fetchPage();
    },
    watch: {
        '$route': 'fetchPage'
    },
    methods: {
        fetchPage() {
            PageService
                .getPageBySlug(this.$route.params.id)
                .then(page => {
                    this.page = page;
                    this.loading = false;
                    this.$emit('loaded');
                    GlobalEvents.$emit('page-loaded');
                });  
        }
    }
}
</script>

<style>

</style>


