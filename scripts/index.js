//Константы для попапа редактирования профиля
const enterEditPopupButton = document.querySelector(".profile__edit-button");
const leaveEditPopupButton = document.querySelector(".popup__close");
const editPopup = document.querySelector("#edit-popup");
const editPopupForm = document.querySelector("#edit-form");

const nameInput = editPopup.querySelector('.popup__form-item[name="nameof"]');
const descriptionInput = editPopup.querySelector(
  '.popup__form-item[name="description"]'
);
const profName = document.querySelector(".profile__name");
const profDescr = document.querySelector(".profile__caption");
const cardsContainer = document.querySelector(".element");

//Темплейт
const cardTemplate = document.querySelector("#card-template").content;

//Константы для попапа добавления карточек
const addPopup = document.querySelector("#add-popup");
const enterAddPopupButton = document.querySelector(".profile__add-button");
const leaveAddPopupButton = addPopup.querySelector(".popup__close");
const addCardsForm = document.getElementById("add-form");

//Открытие попапа
function openPopup(selectPopup) {
  selectPopup.classList.add("popup_opened");
}

//Закрытие попапа
function closePopup(selectPopup) {
  selectPopup.classList.remove("popup_opened");
}

//Смотрители за кнопками на открытие/закрытие попапа добавления карточек
enterAddPopupButton.addEventListener("click", () => openPopup(addPopup));
leaveAddPopupButton.addEventListener("click", () => closePopup(addPopup));

//Открытие попапа "редактировать"
function openEditPopup(selectPopup) {
  openPopup(selectPopup);
  nameInput.value = profName.textContent;
  descriptionInput.value = profDescr.textContent;
}

//Смотрители за кнопками на открытие/закрытие редактирования профиля
enterEditPopupButton.addEventListener("click", () => openEditPopup(editPopup));
leaveEditPopupButton.addEventListener("click", () => closePopup(editPopup));

//Сохранение, присвоение дефолтного имени и описания при редактировании профиля
editPopupForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profName.textContent = nameInput.value;
  profDescr.textContent = descriptionInput.value;
  closePopup(editPopup);
});

//Для фулскрина
const fullScreenImage = document.querySelector(".popup__fullscreen-image");
const fullScreenCaption = document.querySelector(".popup__fullscreen-caption");

//Закрытие фулскрина
const closeFullScreenPopup = document.querySelector(".popup__fullscreen-close");
closeFullScreenPopup.addEventListener("click", () => closePopup(full));

// Константа для 6 дефолтных карточек (для темплейта)
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
//Прелоад карточек
function loadCards() {
  initialCards.forEach((card) =>
    cardsContainer.prepend(addCard(card.name, card.link))
  );
}

//Вызов прелоада
loadCards();

function addCard(textdescription, imgLink) {
  const cardElement = cardTemplate
    .querySelector(".element__item")
    .cloneNode(true);

  //Лайки
  cardElement
    .querySelector(".element__button")
    .addEventListener("click", function (like) {
      like.target.classList.toggle("element__button_active");
    });

  //Удаление карточки
  const deleteCard = cardElement.querySelector(".element__delete-item");
  deleteCard.addEventListener("click", function () {
    const card = deleteCard.closest(".element__item");
    card.remove();
  });

  //Фулскрин по клику
  const imageToFull = cardElement.querySelector(".element__image");
  imageToFull.addEventListener("click", function () {
    openPopup(full);
    fullScreenImage.src = imgLink;
    fullScreenImage.alt = `Фото ${textdescription}`;
    fullScreenCaption.textContent = textdescription;
  });

  //Наполнение
  cardElement.querySelector(".element__title").textContent = textdescription;
  const img = cardElement.querySelector(".element__image");
  img.src = imgLink;
  img.setAttribute("alt", `Фото ${textdescription}`);
  return cardElement;
}

//Добавление пользовательских карточек
addCardsForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const nameof = addPopup.querySelector(".popup__form-item[name=nameof]");
  const link = addPopup.querySelector(".popup__form-item[name=link]");
  cardsContainer.prepend(addCard(nameof.value, link.value));
  closePopup(addPopup);
  addCardsForm.reset();
});
