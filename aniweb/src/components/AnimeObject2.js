import React, { useState, useEffect } from 'react';
import animeService from '../animeService';
import Notification from './Notification';
import Comment from './Comment';

const AnimeObject2 = ({ title, description, genres, url, username, comment, id, deleteAnime, user, animes, setAnimes }) => {

  const [helper, setHelper] = useState(false)
  const [currentAnime, setCurrentAnime] = useState()
  const [errorMessage, setErrorMessage] = useState(null)
  const [c, setC] = useState()

  const incrementLikes = async (event, id) => {
    event.preventDefault();
    try {

      const newObject = {...currentAnime}
      const copy = { ...newObject, likes: newObject.likes + 1 }
      
      const res = await animeService.update(id, copy)

      setHelper(!helper)
      if (res.message == 'already liked') {
        setErrorMessage('already liked the anime')
        if (c) clearTimeout(c)
        const timeOut = setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setC(timeOut)
        return;
      }
      
      newObject.likes = newObject.likes + 1;
    } catch (e) {
      setErrorMessage('could not like the anime')
      if (c) clearTimeout(c)
        const timeOut = setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setC(timeOut)
    }
  }


  useEffect(() => {
    const fetchUser = async () => {
      const a = await animeService.getAnimeId(id)
      setCurrentAnime(a)
    }
    fetchUser()


  }, [helper])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    < >
      <Notification message={errorMessage} />
      <Comment user={user} helper={helper} setHelper={setHelper} animes={animes} setAnimes={setAnimes} setErrorMessage={setErrorMessage} id={id} />
      <div className='animeobject-img'>
        <div className='animeobject-title'>
          {title}
        </div>
        <img className='actual-img' src={url} alt='No picture' />


      </div>
      <button className='likes' onClick={(e) => incrementLikes(e, id)}>
        Likes:  {currentAnime ? currentAnime.likes : 0} </button>
      <div className='g'> <div className='genres-text'> Genres </div> {genres} </div>
      <div className='animeobject-description-2'>



        <div className='d'> Description </div>
        <span className='description-main'>
          {description}
        </span>

      </div>

      <button className='show-comment-form' onClick={() => document.querySelector('.container-form-2').style.display = 'block'}> Comment </button>
      {(username == user.username) ? <button className='delete-anime' onClick={() => deleteAnime(title, id)}> Delete </button> : ''}
      <div className='all-comments'>
        {comment.slice(0).reverse().map(a => <div key={Math.random()} className='comment-container'><div className='comment-time'> {a.date ? a.date.slice(0, 19).replace('T', ' ').replace(/-/g, '/') : new Date().toJSON().slice(0, 19).replace('T', ' ').replace(/-/g, '/')}  {'posted by ' + a.person} </div> <div className='comment-d'> {a.text} </div> </div>)}
      </div>

    </>
  )
}

export default AnimeObject2;