<template>
    <!-- PAGE -->
    <div class="o-page p-home">
        
        <!-- LOADER -->
        <div class="pre-loader"></div>
        <div :class="{'loader--active': loading}" class="loader"><div class="sprite"></div></div>
       
        <div class="o-page__content u-overflow-hidden d-flex flex-column justify-content-between">

            <picture-fit v-if="page.featured_image_sizes" :images="page.featured_image_sizes" @imgLoaded="pageLoaded"></picture-fit>

            <!-- OVERLAY BG -->
            <div class="o-overlay d-flex align-items-end justify-content-start">
                <i class="fas fa-code p-home__icon-bg"></i>
            </div>

            <div class="row u-relative no-gutters justify-content-end flex-grow-1">
                <div class="col-5">
                    
                    <!-- GRID ICONS -->
                    <grid-icons></grid-icons>
                    

                </div>
            </div>
        
            <!-- FOOTER -->
            <page-footer></page-footer>

        </div>

    </div>
</template>

<script>
import Page from './../types/Page';
import PageService from './../services/page.services';
import { GlobalEvents } from './../global-events.js';

import Footer from './../components/Footer.vue';
import PictureFit from './../components/PictureFit.vue';
import GridIcons from './../components/GridIcons.vue';

export default {
    data () {
        return {
            pageId: 7, //TODO: set front page id
            page: new Page(),
            loading: {
                type: Boolean,
                default: true
            }
        }
    },
    components: {
        "picture-fit": PictureFit,
        "grid-icons": GridIcons,
        "page-footer": Footer
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
                .getPage(this.pageId)
                .then(page => {
                    this.page = page;
                });  
        },
        pageLoaded() {
            this.loading = false;
            //this.$emit('loaded');
            GlobalEvents.$emit('page-loaded');
        }
    }
}
</script>


