import React, { useState } from 'react';
import animeService from '../animeService';


const Loginform = ({ setUser, setErrorMessage }) => {


  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [c, setC] = useState()


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      document.querySelector('.container-form').style.display = 'none';
      const user = await animeService.login({ username, password })
      
      if (user.message == 'invalid username or password') {
        setErrorMessage('Wrong username or password')
        if (c) clearTimeout(c)
        const timeOut = setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setC(timeOut)
        return;
      }
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      animeService.setToken(user.token)
      setUser(user);
      setUsername('');
      setPassword('');
      
    } catch (error) {
      setErrorMessage('Wrong username or password')
      if (c) clearTimeout(c)
        const timeOut = setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setC(timeOut)
    }
  }


  return (

    <div className='container-form'>


      <h2 className='login-title'>Login</h2>
      <form onSubmit={(e) => handleLogin(e)} className='form'>

        <label htmlFor='username'> username </label>

        <input className='input-username' required={true} minLength={3} maxLength={25} type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />



        <label htmlFor='password'> password </label>
        <input className='input-password' required={true} minLength={3} maxLength={30} type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />


        <button className='login-button' type="submit">login</button>

      </form>
      <button className='hide-login' onClick={() => document.getElementsByClassName('container-form')[0].style.display = 'none'}>hide</button>
    </div>)

}

export default Loginform;