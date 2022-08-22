export class Note {
    id;
    country;
    city;
    name;
    comment;
    date
    
    constructor(id, country, city, name, comment, date) {
        this.id = id;
        this.country = country;
        this.city = city;
        this.name = name;
        this.comment = comment;
        this.date = date;
    }
}