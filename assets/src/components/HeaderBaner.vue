<template>
    <header class="c-header-baner u-relative">
        <picture-fit :images="images" @imgLoaded="imageLoaded"></picture-fit>

        <h1 ref="heading" class="headlineBg u-relative" :class="[className]">{{ title }}</h1>
    </header>
</template>

<script>
import throttle from 'lodash/throttle';

import PictureFit from './PictureFit.vue';

export default {
    data() {
        return {

        }
    },
    props: {
        title: String,
        className: {
            required: false,
            type: String,
            default: ''
        },
        images: {}
    },
    components: {
        'picture-fit': PictureFit
    },
    mounted() {
        window.addEventListener('scroll', this.scaleTitle);
    },
    destroyed() {
        window.removeEventListener('scroll', this.scaleTitle);
    },
    methods: {
        scaleTitle() {
            let { heading } = this.$refs;
            let offset = window.pageYOffset / 100;
            //let opacity = 1 - ( offset - 1 ) > 1;
            if(offset > 1 && offset < 10) {
                heading.style.transform = `scale(${offset})`;
                //heading.style.opacity = ( opacity < 0 ) ? 0 : opacity;
            }
            else {
                heading.style.transform = "";
                //heading.style.opacity = "";
            }
        },
        imageLoaded() {
            this.$emit('pageLoaded');
        }
    }
}
</script>
