import React from 'react';
import { Link } from "react-router-dom";



const AnimeObject = ({ title, description, url, id }) => {
    return (
        <div className="animeobject">
            <Link style={{ textDecoration: 'none' }} to={`/animelist/` + id} >
                <div className='animeobject-title'>
                    {title}
                </div>
                <div className='animeobject-img'>

                    <img className='actual-img' src={url} alt='No picture' />

                    <div className='animeobject-description'>
                        {description}
                    </div>
                </div>
            </Link>
        </div>
    )
}



export default AnimeObject;