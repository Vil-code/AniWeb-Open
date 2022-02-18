import React, { useState } from 'react';
import animeService from '../animeService';
import Notification from './Notification';

const Userform = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null)
  const [c, setC] = useState()

  const handleSignup = async (event) => {
    event.preventDefault()
    try {
      document.querySelector('.container-form-user').style.display = 'none';
      const d = await animeService.createUser({ username: username, password: password });
      setUsername('')
      setPassword('')
      
      document.querySelector('.container-form').style.display = 'block';
      setErrorMessage('Successfully created a user, please login now')
      if (c) clearTimeout(c)
        const timeOut = setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setC(timeOut)
    } catch (error) {
      setErrorMessage('Could not create a user, please try a different username')
      if (c) clearTimeout(c)
        const timeOut = setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setC(timeOut)
    }
  }

  return (

    <>
      <Notification message={errorMessage} />
      <div className='container-form-user'>


        <h2 className='login-title'>Create new user</h2>
        <form onSubmit={(e) => handleSignup(e)} className='form'>

          <label htmlFor='username'> username </label>

          <input className='userform-username' required={true} minLength={3} maxLength={25} id='username' type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />



          <label htmlFor='password'> password </label>
          <input className='userform-password' required={true} minLength={3} maxLength={30} id='password' type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />


          <button className='create-user-button' id='create-user-button' type="submit"> Create </button>

        </form>
        <button className='hide-login' onClick={() => {
          document.getElementsByClassName('container-form-user')[0].style.display = 'none'
          document.getElementsByClassName('container-form')[0].style.display = 'none'
        }
        }> hide </button>
      </div>
    </>
  )
}

export default Userform;