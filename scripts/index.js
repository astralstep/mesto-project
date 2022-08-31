//Константы для попапа редактирования профиля
const editButton = document.querySelector(".profile__edit-button");
const exeditButton = document.querySelector(".popup__close");
const editPopup = document.querySelector("#edit-popup");

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
const addButton = document.querySelector(".profile__add-button");
const exaddButton = addPopup.querySelector(".popup__close");
const addCards = document.getElementById("add-form");

//Открытие попапа "добавить"
function popupaddOpen(selectPopup) {
  selectPopup.classList.add("popup_opened");
}

//Закрытие попапа "добавить"
function popupaddClose(selectPopup) {
  selectPopup.classList.remove("popup_opened");
}

//Смотрители за кнопками на открытие/закрытие попапа добавления карточек
addButton.addEventListener("click", () => popupaddOpen(addPopup));
exaddButton.addEventListener("click", () => popupaddClose(addPopup));

//Открытие попапа "редактировать"
function popupOpen(selectPopup) {
  selectPopup.classList.add("popup_opened");
  nameInput.value = profName.textContent;
  descriptionInput.value = profDescr.textContent;
}

//Закрытие попапа "редактировать"
function popupClose(selectPopup) {
  selectPopup.classList.remove("popup_opened");
}

//Смотрители за кнопками на открытие/закрытие редактирования профиля
editButton.addEventListener("click", () => popupOpen(editPopup));
exeditButton.addEventListener("click", () => popupClose(editPopup));

//Сохранение, присвоение дефолтного имени и описания при редактировании профиля
editPopup.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profName.textContent = nameInput.value;
  profDescr.textContent = descriptionInput.value;
  popupClose(editPopup);
});

//Для фулскрина
const fullpop = document.querySelector("#full");
const fullscreen = document.querySelector(".popup__fullscreen-image");
const fsCaption = document.querySelector(".popup__fullscreen-caption");

//Закрытие фулскрина
const closefullsc = document.querySelector(".popup__fullscreen-close");
closefullsc.addEventListener("click", () => popupClose(full));

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
function cardLoader() {
  initialCards.forEach((card) =>
    cardsContainer.prepend(cardAdd(card.name, card.link))
  );
}

//Вызов прелоада
cardLoader();

function cardAdd(textdescription, imgLink) {
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
  const imagetofull = cardElement.querySelector(".element__image");
  imagetofull.addEventListener("click", function () {
    popupaddOpen(full);
    fullscreen.src = imgLink;
    fullscreen.alt = `Фото ${textdescription}`;
    fsCaption.textContent = textdescription;
  });

  //Наполнение
  cardElement.querySelector(".element__title").textContent = textdescription;
  const img = cardElement.querySelector(".element__image");
  img.src = imgLink;
  img.setAttribute("alt", `Фото ${textdescription}`);
  return cardElement;
}

//Добавление пользовательских карточек
addCards.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const nameof = addPopup.querySelector(".popup__form-item[name=nameof]");
  const link = addPopup.querySelector(".popup__form-item[name=link]");
  cardsContainer.prepend(cardAdd(nameof.value, link.value));
  popupaddClose(addPopup);
  addCards.reset();
});
