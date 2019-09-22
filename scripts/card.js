import { api, cardsContainer } from '../src/index.js';

export class Card {

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