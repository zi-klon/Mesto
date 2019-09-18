class Api {

  constructor(baseUrl, authorization) { 
    this.baseUrl = baseUrl;
    this.authorization = authorization;
  }
  
  getUserData() {
    return fetch(`${this.baseUrl}/users/me`,{
      headers: {
      authorization: this.authorization
    }
    })
    .then(res => {
      if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    })  
  }
  
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
      authorization: this.authorization
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json();
        }
      return Promise.reject(`Ошибка: ${res.status}`);
    })  
  }
  
  editUserData(userName, userInfo) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userName,
        about: userInfo
      })
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
  
  addUserCard(ImageUrl, CardName) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: CardName,
        link: ImageUrl
      })
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
  
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.authorization
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })  
  }
  
  likeThisCard(cardId) {
    return fetch(`${this.baseUrl}/cards/like/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this.authorization
      }  
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
  
  dislikeThisCard(cardId) {
    return fetch(`${this.baseUrl}/cards/like/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.authorization
      }  
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
  
  setAvatar(url) {
    fetch('http://95.216.175.5/cohort2/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: 'ca578415-0f2a-4f10-baae-9836fbf9dafe',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: url
      })
    })
    .then(res => {
      if(res.ok) {
      return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      document.querySelector('.user-info__photo').style = `background-image: url(${result.avatar})`;        
      closePopup();
    })
    .catch((err) => {
    console.log(err);
    }); 
  }
}