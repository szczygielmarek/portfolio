<template>
    <picture v-if="images" class="o-overlay">
        <source v-for="(img, index) in sortedImages" :key="index" :srcset="img.source_url" :media="`(max-width: ${img.width}px)`">
        <source :srcset="images.full.source_url" media="(min-width: 2000px)">
        <img ref="img" :src="images.large.source_url" alt="" class="u-object-fit-cover">
    </picture>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        images: Object
    },
    computed: {
        sortedImages() {
            let { images } = this;
        
            return Object
                .keys(images).sort((a, b) => {
                    return images[a].width - images[b].width;
                }).map((key) => {
                    return images[key];
                }).filter((obj) => {
                    return obj.width >= 1024 && obj.width <= 2600;
                });
        }
    },
    mounted() {
        this.imgLoad();
    },
    methods: {
        imgLoad() {
            let { img } = this.$refs;

            img.onload = (e) => {
                this.$emit('imgLoaded');
            };

            img.onerror = (e) => {
                
            };
        }
    }
}
</script>

