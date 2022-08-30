const mainDiv = document.querySelector('.gallery');

mainDiv.addEventListener("click", e => {
    let active = e.target;
    active.classList.add("active");
    let parentActiveClass = active.parentNode.classList.value;
    let numberCard =parentActiveClass.match(/\d+/)[0];

    let stars = [];
    let activeHelp = active;

    while (activeHelp.nextSibling) {
        activeHelp = activeHelp.nextSibling;
        activeHelp.nodeType == 1 && activeHelp.classList.remove("active");
    }

    while (active.previousSibling) {
        active = active.previousSibling;
        active.classList.add("active");
        active.nodeType == 1 && stars.push(active);
    }

    let arr = document.querySelectorAll('.card');

    localStorage.setItem(numberCard, stars.length + 1);
} );

fetch('heroes.json')
    .then(response => response.json())
    .then(result => {
        let heroes = [];
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            heroes.push(new Hero(item).createNewElement(i));
            };
    });

class Hero {
    constructor(element) {
        this.person = element.person;
        this.alterego = element.alterego;
        this.occupation = element.occupation;
        this.friends = element.friends;
        this.superpowers = element.superpowers;
        this.photo = element.photo;
        this.more = element.more;
    }

    createStarRating(i) {
        const rating = document.createElement('div');
        rating.classList.add("rating-stars");
        rating.classList.add("block" + i);

        let star = [];
        for (let j = 0; j < 10; j++) {
            star[j] = document.createElement('span');
            star[j].classList.add("star");
            rating.append(star[j]);
        }
        if (localStorage.getItem(i)) {
            for (let k = 0; k < localStorage.getItem(i); k++) {
                star[k].classList.add("active");
            }
        }

        return rating;
    }

    createCardHeader() {
        const person = document.createElement('h3');
        person.classList.add("card__header");
        person.textContent = this.person;

        return person;
    }

    createPhoto() {
        const photo = document.createElement('img');
        photo.classList.add("card__img");
        photo.src = this.photo;
        photo.alt = this.person;
        
        return photo;
    }

    createText() {
        const text = document.createElement('p');
        text.classList.add("card__text");
        
        return text;
    }

    createNewElement(i) {
        const card = document.createElement('div');
        card.classList.add("card");
        mainDiv.append(card);
    
        card.append(this.createCardHeader());

        let text = this.createText();
        text.innerHTML = `<span class="card__text_bold">Альтер эго:</span> ${this.alterego}`;
        card.append(text);

        text = this.createText();
        text.innerHTML = `<span class="card__text_bold">Род деятельности:</span> ${this.occupation}`;
        card.append(text);

        text = this.createText();
        text.innerHTML = `<span class="card__text_bold">Друзья:</span> ${this.friends}`;
        card.append(text);

        text = this.createText();
        text.innerHTML = `<span class="card__text_bold">Суперсилы:</span> ${this.superpowers}`;
        card.append(text);

        card.append(this.createPhoto());

        text = this.createText();
        text.innerHTML = `<span class="card__text_bold">Подробнее:</span> ${this.more}`;
        card.append(text);

        card.append(this.createStarRating(i));
    
        return card;
    }
}