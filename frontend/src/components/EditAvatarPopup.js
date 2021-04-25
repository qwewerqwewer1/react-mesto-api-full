import React from 'react';
import PopupWithForm from './PopupWithForm';



function EditAvatarPopup(props) {

  const avaRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avaRef.current.value,
    });

  }
  return (
    <PopupWithForm title='Обновить Аватар' name='formPhoto' buttonTitleSubmit='Cохранить' openPopup={props.openPopup} closePopup={props.closePopup} onSubmit={handleSubmit}>
      <input
        ref={avaRef}
        id="popup__span_photo-url"
        name="inputPhoto"
        type="url"
        minLength="2"
        placeholder="URL"
        className="popup__input popup__input_url_photo"
        required
      />
      <span
        id="avatar-link"
        className="popup__span popup__span_photo-url-error"
      ></span>
    </PopupWithForm>
  )

}

export default EditAvatarPopup