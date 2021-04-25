import Base_Url from './utils';

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (email, password) => {
  //С помощью fetch она создаёт POST-запрос и регестрирует пользователя
  return fetch(`${Base_Url}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    //После этого в первом обработчике then мы получим объект res, который содержит информацию об ответе и статус ответа. При успешном ответе вернётся статус 200 и при успехе получаем 
    .then(getResponse)
};

export const login = (email, password) => {
  //С помощью fetch она создаёт POST-запрос и регестрирует пользователя
  return fetch(`${Base_Url}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(getResponse)
};