import React from 'react';
import pointerButton from '../images/pointer.svg';
import plusButton from '../images/Vector.svg';
import Card from './Card'

//import 11 pro
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__position">
          <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} onClick={props.onEditAvatar}></div>
          <div className="profile__info">
            <div className="profile__info-container">
              <h1 className="profile__title">{currentUser.name}</h1>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button type="button" className="profile__edit-button" onClick={props.onEditProfile}>
              <img
                src={pointerButton}
                alt="ручка-редактор"
              />
            </button>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}>
          <img
            alt="Плюс"
            src={plusButton}
            className="profile__plus"
          />
        </button>
      </section>
      <section className="elements">
        {props.cards.map((card) => {
          return (
            <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
          )
        })}
      </section>
    </main>
  )
}

export default Main