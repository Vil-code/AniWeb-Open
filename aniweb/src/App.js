import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnimeObject from './components/AnimeObject';
import AnimeObject2 from './components/AnimeObject2';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import Header from './components/header';
import "./main.css";
import ScrollMenu from './components/ScrollMenu';
import News from './components/News';
import About from './components/About';
import Sidebar from './components/Sidebar';
import animeService from './animeService';
import Loginform from './components/Loginform';
import Animeform from './components/Animeform';
import Newsform from './components/Newsform';
import Notification from './components/Notification';
import Userform from './components/Userform';
import Settings from './components/Settings';
import News2 from './components/News2';
import AnimeObject3 from './components/AnimeObject3';
import News3 from './components/News3';

const baseUrl = "/api/animelist";
const newsUrl = "/api/animelist/news";

function App() {

  var [animes, setAnimes] = useState([]);
  const [news, setNews] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('Genre')
  const [order, setOrder] = useState('Order')
  const [animeVisible, setanimeVisible] = useState(false)
  const [newsVisible, setNewsvisible] = useState(false)
  const [commentVisible, setCommentVisible] = useState(false)
  const [creationVisible, setCreationVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [c, setC] = useState()
  
  const [helper, setHelper] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      animeService.setToken(user.token)
    }
  }, [])


  useEffect(() => {
    axios.get(baseUrl).then(res => setAnimes(res)).catch(err => console.log(err));
    axios.get(newsUrl).then(res => setNews(res)).catch(err => console.log(err));
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const FilterNews = () => {

    const { id } = useParams();
    if (typeof news.data == 'undefined') {

      return <div></div>
    }

    const n = news.data.filter(a => a._id == id)[0];

    return <div className='filter-news'> <News2 news={news} user={user} comment={n.comment} username={n.user.username} title={n.title} description={n.description} id={id} key={id} deleteNews={deleteNews} /> </div>
  }

  const FilterNews2 = () => {

    const { id } = useParams();
    if (typeof news.data == 'undefined') {

      return <div></div>
    }

    const n = news.data.filter(a => a._id == id)[0];

    return <div className='filter-news'>  <News3 title={n.title} description={n.description} id={id} key={id} /> </div>
  }

  const FilterAnime = () => {

    const { id } = useParams();
    if (typeof animes.data == 'undefined') {

      return <div></div>
    }

    const n = animes.data.filter(a => a._id == id)[0];

    return <div className='filter-anime'>  <AnimeObject2 animes={animes} setAnimes={setAnimes} setAnimes={setAnimes} setErrorMessage={setErrorMessage} user={user} comment={n.comment} changeVisibility={changeCommentvisibility} deleteAnime={deleteAnime} title={n.title} username={n.user.username} description={n.description} likes={n.likes} genres={n.genres} id={n._id} key={id} url={n.url} /> </div>
  }

  const FilterAnime2 = () => {

    const { id } = useParams();
    if (typeof animes.data == 'undefined') {

      return <div></div>
    }

    const n = animes.data.filter(a => a._id == id)[0];

    return <div className='filter-anime'>  <AnimeObject3 comment={n.comment} changeVisibility={changeCommentvisibility} title={n.title} description={n.description} likes={n.likes} genres={n.genres} id={n._id} key={id} url={n.url} /> </div>
  }

  const FilterTitles = () => {



    if (typeof animes == 'undefined' || animes.length == 0) return <div></div>

    var filtered2 = animes.data.filter(a => a.title.toLowerCase().includes(search.toLowerCase())).slice(0).reverse()

    if (genre == 'Genre' && order == 'Order') return filtered2.map(a => <AnimeObject key={a._id} id={a._id} title={a.title} description={a.description} url={a.url} />)
    if (order == 'Likes') filtered2 = filtered2.sort((a, b) => (a.likes > b.likes ? -1 : 1))
    if (order == 'Newest') filtered2 = filtered2.sort((a, b) => (a.date > b.date ? -1 : 1))
    if (order == 'Oldest') filtered2 = filtered2.sort((a, b) => (a.date < b.date ? -1 : 1))
    if (genre != 'Genre') {

      filtered2 = filtered2.filter(a => a.genres.includes(genre.toLowerCase()));
    }

    return filtered2.map(a => <AnimeObject key={a._id} id={a._id} title={a.title} description={a.description} url={a.url} />)
  }

  const changeVisibilityAnime = () => {
    setanimeVisible(!animeVisible);
  }

  const changeNewsvisibility = () => {
    setNewsvisible(!newsVisible);
  }

  const changeCommentvisibility = () => {
    setCommentVisible(!commentVisible);
  }

  const changeUser = () => {
    setCreationVisible(!creationVisible);
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    document.querySelector('.container-form').style.display = 'none';
    setUser(null)
    setErrorMessage(null)
  }

  const deleteAnime = (title, id) => {
    if (window.confirm(`Remove the anime '${title}'?`)) {
      try {
        animeService.del(id, user.user_id)
        window.location.replace('/animelist')
      } catch (e) {
        setErrorMessage('Could not remove the anime')
      if (c) clearTimeout(c)
        const timeOut = setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setC(timeOut)
      }

    }
  }

  const deleteNews = (title, id) => {
    if (window.confirm(`Remove the news '${title}'?`)) {
      try {
        animeService.delN(id, user.user_id)
        window.location.replace('/news')
      } catch (e) {
        setErrorMessage('Could not remove news')
      if (c) clearTimeout(c)
        const timeOut = setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setC(timeOut)
      }

    }
  }


  if (!user) {
    return (
      <div className="App">
        <Router>

          <Header changeVisibility={changeUser} />
          <Notification message={errorMessage} />
          <Sidebar user={{ username: '' }} />
         
          <Loginform setUser={setUser} setErrorMessage={setErrorMessage} />

          <Userform changeVisibility={changeUser} />

          <Switch>
            <Route path='/animelist/:id'>  <FilterAnime2 /> </Route>
            <Route path="/animelist"> <> <ScrollMenu setAnimevisible={changeVisibilityAnime} genre={genre} setGenre={setGenre} order={order} setOrder={setOrder} search={search} setSearch={setSearch} /> <div className='container'>  <FilterTitles />  </div> </>   </Route>
            <Route path='/news/:id'>  <FilterNews2 />  </Route>

            <Route path="/news"> <div className='container-2'> {typeof news.data != "undefined" ? news.data.slice(0).reverse().map(a => <News key={a._id} id={a._id} title={a.title} description={a.description} url={a.url} />) : ""} </div></Route>

            <Route path="/about">  <About />   </Route>
            <Route path="/"><><h1 className='title-4'> Animes </h1> <div className='container-4'> {typeof animes.data != "undefined" ? animes.data.slice(-14).map(a => <AnimeObject key={a._id} id={a._id} title={a.title} description={a.description} url={a.url} />) : ""} </div> <div className='title-5'> News </div>   <div className='container-5'>   {typeof news.data != "undefined" ? news.data.slice(-16).map(a => <News key={a._id} id={a._id} title={a.title} description={a.description} url={a.url} />) : ""} </div>   </>   </Route>
          </Switch>


       
        </Router>
      </div>
    )
  }

  return (
    <div className="App">
      <Router>

        <Header />
        <Notification message={errorMessage} />
        <Sidebar helper={helper} setHelper={setHelper} user={user} logout={handleLogout} />
        <Loginform setUser={setUser} setErrorMessage={setErrorMessage} />
      
        <Switch>
          <Route path='/settings' > <Settings helper={helper} setHelper={setHelper} setAnimes={setAnimes} user={user} setErrorMessage={setErrorMessage} animes={animes} /> </Route>
          <Route path='/animelist/:id'>  <FilterAnime /> </Route>
          <Route path="/animelist"> <> <Animeform setErrorMessage={setErrorMessage} setAnimes={setAnimes} /> <ScrollMenu user={user} genre={genre} setGenre={setGenre} order={order} setOrder={setOrder} search={search} setSearch={setSearch} />  <div className='container'>   <FilterTitles /> </div> </> </Route>

          <Route path='/news/:id'>  <FilterNews />  </Route>
          <Route path="/news"> <Newsform setNews={setNews} setErrorMessage={setErrorMessage} changeVisibility={changeNewsvisibility} /> <button className='post-news' onClick={() => document.querySelector('.news-form').style.display = 'block'}>Post News</button>   <div className='container-2'>   {typeof news.data != "undefined" ? news.data.slice(0).reverse().map(a => <News key={a._id} id={a._id} title={a.title} description={a.description} url={a.url} />) : ""} </div></Route>

          <Route path="/about">  <About />  </Route>

          <Route path="/"> <> <span className='title-4'> Animes </span>   <div className='container-4'>   {typeof animes.data != "undefined" ? animes.data.slice(-14).map(a => <AnimeObject key={a._id} id={a._id} title={a.title} description={a.description} url={a.url} />) : ""}    </div> <div className='title-5'> News </div> <div className='container-5'>    {typeof news.data != "undefined" ? news.data.slice(-16).reverse().map(a => <News key={a._id} id={a._id} title={a.title} description={a.description} url={a.url} />) : ""} </div></>  </Route>
        </Switch>

      
      </Router>
    </div>
  );
}

export default App;

