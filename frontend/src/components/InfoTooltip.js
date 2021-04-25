import React from 'react'

import ValidReg from '../images/ValidReg.svg';
import InvalidReg from '../images/InvalidReg.svg';
import closeIco from '../images/Close_ico.svg';

function InfoTooltip(props) {
  return (
    <section className={`popup popup_tooltip ${props.openPopup ? 'popup__opened' : ''}`}>
      <div className='popup__container'>
        <div className='tooltip'>
          <img className='tooltip__image' src={props.success ? ValidReg : InvalidReg} alt='Result' />
          <p className='tooltip__description'>{props.success ? 'Вы успешно зарегестрировались' : 'Что-то пошло не так! Попробуйте еще раз.'}</p>
        </div>
        <button className='popup__close' onClick={props.closePopup} type="button">
          <img
            alt="Плюс"
            className="popup__image"
            src={closeIco}
          />
        </button>
      </div>
    </section>
  )

}

export default InfoTooltip