import React from 'react';
import { useState } from 'react'
import animeService from '../animeService';

const Comment2 = ({ id, news, setErrorMessage, setHelper, helper, user }) => {

  const [comment, setComment] = useState('');
  const [c, setC] = useState()

  const handleComment = async (event, id, comment) => {
    event.preventDefault();
    try {
      document.querySelector('.container-form-2').style.display = 'none'
      
      const newObject = news.data.find(b => b._id == id)
      newObject.comment.push(comment);
      await animeService.updateN(id, newObject);
      
      setComment('')
      setHelper(!helper)
  
    } catch (error) {
      setErrorMessage('Could not post comment')
      if (c) clearTimeout(c)
        const timeOut = setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setC(timeOut)
    }
  }

  

  return (

    <div className='container-form-2'>

      <h2 className='login-title'> Post a comment </h2>
      <form onSubmit={(e) => handleComment(e, id, { text: comment, person: user.username })} className='form'>

        <label htmlFor='comment'> Comment </label>
        <textarea className='comment-desc' minLength={2} maxLength={1000} required={true} id='comment' type="text" value={comment} name="comment" onChange={({ target }) => setComment(target.value)} />

        <button className='create-comment-button' id='login-button' type="submit"> Post </button>

      </form>
      <button className='hide-login' onClick={() => document.getElementsByClassName('container-form-2')[0].style.display = 'none'}> Cancel </button>
    </div>
  )
}

export default Comment2;