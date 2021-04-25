import React from 'react';
import closeIco from '../images/Close_ico.svg';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.openPopup ? 'popup__opened' : ''}`}>
      <div className="popup__content">
        <form name={`${props.name}`} className="popup__form" onSubmit={props.onSubmit}>
          <button type="reset" className="popup__close" onClick={props.closePopup}>
            <img alt={`${props.title}-крестик`} src={closeIco} className="popup__image" />
          </button>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button type="submit" className="popup__button">{props.buttonTitleSubmit}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;