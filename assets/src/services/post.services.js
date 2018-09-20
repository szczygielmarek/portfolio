const REST_URL = wp.rest_url + 'wp/v2';

import Post from './../types/Post';

export default {

    getPosts() {
        return fetch(REST_URL + '/posts?_embed')
            .then(res => res.json())
            .then(posts => posts.map(post => {
                let featured_image = post.featured_media ? post._embedded['wp:featuredmedia']['0'].source_url : null;
                let thumbnail = post.featured_media ? post._embedded['wp:featuredmedia'][0]['media_details']['sizes']['thumbnail'].source_url : null;

                return new Post(
                    post.id, 
                    post.date, 
                    post.title.rendered, 
                    post.excerpt.rendered,
                    post.content.rendered,
                    post.slug,
                    thumbnail,
                    featured_image,
                    post._embedded['wp:term'][0], //categories
                    post._embedded['wp:term'][1] //tags
                )
            }))
    },

    getPost(id) {
        return fetch(REST_URL + '/posts/' + id + '?_embed')
            .then(res => res.json())
            .then(post => {
                let featured_image = post.featured_media ? post._embedded['wp:featuredmedia']['0'].source_url : null;
                let thumbnail = post.featured_media ? post._embedded['wp:featuredmedia'][0]['media_details']['sizes']['thumbnail'].source_url : null;

                return new Post(
                    post.id, 
                    post.date, 
                    post.title.rendered, 
                    post.excerpt.rendered,
                    post.content.rendered,
                    post.slug,
                    thumbnail,
                    featured_image,
                    post._embedded['wp:term'][0], //categories
                    post._embedded['wp:term'][1] //tags
                ) 
            });
    },

    getPostBySlug(slug) {
        return fetch(REST_URL + '/posts?slug=' + slug + '&_embed')
            .then(res => res.json())
            .then(res => {
                let post = res[0];
                
                let featured_image = post.featured_media ? post._embedded['wp:featuredmedia']['0'].source_url : null;
                let thumbnail = post.featured_media ? post._embedded['wp:featuredmedia'][0]['media_details']['sizes']['thumbnail'].source_url : null;

                return new Post(
                    post.id, 
                    post.date, 
                    post.title.rendered, 
                    post.excerpt.rendered,
                    post.content.rendered,
                    post.slug,
                    thumbnail,
                    featured_image,
                    post._embedded['wp:term'][0], //categories
                    post._embedded['wp:term'][1] //tags
                ) 
            });
    }

}