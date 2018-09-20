<template>
    <div class="p-contact o-page">

        <!-- LOADER -->
        <div class="pre-loader"></div>
        <div :class="{'loader--active': loading}" class="loader"><div class="sprite"></div></div>

        <div class="p-contact__content o-page__content d-flex flex-column justify-content-end">
            
            <!-- HEADER -->
            <header-baner v-if="page.featured_image_sizes" 
                :title="page.title"
                :className="'p-contact__heading'" 
                :images="page.featured_image_sizes"
                @pageLoaded="pageLoaded">
            </header-baner>

            <!-- CONTENT -->
            <div class="p-contact__article u-relative o-container-padding">
                <div class="row no-gutters justify-content-between">
                    <div class="col-auto">
                        <span>E-mail: </span>
                        <a href="mailto:mszczygiel.poczta@gmail.com">
                            mszczygiel.poczta@gmail.com
                        </a>
                    </div>
                    <div class="col-auto">
                        <span>Tel.: </span>
                        <a href="tel:516651787">
                            516 651 787
                        </a>
                    </div>
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

import { GlobalEvents } from './../global-events';

import HeaderBaner from './HeaderBaner.vue';
import Footer from './Footer.vue';

export default {
    data() {
        return {
            page: new Page(),
            loading: {
                type: Boolean,
                default: true
            }
        }
    },
    components: {
        HeaderBaner,
        "page-footer": Footer
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
                .getPageBySlug('contact')
                .then(page => {
                    this.page = page;
                });  
        },
        pageLoaded() {
            this.loading = false;
            // this.$emit('loaded');
            GlobalEvents.$emit('page-loaded');
        }
    }
}
</script>
