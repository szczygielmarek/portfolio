<template>
    <div class="p-about o-page" :class="{'p-about--start': !loading}">

        <!-- LOADER -->
        <div class="pre-loader"></div>
        <div :class="{'loader--active': loading}" class="loader"><div class="sprite"></div></div>

        <div class="p-about__content o-page__content">

            <!-- HEADER -->
            <header-baner v-if="page.featured_image_sizes" 
                :title="page.title"
                :className="'p-about__heading'" 
                :images="page.featured_image_sizes"
                @pageLoaded="pageLoaded">
            </header-baner>

            <!-- CONTENT -->
            <main class="p-about__article u-relative o-container-padding">
                
                <!-- BLOCKQUOTE -->
                <blockquote class="p-about__blockquote text-center">
                    <p>
                        Widzę jedno niebezpieczeństwo: samozadowolenie. Tego się boję.
                        <cite>Krzysztof Kieślowski</cite>
                    </p>
                </blockquote>
                
                <section v-for="(section, index) in sections" :key="index" class="p-about__section">
                    <h2 class="p-about__section-h2">
                        {{ section.name }}
                    </h2>
                    <!-- TIMELINE -->
                    <timeline v-if="section.acf_fc_layout === 'timeline'" :entries="section.items" :summary="section.summary"></timeline>
                    <!-- GRID TOOLS -->
                    <grid-tools v-if="section.acf_fc_layout === 'tools'" :icons="section.icons"></grid-tools>
                    <!-- CULTURE -->
                    <culture v-if="section.acf_fc_layout === 'culture'" :gallery="section.gallery" :spotify="section.spotify" :ekstraklasa="section.ekstraklasa"></culture>
                </section>

            </main>

        </div>

    </div>
</template>

<script>
import Page from './../types/Page';
import PageService from './../services/page.services';

import { GlobalEvents } from './../global-events';

import HeaderBaner from './HeaderBaner.vue';
import Timeline from './Timeline.vue';
import GridTools from './GridTools.vue';
import Culture from './Culture.vue';

export default {
    data () {
        return {
            page: new Page(),
            sections: {},
            loading: {
                type: Boolean,
                default: true
            }
        }
    },
    components: {
        "header-baner": HeaderBaner,
        "timeline": Timeline,
        "grid-tools": GridTools,
        "culture": Culture
    },
    mounted() {        
        this.fetchPage();
    },
    watch: {
        '$route': 'fetchPage'
    },
    methods: {
        fetchPage() {
            PageService
                .getPageBySlug('about')
                .then(page => {
                    this.page = page;
                    this.sections = page.acf.sections
                });  
        },
        pageLoaded() {
            this.loading = false;
            // this.$emit('loaded');
            GlobalEvents.$emit('page-loaded', 'about');
        }
    }
}
</script>

<style>
    
</style>


