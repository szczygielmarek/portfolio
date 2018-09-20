<template>
    <div class="c-culture u-relative">

        <div class="c-culture__overlay o-overlay">
            <div class="row no-gutters justify-content-between align-items-end">
                <div class="col-12 col-sm-auto">
                    <iframe :src="spotify" class="c-culture__spotify" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                </div>
                <div class="col-12 col-sm-auto">
                    <iframe :src="ekstraklasa" class="c-culture__ekstraklasa" width="300" height="445" frameborder="0"></iframe>
                </div>
            </div>
        </div>       

        <div v-if="gallery" class="c-gallery">
            <div v-for="image in gallery" :key="image.ID" class="c-gallery__col">
                <img :src="image.sizes.large" alt="" class="c-gallery__img">
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
    }
}
</script>
