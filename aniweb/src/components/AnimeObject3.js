import React from 'react';


const AnimeObject3 = ({ title, description, genres, url }) => {

    return (
        < >

            <div className='animeobject-img'>
                <div className='animeobject-title'>
                    {title}
                </div>
                <img className='actual-img' src={url} alt='No picture' />

            </div>

            <div className='g'> <div className='genres-text'> Genres </div> {genres} </div>
            <div className='animeobject-description-2'>

                <div className='d'> Description </div>

                {description}

            </div>

        </>
    )
}

export default AnimeObject3;