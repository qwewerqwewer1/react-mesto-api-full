import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm title='Добавить карточку' name='formAddCards' buttonTitleSubmit='Добавить' openPopup={props.openPopup} closePopup={props.closePopup} onSubmit={handleSubmit} >
      <input
        id="popup__span_add-title"
        name="addCardName"
        type="text"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        className="popup__input popup__input_name_cardtitle"
        onChange={handleNameChange}
        value={name}
        required
      />
      <span
        id="addCardNameError"
        className="popup__span popup__span_add-title-error"
      ></span>
      <input
        id="popup__span_add-url"
        name="addCardUrl"
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_url_cardtitle"
        onChange={handleLinkChange}
        value={link}
        required
      />
      <span
        id="addCardUrlError"
        className="popup__span popup__span_add-url-error"
      ></span>
    </PopupWithForm>
  )

}
export default AddPlacePopup