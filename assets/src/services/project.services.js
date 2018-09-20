const REST_URL = wp.rest_url + 'wp/v2';

import Project from '../types/Project';

export default {

    getProjects() {
        return fetch(REST_URL + '/projects?_fields=_links,id,date,title,slug,featured_media,content,excerpt,acf&_embed=true')
            .then(res => res.json())
            .then(projects => projects.map(project => {
                let featured_image = project.featured_media ? project._embedded['wp:featuredmedia']['0'].source_url : null;
                let thumbnail = project.featured_media ? project._embedded['wp:featuredmedia'][0]['media_details']['sizes']['thumbnail'].source_url : null;
                let dominant_image_color = project.featured_media ? project._embedded['wp:featuredmedia'][0]['dominant_color_hex'] : null;

                return new Project(
                    project.id,
                    project.date,
                    project.slug,
                    project.title.rendered,
                    project.content.rendered,
                    project.excerpt.rendered,
                    featured_image,
                    thumbnail,
                    dominant_image_color,
                    project.acf
                );

            }));
    }

}