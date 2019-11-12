const REST_URL = wp.rest_url + 'wp/v2';

export default {
    
    getOptions() {
        return fetch(REST_URL + '/acf/options')
            .then(res => res.json())
            .then(options => {
                return {
                    about_image: options.about_image.sizes.large
                }
            });
    }

}