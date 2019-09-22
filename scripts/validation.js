export { checkInput, validation };

/* Блокировка/разблокировка сабмита */
function checkInput(element) {
  
    element = event.target;
      
    const inputs = Array.from(element.closest('form').elements);
    const button = element.closest('form').querySelector('button');
    let isValidForm = true;
      
    inputs.forEach((item) => {
      
      if(item.id == 'input') {
    
        if(!item.checkValidity()) {
          isValidForm = false;
        }
      }
    });
      
    if (!isValidForm) {
      button.setAttribute('disabled', true);
      button.classList.add('popup__button_disabled');
    } else {
      button.removeAttribute('disabled');
      button.classList.remove('popup__button_disabled');
    }
  }
      
  /* Валидация форм */  
  const validation = function(element) {
    element = event.target;
    const errorElement = document.querySelector(`#error-${element.name}`);
    
    function showErrorMessage(element) {
      errorElement.classList.add('error_active');
    }
    
    function hideErrorMessage(element) {
      errorElement.classList.remove('error_active');
    }
    
    function validate (element) {
      errorElement.textContent = 'Это обязательное поле';
    }
    
    function validateByLength (element) {
      errorElement.textContent = 'Должно быть от 2 до 30 символов';
    }
    
    if (element.type !== 'url'){
     
      if (element.value == 0) {
        validate(element);
        showErrorMessage(element);
    
      } else if (element.value.length == 1 || element.value.length > 30) {
        validateByLength(element);
        showErrorMessage(element);
    
      } else {
      hideErrorMessage(element);
      }
   
    } else {
    
      if (element.value == 0) {
        validate(element);
        showErrorMessage(element);
    
      } else if (!element.checkValidity()) {
        errorElement.textContent = 'Здесь должна быть ссылка';
        showErrorMessage(element);
    
      } else {
        hideErrorMessage(element);
      }
    }
  }