import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm title='Редактировать профиль' name='formProfile' buttonTitleSubmit='Cохранить' openPopup={props.openPopup} closePopup={props.closePopup} onSubmit={handleSubmit}>
      <input
        id="popup__span_profile-title"
        value={name || ''}
        onChange={handleNameChange}
        name="profileName"
        placeholder="Имя"
        type="text"
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_name_title"
        required
      />
      <span
        id="profileNameError"
        className="popup__span popup__span_profile-title-error"
      ></span>
      <input
        id="popup__span_profile-subtitle"
        value={description || ''}
        onChange={handleDescriptionChange}
        name="profileProfession"
        placeholder="О себе"
        type="text"
        minLength="2"
        maxLength="200"
        className="popup__input popup__input_name_subtitle"
        required
      />
      <span
        id="profileProfessionError"
        className="popup__span popup__span_profile-subtitle-error"
      ></span>
    </PopupWithForm>
  )
}


export default EditProfilePopup