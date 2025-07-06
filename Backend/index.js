const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const articleroutes = require('./route/articleroute')
const adminroutes = require('./route/adminroute')

const app = express()

app.use(express.json())
//app.use(cors())
// app.use(cors({
//   origin: 'https://news-app-client-chi.vercel.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true // if you're using cookies or auth headers
// }));
app.options('*', cors({
  origin: 'https://news-app-client-chi.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


mongoose.connect('mongodb+srv://praveenvirat18100:praveen2003@cluster-news.djxpjuz.mongodb.net/news-app?retryWrites=true&w=majority&appName=Cluster-News')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log(err))

app.use('/api/article', articleroutes)
app.use('/api/admin',adminroutes)

const PORT = 5000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`))
