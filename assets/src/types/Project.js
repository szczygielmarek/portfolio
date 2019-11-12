export default class Project {
    constructor(
        id = null, 
        date = "",
        slug = "", 
        title = "", 
        content = "", 
        excerpt = "", 
        featured_image = "", 
        thumbnail = "", 
        dominant_image_color = "", 
        acf = {}
    ) {
        this.id = id;
        this.date = new Date(date);
        this.slug = slug;
        this.title = title;
        this.content = content;
        this.excerpt = excerpt;
        this.featured_image = featured_image;
        this.thumbnail = thumbnail;
        this.dominant_image_color = dominant_image_color;
        this.acf = acf;
    }

    get localDate() {
        let {date} = this;
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    }
    
}