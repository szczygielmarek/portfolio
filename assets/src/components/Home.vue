<template>
    <!-- PAGE -->
    <div class="o-page p-home">
        
        <!-- LOADER -->
        <div class="pre-loader"></div>
        <div :class="{'loader--active': loading}" class="loader"><div class="sprite"></div></div>
       
        <div class="o-page__content u-overflow-hidden d-flex flex-column justify-content-between">

            <picture-fit v-if="page.featured_image_sizes" :images="page.featured_image_sizes"></picture-fit>

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
        
            <!-- PWA -->
            <div class="pwa">
                <a class="" href="https://developers.google.com/web/progressive-web-apps/checklist" title="Progressive Web App" target="_blank" rel="noopener">
                    Progressive Web App
                </a>
            </div>

            <!-- FOOTER -->
            <page-footer></page-footer>

        </div>

    </div>
</template>

<script>
import { SET_LOADING, FETCH_PAGE, SET_PAGE, SET_ABOUT } from './../store/mutation-types';
import { mapState, mapActions, mapMutations } from 'vuex';

import Page from './../types/Page';

import Footer from './../components/Footer.vue';
import PictureFit from './../components/PictureFit.vue';
import GridIcons from './../components/GridIcons.vue';

export default {
    data () {
        return {
            pageId: 7
        }
    },
    computed: mapState([
        'page',
        'loading'
    ]),
    watch: {
        loading(val) {
            if(!val)
                this.$store.commit(SET_ABOUT, false);
        }
    },
    components: {
        "picture-fit": PictureFit,
        "grid-icons": GridIcons,
        "page-footer": Footer
    },
    beforeCreate() {
        this.$store.commit(SET_LOADING, true);
    },
    mounted() { 
        this.$store.dispatch(FETCH_PAGE, this.pageId);
    },
    beforeDestroy() {
        this.$store.commit(SET_PAGE, new Page());
        this.$store.commit(SET_LOADING, true);
    },
    methods: {
        ...mapMutations([
            SET_LOADING,
            SET_ABOUT
        ]),
        ...mapActions([
           FETCH_PAGE
        ])
    }
}
</script>


