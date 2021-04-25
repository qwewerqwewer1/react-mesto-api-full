import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  //начальное стостояние емейла и пасса
  const initialData = {
    email: '',
    password: '',
  };
  //хук емейла и пасса
  const [data, setData] = useState(initialData);

  //В реальном времени записывает данные в value по мере того как пользователь печатает
  //P.s. такая запись для того что бы запись была валидна в setData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(data => ({
      ...data,
      [name]: value,
    }));
  }
  //ясно понятно
  const resetForm = () => {
    setData(initialData)
  }
  //
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!data.email || !data.password) {
      return;
    }

    onRegister(data)
      .then(resetForm)
  }

  return (
    <div className='auth'>
      <h2 className='auth__title'>Регистрация</h2>
      <form onSubmit={handleSubmit} className='form' autoComplete="off">
        <input type='email' id="email" name="email" className='form__input form__input_theme_dark' value={data.email} onChange={handleChange} placeholder="Email"></input>
        <input type='password' id="password" name="password" className='form__input form__input_theme_dark' value={data.password} onChange={handleChange} placeholder="Пароль"></input>
        <button type='submit' className='form__button'>Зарегистрироваться</button>
      </form>
      <p className="auth__alternate">Уже регистрировались? <Link className="auth__link" to="/signin">Войти</Link></p>
    </div>
  )

}

export default Register;