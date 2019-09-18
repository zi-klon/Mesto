/* ОБЪЯВЛЕНИЯ КЛАССОВ */

class Card {

  constructor(image, title, likes, id, ownerId) {
    this.image = image;
    this.title = title;
    this.likes = likes;
    this.id = id;
    this.ownerId = ownerId;
    this.cardElement = this.create(this.image, this.title, this.likes, this.ownerId);
    this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like.bind(this));
    this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove.bind(this)); 
  }

  create() {
    const { image, title, likes, ownerId } = this;

    const placeCard = document.createElement('div');
    const cardImage = document.createElement('div');
    const deleteButton = document.createElement('button');
    const cardDescription = document.createElement('div');
    const cardName = document.createElement('h3');
    const likeContainer = document.createElement('div');
    const likeButton = document.createElement('button');
    const likeCounter = document.createElement('p');

    placeCard.classList.add('place-card');
    cardImage.classList.add('place-card__image');
    cardImage.setAttribute('style', `background-image: url(${image})`);
    deleteButton.classList.add('place-card__delete-icon');
    cardDescription.classList.add('place-card__description');
    cardName.classList.add('place-card__name');
    cardName.textContent = title;
    likeContainer.classList.add('place-card__like-container');    
    likeButton.classList.add('place-card__like-icon');
    if (this.isLiked()) {
      likeButton.classList.add('place-card__like-icon_liked');
    };
    likeCounter.classList.add('place-card__like-counter');
    likeCounter.textContent = likes.length;
      
    placeCard.insertAdjacentElement('afterbegin', cardImage);
    placeCard.insertAdjacentElement('beforeend', cardDescription);
    cardImage.insertAdjacentElement('afterbegin', deleteButton);
    cardDescription.insertAdjacentElement('afterbegin', cardName);
    cardDescription.insertAdjacentElement('beforeend', likeContainer);
    likeContainer.insertAdjacentElement('afterbegin', likeButton);
    likeContainer.insertAdjacentElement('beforeend', likeCounter);

    if (ownerId == 'a5ca59aee08c96592e55f073') {
      deleteButton.style = 'display: block';
    };
      
    return placeCard;
  }

  like() {
    if(this.isLiked()) {
      api.dislikeThisCard(this.id)
      .then((result) => {
        this.cardElement.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
        this.cardElement.querySelector('.place-card__like-counter').textContent = result.likes.length;
        this.likes = result.likes;
      })  
      .catch((err) => {
        console.log(err);
      });
    } else {
      api.likeThisCard(this.id)
      .then((result) => {
        this.cardElement.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
        this.cardElement.querySelector('.place-card__like-counter').textContent = result.likes.length;
        this.likes = result.likes;
      })  
      .catch((err) => {
        console.log(err);
      });
    }
  }
    
  remove() {

    if(window.confirm('Are you sure, you want to remove this card?')) {
      api.deleteCard(this.id)
      .then(() => {
        cardsContainer.container.removeChild(this.cardElement)
      })
      .catch((err) => {
        console.log(err);
      });
    }  
  }

  isLiked() {
    let like = this.likes.some(item => item._id == 'a5ca59aee08c96592e55f073');
    if (like) {
      return true;
    } else {
      return false;
    }  
  }
}

class CardList {

  constructor(container, array) {
    this.container = container;
    this.defaultCards = array;
    this.render();
  }

  addCard (image, title, likes, id, ownerId) {
    const { cardElement } = new Card(image, title, likes, id, ownerId);

    this.container.appendChild(cardElement);
  }

  render () {
    for (const card of this.defaultCards) {
      this.addCard(card.link, card.name, card.likes, card._id, card.owner._id);
    }
  }
}

class Popup {
    
  constructor(title) {
    this.title = title;
    this.container = this.create(this.title);
    this.container.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
  }

  create () {
    const popup = document.createElement('div');
    const popupContent = document.createElement('div');
    const popupClose = document.createElement('img');
    const popupTitle = document.createElement('h3');
    const form = document.createElement('form');
    const inputHigher = document.createElement('input');
    const inputLower = document.createElement('input');
    const errorHigher = document.createElement('p');
    const errorLower = document.createElement('p');
    const button = document.createElement('button');

    popup.classList.add('popup');
    popupContent.classList.add('popup__content');
    popupClose.classList.add('popup__close');
    popupClose.src = './images/close.svg';
    popupClose.alt = " ";
    popupTitle.classList.add('popup__title');
    popupTitle.textContent = this.title;
    form.classList.add('popup__form');
    inputHigher.classList.add('popup__input');
    inputHigher.classList.add('popup__input_type_name');
    inputHigher.id = 'input';
    inputHigher.type = 'text';
    inputHigher.minlength = '2';
    inputHigher.maxlength = '30';
    inputHigher.required =  'true';
    inputLower.classList.add('popup__input');
    inputLower.classList.add('popup__input_type_link-url');
    inputLower.id = 'input';
    inputLower.required = 'true';
    errorHigher.classList.add('error');
    errorHigher.classList.add('error__higher');
    errorLower.classList.add('error');
    errorLower.classList.add('error__lower');
    button.classList.add('button');
    button.classList.add('popup__button');

    popup.appendChild(popupContent);
    popupContent.appendChild(popupClose);
    popupContent.appendChild(popupTitle);
    popupContent.appendChild(form);
    form.appendChild(inputHigher);
    form.appendChild(errorHigher);
    form.appendChild(inputLower);
    form.appendChild(errorLower);
    form.appendChild(button);

    return popup;
  }

