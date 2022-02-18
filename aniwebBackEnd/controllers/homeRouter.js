const express = require('express');
const Anime = require('../models/Anime');
const New = require('../models/News');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken')



router.get('/', (req, res) => {

  res.send('')
});

router.get('/animelist', async (req, res, next) => {

  try {

    const animes = await Anime.find({}).populate('user', { username: 1 });

    res.json(animes);
  } catch (e) {

    next(e);
  }
});

router.get('/users', async (req, res, next) => {
  try {
    const animes = await User.find({}).populate('animes', { title: 1, _id: 1 }).populate('likes', { title: 1, _id: 1 }).populate('news', { title: 1, _id: 1 });
    res.json(animes);
  } catch (e) {

    next(e);
  }
})

router.get('/animelist/news', async (req, res, next) => {

  try {
    const news = await New.find({}).populate('user', { username: 1 });
    res.json(news);
  } catch (e) {

    next(e);
  }
});

router.get('/animelist/news/:id', async (req, res, next) => {

  try {
    const animeById = await New.findById(req.params.id).populate('user', { username: 1 });
    res.json(animeById);
  } catch (e) {

    next(e);
  }
});

router.get('/animelist/:id', async (req, res, next) => {

  try {
    const animeById = await Anime.findById(req.params.id).populate('user', { username: 1 });
    res.json(animeById);
  } catch (e) {

    next(e);
  }
});

router.get('/users/:id', async (req, res, next) => {

  try {
    const animeById = await User.findById(req.params.id).populate('animes', { title: 1, _id: 1 }).populate('likes', { title: 1, _id: 1 }).populate('news', { title: 1, _id: 1 });;
    res.json(animeById);
  } catch (e) {

    next(e);
  }
});

router.post('/animelist', async (req, res, next) => {
  const body = req.body;


  const token = req.headers.authorization.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const anime = new Anime({
      title: body.title,
      description: body.description,
      genres: body.genres,
      url: body.url,
      user: user._id
    })

    const a = await anime.save();
    user.animes = user.animes.concat(a._id);
    await user.save()
    res.json(a);
  } catch (e) {

    next(e);
  }


});

router.post('/news', async (req, res, next) => {
  const body = req.body;

  const token = req.headers.authorization.split(' ')[1];


  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const news = new New({
      title: body.title,
      description: body.description,
      url: body.url,
      comment: body.comment,
      user: user._id
    })

    user.news = user.news.concat(news._id);
    await user.save();
    const n = await news.save();
    res.json(n);
  } catch (e) {

    next(e);
  }

});

router.put('/animelist/:id', async (req, res, next) => {
  const body = req.body;

  const token = req.headers.authorization.split(' ')[1];

  try {

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const a = {
      title: body.title,
      description: body.description,
      genres: body.genres,
      url: body.url,
      likes: body.likes,
      comment: body.comment
    }


    const compareTo = await Anime.findById(req.params.id);

    if (compareTo.likes == a.likes) {

      await Anime.findByIdAndUpdate(req.params.id, { $set: a }, { upsert: true, new: true });
      
      user.comments = user.comments.concat(a.comment[a.comment.length - 1].text);

    } else {
      if (user.likes.includes(compareTo._id)) {
        res.json({ message: 'already liked' })
        return
      }

      const response = await Anime.findByIdAndUpdate(req.params.id, { $set: a }, { upsert: true, new: true });
      user.likes = user.likes.concat(response._id);
    }

    const response = await Anime.findById(req.params.id);

    await user.save()
    res.json(response);
  } catch (e) {

    next(e);
  }
});

router.put('/news/:id', async (req, res, next) => {
  const body = req.body;

  const token = req.headers.authorization.split(' ')[1];

  try {

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const a = {
      title: body.title,
      description: body.description,
      comment: body.comment
    }

    const response = await New.findByIdAndUpdate(req.params.id, { $set: a }, { upsert: true, new: true });
    user.commentsN = user.commentsN.concat(a.comment[a.comment.length - 1].text);

    await user.save()
    res.json(response);
  } catch (e) {

    next(e);
  }
});

router.put('/users/:id', async (req, res, next) => {
  const body = req.body;

  const token = req.headers.authorization.split(' ')[1];

  try {

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    let user = await User.findById(decodedToken.id)

    user.profile = body.profile;


    const response = await user.save()
    res.json(response);
  } catch (e) {

    next(e);
  }
});


router.post('/users', async (request, response, next) => {
  const body = request.body

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  try {
    const user = new User(
      {
        username: body.username,
        passwordHash
      }

    )
    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (e) {

    next(e);
  }
})

router.delete('/animelist/:id', async (req, res, next) => {
  try {

    const token = req.headers.authorization.split(' ')[1];
    const user_id = req.headers.user_id;
    
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const check = await User.findById(user_id)
    if (!check.animes.some(a => a._id == req.params.id)) {
      res.status(401).json({ error: 'wrong user' })
      return;
    }
    await Anime.findByIdAndRemove(req.params.id)

    res.status(204).end()
  } catch (e) {
    next(e)
  }
})


router.delete('/news/:id', async (req, res, next) => {
  try {

    
    const token = req.headers.authorization.split(' ')[1];
    const user_id = req.headers.user_id;
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const check = await User.findById(user_id)
    if (!check.news.some(a => a._id == req.params.id)) {
      res.status(401).json({ error: 'wrong user' })
      return;
    }

    await New.findByIdAndRemove(req.params.id)

    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

module.exports = router;