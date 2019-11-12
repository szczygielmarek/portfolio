const REST_URL = wp.rest_url + 'wp/v2';

import Page from './../types/Page';

export default {
    
    getPage(id) {
        return fetch(REST_URL + '/pages/' + id + '?_embed&_fields=id,date,slug,title,content,excerpt,featured_media')
            .then(res => res.json())
            .then(page => {
                let featured_image = page.featured_media ? page._embedded['wp:featuredmedia']['0'].source_url : null;
                let thumbnail = page.featured_media ? page._embedded['wp:featuredmedia'][0]['media_details']['sizes']['thumbnail'].source_url : null;
                let featured_image_sizes =  page.featured_media ? page._embedded['wp:featuredmedia'][0]['media_details']['sizes'] : null;
                let dominant_image_color = page.featured_media ? page._embedded['wp:featuredmedia'][0]['dominant_color_hex'] : null;

                return new Page(
                    page.id, 
                    page.date, 
                    page.title.rendered, 
                    page.excerpt.rendered,
                    page.content.rendered,
                    page.slug,
                    thumbnail,
                    featured_image,
                    featured_image_sizes,
                    dominant_image_color,
                    page.acf
                );
            });
    },

    getPageBySlug(slug) {
        return fetch(REST_URL + '/pages?slug=' + slug + '&_embed')
            .then(res => res.json())
            .then(res => {                
                let page = res[0];

                let featured_image = page.featured_media ? page._embedded['wp:featuredmedia']['0'].source_url : null;
                let thumbnail = page.featured_media ? page._embedded['wp:featuredmedia'][0]['media_details']['sizes']['thumbnail'].source_url : null;
                let featured_image_sizes =  page.featured_media ? page._embedded['wp:featuredmedia'][0]['media_details']['sizes'] : null;
                let dominant_image_color = page.featured_media ? page._embedded['wp:featuredmedia'][0]['dominant_color_hex'] : null;

                return new Page(
                    page.id, 
                    page.date, 
                    page.title.rendered, 
                    page.excerpt.rendered,
                    page.content.rendered,
                    page.slug,
                    thumbnail,
                    featured_image,
                    featured_image_sizes,
                    dominant_image_color,
                    page.acf
                );
            });
    }

}