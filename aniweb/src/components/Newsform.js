import React, { useState } from 'react';
import animeService from '../animeService';
import axios from 'axios'

const newsUrl = "/api/animelist/news";


const Newsform = ({ setErrorMessage, setNews }) => {


  const [newsform, setNewsform] = useState('')
  const [descriptionN, setDescriptionN] = useState('')
  const [c, setC] = useState()

  const handleNews = async (event) => {
    event.preventDefault()
    try {

      document.querySelector('.news-form').style.display = 'none';
      await animeService.createNews({ title: newsform, description: descriptionN });
      setNewsform('')
      setDescriptionN('')


      
      axios.get(newsUrl).then(res => setNews(res)).catch(err => console.log(err));
    } catch (error) {
      
      setErrorMessage('Could not add news')
      if (c) clearTimeout(c)
        const timeOut = setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setC(timeOut)
    }
  }


  return (
    <div className='news-form'>


      <h2>Basic information</h2>
      <form onSubmit={(e) => handleNews(e)} className='form'>

        <label htmlFor='newstitle'> news title </label>
        <input required={true} minLength={2} maxLength={100} id='newsform' type="text" value={newsform} name="NewsName" onChange={({ target }) => setNewsform(target.value)} />



        <label htmlFor='description'> description </label>
        <textarea required={true} minLength={10} maxLength={6000} id='description' type="text" value={descriptionN} name="Description" onChange={({ target }) => setDescriptionN(target.value)} />



        <button className='create-news-button' id='login-button' type="submit">Post</button>

      </form>
      <button className='hide-newsform' onClick={() => document.getElementsByClassName('news-form')[0].style.display = 'none'}>hide</button>
    </div>
  )
}

export default Newsform;