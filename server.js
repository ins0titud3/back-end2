const express = require('express')
const axios = require('axios')
const mongoose = require('mongoose')
const path = require('path')
const session = require('express-session')

const app = express()
const port = process.env.PORT || 3000

app.use(
  session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false,
  })
)

mongoose
  .connect('mongodb+srv://zhakia007:yecgaa99@cluster0.vf4jlpl.mongodb.net/<database>', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err))

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  userID: String,
  creationDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: null },
  deletionDate: { type: Date, default: null },
  isAdmin: { type: Boolean, default: false },
})
const User = mongoose.model('User', userSchema)

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/login', (req, res) => {
  res.render('login', { error: null })
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username, password })

    if (user && user.isAdmin) {
      req.session.user = user
      res.redirect('/admin')
    } else if (user) {
      req.session.user = user
      res.redirect('/weather')
    } else {
      // Если пользователь не найден
      res.render('login', { error: 'Invalid username or password' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/signup', (req, res) => {
  res.render('signup', { error: null })
})

app.post('/signup', async (req, res) => {
  const { username, password } = req.body

  try {
    const existingUser = await User.findOne({ username })

    if (existingUser) {
      res.render('signup', { error: 'Username already exists' })
    } else {
      const newUser = new User({ username, password })
      await newUser.save()
      res.redirect('/weather')
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/admin', async (req, res) => {
  try {
    const users = await User.find()
    res.render('admin', { users: users })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/admin/addUser', async (req, res) => {
  const { username, password } = req.body

  try {
    const newUser = new User({ username, password })
    await newUser.save()
    res.redirect('/admin')
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/admin/editUser', async (req, res) => {
  const { userId, username, password } = req.body

  try {
    await User.findByIdAndUpdate(userId, { username, password, updateDate: new Date() })
    res.redirect('/admin')
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/admin/deleteUser/:userId', async (req, res) => {
  const userId = req.params.userId

  try {
    await User.findByIdAndDelete(userId)
    res.redirect('/admin')
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.use(express.static(__dirname))

app.get('/weather', (req, res) => {
  const { user } = req.session
  res.render('index', { username: user ? user.username : null })
})

app.get('/data', async (req, res) => {
  try {
    const cityName = req.query.city
    if (!cityName) {
      return res.status(400).json({ error: 'City name is required' })
    }

    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=0ee29dad1cbaad6deb693f90108382e0`
    )
    const weatherData = weatherResponse.data

    res.json({
      temp: weatherData.main.temp,
      feels: weatherData.main.feels_like,
      icon: weatherData.weather[0].icon,
      iconURL: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
      desc: weatherData.weather[0].description,
      humid: weatherData.main.humidity,
      press: weatherData.main.pressure,
      wspeed: weatherData.wind.speed,
      countryCod: weatherData.cod,
      coord: weatherData.coord.lon,
      coord2: weatherData.coord.lat,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/exchange-rates', async (req, res) => {
  try {
    const exchangeRatesResponse = await axios.get('https://open.er-api.com/v6/latest')

    const exchangeRatesData = exchangeRatesResponse.data.rates

    res.json({
      exchangeRates: exchangeRatesData,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
