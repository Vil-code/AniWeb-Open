import React from 'react';

const optionsGenres = [
  {
    label: "All Genres",
    value: "Genre",
  },
  {
    label: "Shounen",
    value: "Shounen",
  },
  {
    label: "Comedy",
    value: "Comedy",
  },
  {
    label: "Romance",
    value: "Romance",
  },
  {
    label: "Mystery",
    value: "Mystery",
  },
  {
    label: "Seinen",
    value: "Seinen",
  },
  {
    label: "Fantasy",
    value: "Fantasy",
  },
  {
    label: "Drama",
    value: "Drama",
  },
  {
    label: "Sports",
    value: "Sports",
  },
  {
    label: "Philosophy",
    value: "Philosophy",
  },{
    label: "Politics",
    value: "Politics",
  }
];

const optionsOrder = [
  {
    label: "Any Order",
    value: "Order",
  },
  {
    label: "Likes",
    value: "Likes",
  },
  {
    label: "Newest",
    value: "Newest",
  },
  {
    label: "Oldest",
    value: "Oldest",
  }];



const ScrollMenu = ({ user, genre, setGenre, order, setOrder, search, setSearch }) => {
  return (
    <div className="scroll-menu">
      <input value={search || ''} onChange={event => setSearch(event.target.value)} className='search-bar' type="text" placeholder="Search any titles..." />
      <select value={genre} onChange={event => setGenre(event.target.value)} className='genre-box'>
        {optionsGenres.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>))}
      </select>
      <select value={order} onChange={event => setOrder(event.target.value)} className='order-box'>
        {optionsOrder.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>))}
      </select>
      {user ? <button className='view-animeform' onClick={() => document.querySelector('.anime-form').style.display = 'block'}> Post </button> : ''}

    </div>
  )
}

export default ScrollMenu;