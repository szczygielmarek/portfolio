<template>
    <div class="c-culture u-relative">

        <div class="c-culture__overlay o-overlay">
            <div class="row no-gutters justify-content-between align-items-end">
                <div class="col-12 col-sm-auto">
                    <iframe title="Muzyka" :data-src="spotify" class="js-lazy c-culture__spotify" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                </div>
                <div class="col-12 col-sm-auto">
                    <iframe title="Wyniki sportowe (piłkarskie)" :data-src="ekstraklasa" class="js-lazy c-culture__ekstraklasa" width="300" height="445" frameborder="0"></iframe>
                </div>
            </div>
        </div>       

        <div v-if="gallery" class="c-gallery">
            <div v-for="image in gallery" :key="image.ID" class="c-gallery__col">
                <img :data-src="image.sizes.large" alt="" class="js-lazy c-gallery__img">
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props: {
        gallery: Array,
        spotify: String,
        ekstraklasa: String
    },
    mounted() {
        this.initLazyLoading(this.$el.querySelectorAll('.js-lazy'));
    },
    methods: {
        initLazyLoading(elems) {
            if(!elems) return;

            if("IntersectionObserver" in window) {

                const options = {
                    rootMargin: '0px 0px 640px 0px',
                    treshold: 0
                }

                const handleIntersect = (entries, observer) => {
                    entries.forEach((entry) => {
                        if(entry.isIntersecting) {
                            let elem = entry.target;
                            elem.src = elem.dataset.src;
                            elem.classList.remove('.js-lazy');
                            lazyObserver.unobserve(elem);
                        }
                    });
                };

                const lazyObserver = new IntersectionObserver(handleIntersect, options);
                elems.forEach((elem) => {
                    lazyObserver.observe(elem);
                });

            } else {
                this.lazy.forEach((elem) => {
                    elem.src = elem.dataset.src;
                });
            }
        }
    }
}
</script>
