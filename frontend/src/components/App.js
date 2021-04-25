// IMPORTS
import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import '../index.css';

// импортируем компоненты приложения
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth.js';

import api from '../utils/api';

import Header from './Header';
import Main from './Main'
import Footer from './Footer'

import PopupWithForm from './PopupWithForm'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'

// Сontexts ↑ 
import { CurrentUserContext } from '../contexts/CurrentUserContext';


// FUNCTION APP in ROOT
function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setEditAddPlacePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const history = useHistory('');

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoggedIn(true);
      history.push('/cards');
      // eslint-disable-next-line no-restricted-globals
    } else {
      history.push('/signin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = ({ email, password }) => {
    return auth.login(email, password)
      .then(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setEmail(email);
          setLoggedIn(true);
          history.push('/cards');
        };
      })
      .catch(res => {
        setSuccess(false);
        setInfoTooltipPopupOpen(true);
        console.log(res);
      })
  }

  const handleRegister = ({ email, password }) => {
    return auth.register(email, password)
      .then(res => {
        setSuccess(true);
        setInfoTooltipPopupOpen(true);
        // history.push('/signin');
        return res;
      })
      .catch(res => {
        setSuccess(false);
        setInfoTooltipPopupOpen(true);
        console.log(res);
      })
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setEmail('');
    setLoggedIn(false);
    history.push('/signin');
  }


  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((dataUserAPI) => {
          setCurrentUser(dataUserAPI)
          setEmail(dataUserAPI.email)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api.getCards()
        .then((initialCards) => {
          setCards(initialCards.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);


  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    const likeRequest = !isLiked ? api.setLike(card._id) : api.delLike(card._id);
    likeRequest
      .then((newCard) => {
        const newCards = cards.map(c => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.delCard(card._id)
      .then(() => {
        const newCards = cards.filter(c => !(c._id === card._id));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setEditAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(user) {
    api.setProfile(user.name, user.about)
      .then((updateInfoProfile) => {
        setCurrentUser(updateInfoProfile);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(link) {
    api.setAvatar(link.avatar)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlace(card) {
    api.postCard(card.name, card.link)
      .then((postCard) => {
        setCards([postCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipPopupOpen(false);
  }

  return (
    <>

      <CurrentUserContext.Provider value={currentUser}>

        <div className="body">
          <div className="page">
            <Header email={email} isLogged={loggedIn} onLogout={handleLogout} />
            <Switch>

              <Route path="/signup">
                <Register onRegister={handleRegister} />
              </Route>

              <Route path="/signin">
                <Login onLogin={handleLogin} />
              </Route>

              <ProtectedRoute
                path="/cards"
                loggedIn={loggedIn}
                component={Main}
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardDelete={handleCardDelete}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}>
              </ ProtectedRoute>

              <Route>
                {loggedIn ? <Redirect to="/cards" /> : <Redirect to="/signin" />}
              </Route>

            </Switch>
            <Footer />
          </div>

          <EditAvatarPopup
            openPopup={isEditAvatarPopupOpen}
            closePopup={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />

          <EditProfilePopup
            openPopup={isEditProfilePopupOpen}
            closePopup={closeAllPopups}
            onUpdateUser={handleUpdateUser} />

          <AddPlacePopup openPopup={isAddPlacePopupOpen}
            closePopup={closeAllPopups}
            onAddPlace={handleAddPlace} />

          <PopupWithForm
            name='confirmDeleteCard'
            title='Вы уверены?'
            buttonTitleSubmit='Удалить' />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups} />
          <InfoTooltip openPopup={isInfoTooltipPopupOpen} closePopup={closeAllPopups} success={success} />
        </div>

      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
