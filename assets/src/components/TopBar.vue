<template>
    <div ref="topbar" class="m-top-bar o-container-padding">

        <div class="row justify-content-between">
            <div class="m-top-bar__col col-auto m-top-bar__col">
                <router-link :to="{path: distUrl}" class="effect-stroke">
                    {{ title }}
                    <span :data-letters="title"></span>
                    <span :data-letters="title"></span>
                </router-link>
            </div>
            <div class="m-top-bar__col col-auto m-top-bar__col">
                <a @click.prevent="toggleMenu" href="#" class="effect-stroke">
                    {{ isMenuOpen ? 'close' : 'menu' }}
                    <span :data-letters="isMenuOpen ? 'close' : 'menu'"></span>
                    <span :data-letters="isMenuOpen ? 'close' : 'menu'"></span>
                </a>
            </div>
        </div>

        <menu-modal 
            @close="closeMenu" 
            :imageabout="imageabout" 
            :visible="isMenuOpen">
        </menu-modal>
        
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    import throttle from 'lodash/throttle';
    import MenuModal from './MenuModal.vue';
    
    export default {
        data: function() {
            return {
                title: "",
                isMenuOpen: false
            }
        },
        props: {
            imageabout: String
        },
        computed: mapState([
            'loading'
        ]),
        watch: {
            loading(val) {
                if(!val) {
                    document.body.classList.remove('menu-open');
                }
            }
        },
        components: {
            "menu-modal": MenuModal
        },
        mounted() {
            this.getWebsiteTitle();
            
            window.addEventListener('scroll', throttle(this.toggleSticky, 250));
        },
        methods: {
            async getWebsiteTitle() {
                try {
                    var response = await fetch(wp.rest_url + '?_fields=name').then(res => res.json());
                    this.title = response.name;
                } catch(error) {
                    console.error(error);
                }
            },
            toggleMenu() {
                this.isMenuOpen = !this.isMenuOpen;
                document.body.classList.toggle('menu-open');

                // window.scrollTo({
                //     top: 0,
                //     behavior: "smooth"
                // });
            },
            closeMenu() {
                this.isMenuOpen = false;
                document.body.classList.remove('menu-open');
            },
            toggleSticky() {    
                if(window.pageYOffset > 25) {
                    this.$refs.topbar.classList.add("m-top-bar--sticky");
                } else {
                    this.$refs.topbar.classList.remove("m-top-bar--sticky");
                }
            }
        }
    }
</script>