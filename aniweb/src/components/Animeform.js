import React, { useState } from 'react';
import animeService from '../animeService';
import axios from 'axios';

const Animeform = ({ setErrorMessage, setAnimes }) => {

  const baseUrl = "/api/animelist";

  const [animename, setAnimename] = useState('')
  const [description, setDescription] = useState('')
  const [img, setImg] = useState('')
  const [genres, setGenres] = useState('')
  const [c, setC] = useState()


  const handleAnime = async (event) => {
    event.preventDefault()
    try {
      

      document.querySelector('.anime-form').style.display = 'none';
      await animeService.create({ title: animename, description: description, genres: genres, url: img });
      setAnimename('')
      setDescription('')
      setImg('')
      setGenres('')
      axios.get(baseUrl).then(res => setAnimes(res)).catch(err => console.log(err));

    } catch (error) {
      setErrorMessage('Could not add anime')
      if (c) clearTimeout(c)
      const timeOut = setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      setC(timeOut)
    }
  }

  return (
    <div className='anime-form'>


      <h2>Basic information</h2>
      <form onSubmit={(e) => handleAnime(e)} className='form'>
        <div>
          anime title
          <input id='animename' required={true} minLength={2} type="text" value={animename} name="Animename" onChange={({ target }) => setAnimename(target.value)} />
        </div>

        <div>
          description
          <textarea id='description' required={true} minLength={2} type="text" value={description} name="Description" onChange={({ target }) => setDescription(target.value)} />

        </div>

        <div>
          genres
          <input id='genres' required={true} minLength={2} type="text" value={genres} name="Genres" onChange={({ target }) => setGenres(target.value)} />

        </div>

        <div>
          img url (optional)
          <input id='img-url' type="text" value={img} name="Img-url" onChange={({ target }) => setImg(target.value)} />

        </div>


        <button className='create-anime-button' id='login-button' type="submit"> Post </button>

      </form>
      <button className='hide-animeform' onClick={() => document.querySelector('.anime-form').style.display = 'none'}> hide </button>
    </div>
  )
}

export default Animeform;
