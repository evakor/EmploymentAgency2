const express = require('express');
const bodyParser = require('body-parser');
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// REST Routes
app.use(require('./routes/applicationRoutes.js'));
app.use(require('./routes/employeeRoutes.js'));
app.use(require('./routes/employerRoutes.js'));
app.use(require('./routes/jobRoutes.js'));
app.use(require('./routes/submitionRoutes.js'));

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

  // {
  //   description: "The incumbent will be the Senior Engineer responsible for leading the team responsible for providing engineering services in support of COMSUBPAC (N4) in their delivery of technical assistance to the submarine fleet.",
  //   title: "Senior Engineer",
  //   extendedDescr: "Thousands of new roles. Fifty states. One mission. The Navy is on a once-in-a-generation journey to completely transform its nuclear-powered submarine fleet and maintain its critical undersea advantage. However, this military mandate will require the addition of more than 100,000 skilled workers with the training and commitment to ensure success. And there's not a moment to spare.",
  //   companyName: "BuildSubmarines",
  //   duration: null,
  //   occupation: "Engineer",
  //   specialty: "Mechanical Engineer"}

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
