const express = require('express');
const chalk = require('chalk');
// const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 4000;
const someString = 'th';

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));
require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, 'public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.set('views', './src/views');
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/ejs', (req, res) => {
  res.render(
    'index',
    {
      title: 'EJS',
      nav: [
        { link: '/books', title: 'Books' },
        { link: '/author', title: 'Author' }
      ]
    }
  );
});

const bookRouter = require('./src/routes/routes')(someString);
const adminRouter = require('./src/routes/adminRoutes')(someString);
const authRouter = require('./src/routes/authRoutes')(someString);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`listening on port ${chalk.green(port)}`);
});
