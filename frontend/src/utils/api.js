import Base_Url from './utils'

class Api {
  constructor({ address }) {
    this._address = address;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  //GET
  _get(url) {
    return fetch(url, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }

  //PATCH
  _patch(url, body) {
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body
    })
      .then(this._checkResponse)
  }

  //POST
  _post(url, body) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body
    })
      .then(this._checkResponse)
  }

  //PUT
  _put(url) {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }
  //DELETE
  _delete(url) {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }



  getCards() {
    const cardsUrl = `${this._address}/cards`
    return this._get(cardsUrl);
  }


  getUserInfo() {
    const userUrl = `${this._address}/users/me`
    return this._get(userUrl);
  }

  setProfile(name, about) {
    const userUrl = `${this._address}/users/me`
    const body = JSON.stringify({
      name: name,
      about: about,
    })
    return this._patch(userUrl, body)
  }

  setAvatar(avatar) {
    const userUrl = `${this._address}/users/me/avatar`
    const body = JSON.stringify({
      avatar: avatar
    })
    return this._patch(userUrl, body)
  }

  postCard(name, link) {
    const userUrl = `${this._address}/cards`
    const body = JSON.stringify({
      name: name,
      link: link
    })
    return this._post(userUrl, body)
  }

  showLike(cardId) {
    const userUrl = `${this._address}/cards/${cardId}`
    return this._get(userUrl)
      .then((res) => {
        console.log(res)
      })
  }

  setLike(cardId) {
    const userUrl = `${this._address}/cards/${cardId}/likes`
    return this._put(userUrl)
  }

  delLike(cardId) {
    const userUrl = `${this._address}/cards/${cardId}/likes`
    return this._delete(userUrl)
  }

  delCard(cardId) {
    const userUrl = `${this._address}/cards/${cardId}`
    return this._delete(userUrl)
  }
}

const api = new Api({
  address: `${Base_Url}`,
});

export default api;