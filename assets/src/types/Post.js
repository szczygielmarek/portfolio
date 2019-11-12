export default class Post {
    constructor(
        id = null, 
        date = "",
        title = "", 
        excerpt = "", 
        content = "", 
        slug = "", 
        thumbnail = "", 
        featured_image = "", 
        categories = [{}],
        tags = [{}]
    ) {
        this.id = id;
        this.date = new Date(date);
        this.title = title;
        this.excerpt = excerpt;
        this.content = content;
        this.slug = slug;
        this.thumbnail = thumbnail;
        this.featured_image = featured_image;
        this.categories = categories;
        this.tags = tags;
    }

    get categoriesList() {
        return this.categories.map(cat => cat.name).join(", ");
    }

    get tagsList() {
        return this.tags.map(tag => tag.name).join(", ");
    }

    get localDate() {
        let {date} = this;
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    }

}