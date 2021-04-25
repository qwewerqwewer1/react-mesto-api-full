import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  //Is Own ?
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = (`element__delete ${isOwn ? 'element__delete_active' : 'element__delete'}`);
  //Is Liked ?
  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (`element__like ${isLiked ? 'element__like_active' : 'element__like'}`);


  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLike() {
    props.onCardLike(props.card);
  }

  function handleDelete() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="element">
      <button type="button" onClick={handleDelete} className={cardDeleteButtonClassName}></button>
      <img className="element__image" alt={props.card.name} src={props.card.link} onClick={handleClick} />
      <div className="element__data">
        <h2 className="element__paragraph">{props.card.name}</h2>
        <div className="element__likes">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLike}></button>
          <span className="element__likes-users">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;