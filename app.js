const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');

//Routes
const studentsRoutes = require('./routes/students')

//DB configuration
const URI = process.env.URI || 'mongodb+srv://switchmarks:switch2021@exams.ubaft.mongodb.net/edulinks?retryWrites=true&w=majority';
const oldURI = 'mongodb://127.0.0.1:27017/edulinks'
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}
mongoose.connect(URI, dbOptions)
  .then(() => console.log('Database Connected successfully'))
  .catch(err => console.error('Connection could not be established'));

//App configuration
const PORT = process.env.PORT || 4000;
const HOSTNAME = '127.0.0.1';
const app = express();

//Method override middleware
app.use(methodOverride('_method'));

//Express Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));



//Express session middleware
app.use(session({
  secret: 'employed',
  resave: true,
  saveUninitialized: true
}));

//Connect flash middleware
app.use(flash())

//Setting messages globally
app.use((req, res, next) => {
  res.locals.success_msg = req.flash(('success_msg'));
  res.locals.error_msg = req.flash(('error_msg'));
  next();
})

app.get('/', (req, res) => {
  title = 'Edulink Management System';
  res.render('index', { title })
})

app.use(studentsRoutes);


app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at ${PORT} , ${new Date()}`)
});