  open() {
    this.container.classList.add('popup_is-opened');
  }

  close() {
    this.container.classList.remove('popup_is-opened');
    document.querySelector('.root').removeChild(this.container);
  }    
}

class EditProfile extends Popup {
  constructor(title) {
        
    super(title);
    this.container.querySelector('.popup__form').addEventListener('submit', this.newProfile);
  }

  getAtributes () {
    const inputHigher = this.container.querySelector('.popup__input_type_name');
    const inputLower = this.container.querySelector('.popup__input_type_link-url');
    const button = this.container.querySelector('.popup__button');
    const errorHigher = this.container.querySelector('.error__higher');
    const errorLower = this.container.querySelector('.error__lower');
    const form = this.container.querySelector('.popup__form');

    form.name = 'profile';
    inputHigher.placeholder = 'Имя';
    inputLower.placeholder = 'О себе';
    inputHigher.name = 'username';
    inputHigher.value = document.querySelector('.user-info__name').textContent;
    inputLower.value = document.querySelector('.user-info__job').textContent;
    inputLower.name = 'userinfo';
    inputLower.type = 'text';
    inputLower.minlength = '2';
    inputLower.maxlength = '30';
    button.textContent = 'Сохранить';
    button.classList.add('popup__button_profile');
    errorHigher.id = 'error-username';
    errorLower.id = 'error-userinfo';
  }

  newProfile (event) {
        
    event.preventDefault();

    api.editUserData(this.elements.username.value, this.elements.userinfo.value)
    .then((result) => {
      document.querySelector('.user-info__name').textContent = result.name;
      document.querySelector('.user-info__job').textContent = result.about;
      closePopup();
    })
    .catch((err) => {
      console.log(err);
    }); 

    renderButton();
  }
}

class AddCard extends Popup {
  constructor(title) {
        
    super(title);
    this.container.querySelector('.popup__form').addEventListener('submit', this.newCard);
  }

  getAtributes () {
    const inputHigher = this.container.querySelector('.popup__input_type_name');
    const inputLower = this.container.querySelector('.popup__input_type_link-url');
    const button = this.container.querySelector('.popup__button');
    const errorHigher = this.container.querySelector('.error__higher');
    const errorLower = this.container.querySelector('.error__lower');
    const form = this.container.querySelector('.popup__form');

    form.name = 'new';
    inputHigher.placeholder = 'Название';
    inputLower.placeholder = 'Ссылка на картинку';
    inputHigher.name = 'name';
    inputLower.name = 'link';
    inputLower.type = 'url';
    button.textContent = '+';
    errorHigher.id = 'error-name';
    errorLower.id = 'error-link';
    button.classList.add('popup__button_disabled');
  }

  newCard(event) {
        
    event.preventDefault();

    api.addUserCard(this.elements.link.value, this.elements.name.value)
    .then((result) => {
      cardsContainer.addCard(result.link, result.name, result.likes, result._id, result.owner._id);
      closePopup();
    })
    .catch((err) => {
      console.log(err);
    });

    renderButton();
  }
}

class Avatar {
    
  constructor(title) {
    this.title = title;
    this.container = this.create(this.title);
    this.container.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
    this.container.querySelector('.popup__form').addEventListener('submit', this.newAvatar);
  }

  create () {
    const popup = document.createElement('div');
    const popupContent = document.createElement('div');
    const popupClose = document.createElement('img');
    const popupTitle = document.createElement('h3');
    const form = document.createElement('form');
    const input = document.createElement('input');
    const error = document.createElement('p');
    const button = document.createElement('button');

    popup.classList.add('popup');
    popupContent.classList.add('popup__content');
    popupClose.classList.add('popup__close');
    popupClose.src = './images/close.svg';
    popupClose.alt = " ";
    popupTitle.classList.add('popup__title');
    popupTitle.textContent = this.title;
    form.classList.add('popup__form');
    input.classList.add('popup__input');
    input.classList.add('popup__input_type_link-url');
    input.id = 'input';
    input.type = 'url';
    input.name = 'link';
    input.required =  'true';
    error.classList.add('error');
    error.classList.add('error__higher');
    error.id = 'error-link';
    button.classList.add('button');
    button.classList.add('popup__button');
    button.classList.add('popup__button_disabled');
    button.textContent = '+';

    popup.appendChild(popupContent);
    popupContent.appendChild(popupClose);
    popupContent.appendChild(popupTitle);
    popupContent.appendChild(form);
    form.appendChild(input);
    form.appendChild(error);
    form.appendChild(button);

    return popup;
  }

  open() {
    this.container.classList.add('popup_is-opened');
  }

  close () {
    this.container.classList.remove('popup_is-opened');
    document.querySelector('.root').removeChild(this.container);
  }
  
  newAvatar(event) {

    event.preventDefault();

    api.setAvatar(this.elements.link.value);

    renderButton();
  }
}