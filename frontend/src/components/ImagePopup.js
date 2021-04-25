import React from 'react';
import closeIco from '../images/Close_ico.svg';

function ImagePopup(props) {
  return (
    <div className={`popup popup_lightbox ${props.card ? 'popup__opened' : ''}`}>
      <div className="popup__container popup__container_lightbox">
        <figure className="lightbox">
          <img alt={props.card ? props.card.name : ''} src={props.card ? props.card.link : '#'} className="lightbox__image" />
          <figcaption className="lightbox__title">{props.card ? props.card.name : ''}</figcaption>
        </figure>
        <button className="popup__close popup__close_lightbox" onClick={props.onClose} type="button">
          <img
            alt="Плюс"
            className="popup__image"
            src={closeIco}
          />
        </button>
      </div>
    </div>
  )
}

export default ImagePopup;