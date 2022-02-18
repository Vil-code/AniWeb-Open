import React from 'react';
import { Link } from "react-router-dom";



const News = ({ title, date, description, id }) => {


    return (

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
    )
}

export default News;