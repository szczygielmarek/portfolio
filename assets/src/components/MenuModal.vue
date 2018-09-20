<template>
    <div>

        <!-- BACKGROUND -->
        <div ref="layerBg"
            class="transition-layer" 
            :class="{
                'transition-layer--visible': visible, 
                'transition-layer--opening': visible
            }">
            
            <!-- BG ICON -->
            <div class="o-overlay d-flex align-items-end justify-content-end">
                <i class="fas fa-code transition-layer__icon-bg"></i>
            </div>

        </div>
        
        <!-- CONTENT -->
        <div ref="menuModal" 
            class="m-menu-modal o-container-padding pb-0 container-fluid d-flex flex-column justify-content-between" 
            :class="{'m-menu-modal--visible': visible}"     
        >

            <div class="row justify-content-between u-relative">
                
                <!-- ABOUT -->
                <div class="col-md-6">
                    <div ref="animatedBox" 
                        @click.prevent="openAbout"
                        class="m-menu-modal__img m-menu-modal__img--fade-out u-relative"
                        :class="{'effect-zoom': !isAbout}"
                        :style="{backgroundImage: `url(${imageabout})`}"
                    >

                        <div class="o-overlay d-flex align-items-center justify-content-center">
                            <div class="u-relative">
                                O mnie
                            </div>
                        </div>
                        <span v-if="showRipple" class="m-menu-modal__loader loader-ripple"><span></span><span></span></span>

                    </div>
                </div>

                <!-- MENU -->
                <div class="col-md-5">
                    <ul class="m-menu-modal__menu">
                        <li>
                            <router-link :to="{path: distUrl}" class="effect-stroke">
                                Home
                                <span data-letters="Home"></span>
                                <span data-letters="Home"></span>
                            </router-link>
                        </li>
                        <li>
                            <router-link @click.native.prevent="openAbout" :to="{path: distUrl + 'about'}" class="effect-stroke">
                                O mnie
                                <span data-letters="O mnie"></span>
                                <span data-letters="O mnie"></span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{path: distUrl + 'portfolio'}" class="effect-stroke">
                                Portfolio
                                <span data-letters="Portfolio"></span>
                                <span data-letters="Portfolio"></span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{path: distUrl + 'contact'}" class="effect-stroke">
                                Kontakt
                                <span data-letters="Kontakt"></span>
                                <span data-letters="Kontakt"></span>
                            </router-link>
                        </li>
                    </ul>
                </div>
                
            </div>

            <!-- FOOTER -->
            <page-footer :classNames="'m-page-footer--menu'"></page-footer>
            
        </div>

    </div>
</template>

<script>
import { GlobalEvents } from './../global-events.js';

import Footer from './../components/Footer.vue';

export default {
    data() {
        return {
            modalWidth: 0,
            modalHeight: 0,
            modalRatio: 0,
            boxWidth: 0,
            boxHeight: 0,
            boxDimensions: {},
            showRipple: false
        }
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        imageabout: String,
        isAbout: Boolean
    },
    components: {
        "page-footer": Footer
    },
    mounted() {
        this.setBoxImage();

        GlobalEvents.$on('page-loaded', () => {
            setTimeout(() => {
                this.fadeMenu();
            }, 400);
        });
    },
    methods: {
        setBoxImage() {
            let { animatedBox, menuModal } = this.$refs;

            this.boxDimensions = animatedBox.getBoundingClientRect();

            this.modalWidth = menuModal.clientWidth;
            this.modalHeight = menuModal.clientHeight;
            
            this.modalRatio = this.modalHeight / this.modalWidth * 100;
            animatedBox.style.paddingTop = `${this.modalRatio}%`;
            this.boxWidth = animatedBox.clientWidth;
            this.boxHeight = animatedBox.clientHeight;
            animatedBox.style.width = `${this.boxWidth}px`;
            animatedBox.style.height = `${this.boxHeight}px`;
            animatedBox.style.paddingTop = "";
        },
        openAbout(e) {
            if(this.isAbout) {
                this.fadeMenu();
                return;
            } 

            document.body.classList.add("no-preload");

            let { animatedBox } = this.$refs;
            let { modalWidth, modalHeight } = this;
            let { left: offsetLeft, top: offsetTop } = this.boxDimensions;

            animatedBox.classList.remove('m-menu-modal__img--fade-out');
            //animatedBox.classList.add('m-menu-modal__img--blur');
            animatedBox.style.zIndex = 9;
            animatedBox.style.transform = `translate(-${offsetLeft}px, -${offsetTop}px)`;   
            animatedBox.style.width = `${modalWidth}px`; 
            animatedBox.style.height = `${modalHeight}px`;

            this.fetchAbout();

            setTimeout(() => {
                this.showRipple = true;
            }, 400);
        },
        fetchAbout() {
            this.$router.push({ path: this.$root.distUrl + 'about' });
        },
        fadeMenu() {
            let { layerBg } = this.$refs;
            layerBg.style.display = "none";
            this.closeMenu();
            setTimeout(() => {
                layerBg.style.display = "";
            }, 400);
        },
        closeMenu() {
            let { animatedBox } = this.$refs;
            let { boxWidth, boxHeight } = this;

            document.body.classList.remove("no-preload");

            animatedBox.classList.add('m-menu-modal__img--fade-out');
            //animatedBox.classList.remove('m-menu-modal__img--blur');
            animatedBox.style.zIndex = "";
            animatedBox.style.transform = "";   
            animatedBox.style.width = `${boxWidth}px`;
            animatedBox.style.height = `${boxHeight}px`;

            this.showRipple = false;
            this.$emit('close');
        },
    }
}
</script>
