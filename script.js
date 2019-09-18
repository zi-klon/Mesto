const api = new Api('http://95.216.175.5/cohort2', 'ca578415-0f2a-4f10-baae-9836fbf9dafe');
  
api.getUserData()
.then((result) => {
  document.querySelector('.user-info__name').textContent = result.name;
  document.querySelector('.user-info__job').textContent = result.about;
  document.querySelector('.user-info__photo').style = `background-image: url(${result.avatar})`;
})
.catch((err) => {
  console.log(err);
}) 

let cardsContainer = {};

api.getInitialCards()
.then((result) => {
  const newCardList = new CardList(document.querySelector('.places-list'), result);
  cardsContainer = newCardList;
})
.catch((err) => {
    console.log(err);
});