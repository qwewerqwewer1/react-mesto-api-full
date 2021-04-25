import React, { useState } from 'react';
import { Link } from 'react-router-dom'

function Login({ onLogin }) {
  //начальное стостояние емейла и пасса
  const initialData = {
    email: '',
    password: '',
  }
  //хук емейла и пасса
  const [data, setData] = useState(initialData)

  //В реальном времени записывает данные в value по мере того как пользователь печатает
  //P.s. такая запись для того что бы запись была валидна в setData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(data => ({
      ...data,
      [name]: value,
    }));
  }
  //ясно понятно Reset
  const resetForm = () => {
    setData(initialData);
  }
  //
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!data.email || !data.password) {
      return;
    }
    onLogin(data)
      .then(resetForm)
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form onSubmit={handleSubmit} className="form" autoComplete="off">
        <input type='email' id="email" name="email" value={data.email} onChange={handleChange} className="form__input form__input_theme_dark" placeholder="Email" />
        <input type='password' id="password" name="password" value={data.password} onChange={handleChange} className="form__input form__input_theme_dark" placeholder="Пароль" />
        <button type="submit" className="form__button">Войти</button>
        <p className="auth__alternate">Для входа необходимо <Link className="auth__link" to="/signup">Зарегистрироватся</Link></p>
      </form>
    </div>
  )

}

export default Login;