import React, { useState, useEffect } from 'react';
import animeService from '../animeService';
import { Link } from "react-router-dom";

const Settings = ({ user, setErrorMessage, helper, setHelper }) => {

  const [data, setData] = useState(null);
  const [picture, setPicture] = useState('')
 
  const handlePicture = async (event) => {
    event.preventDefault()
    try {

      document.querySelector('.picture-form').style.display = 'none';
      await animeService.updateP(data.id, { profile: picture })
     
      setPicture('')
      
      setHelper(!helper)

    } catch (error) {
      setErrorMessage('Could not change profile picture')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
     
      const d = await animeService.getUserId(user.user_id)
      setData(d)
     
    }
    fetchUser()

  }, [helper])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])



  return (
    <div className='settings' >

      <div className='picture-form'>


        <h2 className='login-title'>Edit profile picture</h2>
        <form onSubmit={(e) => handlePicture(e)} className='form'>

          <label htmlFor='url'> profile picture url </label>

          <input className='profile-url' required={true} minLength={3} maxLength={2000} id='url' type="text" value={picture} name="url" onChange={({ target }) => setPicture(target.value)} />
          <button className='change-profile-button' id='login-button' type="submit"> Change </button>
        </form>
        <button className='hide-animeform' onClick={() => document.querySelector('.picture-form').style.display = 'none'}> hide </button>
      </div>

      <div className='profile-upper'>
        <div className='settings-pair'> username:  {user.username} </div>
        <div className='settings-pair'> joined: {data ? data.joined.slice(0, 10).replace('T', ' ').replace(/-/g, '/') : ''} </div>
        <button onClick={() => document.querySelector('.picture-form').style.display = 'block'} className='change-profile'> Change avatar </button>
        <img className='profile-picture' src={data ? data.profile : ''} alt=''></img>

      </div>


      <div className='posted-anime'> Posted anime {(data !== null && typeof data !== 'undefined') ? data.animes.slice(0).reverse().map(a => <span className='settings-span' key={Math.random()}><Link to={`animelist/${a._id}`}> {a.title + ' '}</Link></span>) : ''} </div>

      <div className='posted-news'> Posted news {(data !== null && typeof data !== 'undefined') ? data.news.slice(0).reverse().map(a => <span className='settings-span' key={Math.random()}><Link to={`news/${a._id}`}>{a.title + ' '}</Link></span>) : ''} </div>

      <div className='liked-anime'> Posted comments (anime) {(data !== null && typeof data !== 'undefined') ? data.comments.slice(0).reverse().map(e => <span className='settings-span' key={Math.random()}>{e + ' '}</span>) : ''} </div>

      <div className='liked-news'> Posted comments (news) {(data !== null && typeof data !== 'undefined') ? data.commentsN.slice(0).reverse().map(e => <span className='settings-span' key={Math.random()}>{e + ' '}</span>) : ''} </div>

      <div className='posted-comments'> Liked anime {(data !== null && typeof data !== 'undefined') ? data.likes.slice(0).reverse().map(a => <span className='settings-span' key={Math.random()}><Link to={`animelist/${a._id}`}>{a.title + ' '}</Link></span>) : ''} </div>

    </div>
  )
}

export default Settings;