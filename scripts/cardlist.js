import { Card } from './card.js';

export class CardList {

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