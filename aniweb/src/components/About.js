import React from 'react';

const About = ({ }) => {
    return (
        <div className='about-container'>

            <div className='about-item'> <div className='about-title'> About this site </div> This site is meant for posting Japanese animation titles and news regarding them. It also has comment functionality for being able to interreact with other posters, and the ability to monitor your animes, news and comments through the sidebar profile. </div>
            <div className='about-item'> <div className='about-functions'>  Site functions </div> You can get post animes, news and comments to both of them after creating a user through the sidebar that is activated by the button on the top-leftmost corner of the screen. You only need a unique username and a password, no e-mail is needed. <br /> After signing in, the animelist contains titles you can search through various filters and also post your own favorite titles. The same goes for the news tab. Every anime and news page contains a comment functionality at the bottom, and your username and the date of the comment is shown to everyone else. </div>
            <div className='about-item'> <div className='about-rules'> Rules</div> Comments are meant for discussion and your own thoughts, any inflammatory comments will be deleted. </div>

        </div>
    )
}

export default About;