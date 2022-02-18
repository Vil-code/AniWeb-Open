const express = require('express');
require("dotenv").config();
const loginRouter = require('./controllers/loginRouter.js');
const homeRouter = require('./controllers/homeRouter.js');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const path = require('path')

const app = express();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(() => console.log("Connected to database successfully!")).catch(err => console.log(err));


app.use(express.static("build"));
app.use(cors());
app.use(express.json());


app.use('/api', homeRouter);
app.use('/login', loginRouter);
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
})



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

