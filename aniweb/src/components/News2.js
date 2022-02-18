import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import animeService from '../animeService';
import Comment2 from './Comment2';
import Notification from './Notification';


const News2 = ({ title, date, description, id, deleteNews, user, username, comment, news }) => {

  
    const [helper, setHelper] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <>
            <Notification message={errorMessage} />
            <Comment2 user={user} setErrorMessage={setErrorMessage} news={news} helper={helper} setHelper={setHelper} id={id} />
            <div className='news-main'>

                <div className='news-title'>
                    {title}
                    <br />
                    {date}
                </div>

                <div className='news-description'>
                    {description}
                </div>

                <Link style={{ textDecoration: 'none' }} to={`/news/` + id} > <div className='read-more'> Read more </div></Link>

            </div>

            <button className='show-comment-form-news' onClick={() => document.querySelector('.container-form-2').style.display = 'block'}> Comment </button>
            {user.username == username ? <button className='delete-news' onClick={() => deleteNews(title, id)}> Delete </button> : ''}
            <div className='all-comments'> {comment.slice(0).reverse().map(a => <div key={Math.random()} className='comment-container'><div className='comment-time'> {a.date ? a.date.slice(0, 19).replace('T', ' ').replace(/-/g, '/') : new Date().toJSON().slice(0, 19).replace('T', ' ').replace(/-/g, '/')}  {'posted by ' + a.person} </div> <div className='comment-d'> {a.text} </div> </div>)} </div>


        </>
    )
}

export default News2;