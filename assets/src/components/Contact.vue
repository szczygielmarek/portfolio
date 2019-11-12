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
                :images="page.featured_image_sizes">
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
import { SET_LOADING, FETCH_PAGE_BY_SLUG, SET_PAGE, SET_ABOUT } from './../store/mutation-types';
import { mapState, mapMutations, mapActions } from 'vuex';

import Page from './../types/Page';

import HeaderBaner from './HeaderBaner.vue';
import Footer from './Footer.vue';

export default {
    computed: {
        ...mapState([
            'page',
            'loading'
        ])
    },
    watch: {
        loading(val) {
            if(!val)
                this.$store.commit(SET_ABOUT, false);
        }
    },
    components: {
        "header-baner": HeaderBaner,
        "page-footer": Footer
    },
    beforeCreate() {
        this.$store.commit(SET_LOADING, true);
    },
    mounted() {  
        this.$store.dispatch(FETCH_PAGE_BY_SLUG, 'contact') //TODO: get slug from this.$route
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
            FETCH_PAGE_BY_SLUG
        ])
    }
}
</script>
