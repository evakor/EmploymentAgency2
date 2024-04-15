const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const { engine } = require('express-handlebars');

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main', 
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// REST Routes

// View Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/employee', (req, res) => {
    res.render('employeeProfile');
});

app.get('/employer', (req, res) => {
  res.render('employerProfile', {
    firstname: "Maria",
    lastname: "Rousou",
    email: "marpap@gmail.com",
    phone1: "6981234567",
    phone2: null,
    address: "Ermou 33",
    region: "Athens",
    comp_name: "Kafe Mpampis",
    comp_desc: "To kafe Mpampis einai ena poly omorfo kafe stous propodes ths Akropolis.",
    job_title: ["Barman", "Ydravlikos", "Mhxanikos Autokiniton"],
    job_desc: "Edo einai to description! Edo tha leei pragmata gia thn douleia!"
  });
});

app.get('/jobs', (req, res) => {
  res.render('jobs');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
