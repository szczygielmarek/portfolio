export default class Page {
    constructor(
        id = null, 
        date = "",
        title = "", 
        excerpt = "", 
        content = "", 
        slug = "", 
        thumbnail = "", 
        featured_image = "",
        featured_image_sizes = null,
        dominant_image_color = "",
        acf = {}
    ) {
        this.id = id;
        this.date = new Date(date);
        this.title = title;
        this.excerpt = excerpt;
        this.content = content;
        this.slug = slug;
        this.thumbnail = thumbnail;
        this.featured_image = featured_image,
        this.featured_image_sizes = featured_image_sizes,
        this.dominant_image_color = dominant_image_color,
        this.acf = acf
    }

    get localDate() {
        let {date} = this;
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    }

}