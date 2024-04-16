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

// JOB endpoints
app.post('/job/', (req, res) => {
  res.send('Job created');
});

app.get('/job/:id', (req, res) => {
  res.send(`Retrieve job with ID ${req.params.id}`);
});

app.get('/jobs/', (req, res) => {
  res.send('All jobs retrieved');
});

app.put('/job/:id', (req, res) => {
  res.send(`Update job with ID ${req.params.id}`);
});

app.delete('/job/:id', (req, res) => {
  res.send(`Job with ID ${req.params.id} deleted`);
});

// EMPLOYEE endpoints

app.post('/employee/', (req, res) => {
  res.send('Employee created');
});

app.get('/employee/:id', (req, res) => {
  res.send(`Retrieve employee with ID ${req.params.id}`);
});

app.get('/employees/', (req, res) => {
  res.send('All employees retrieved');
});

app.put('/employee/:id', (req, res) => {
  res.send(`Update employee with ID ${req.params.id}`);
});

app.delete('/employee/:id', (req, res) => {
  res.send(`Employee with ID ${req.params.id} deleted`);
});


// EMPLOYER endpoints

app.post('/employer/', (req, res) => {
  res.send('Employer created');
});

app.get('/employer/:id', (req, res) => {
  res.send(`Retrieve employer with ID ${req.params.id}`);
});

app.get('/employers/', (req, res) => {
  res.send('All employers retrieved');
});

app.put('/employer/:id', (req, res) => {
  res.send(`Update employer with ID ${req.params.id}`);
});

app.delete('/employer/:id', (req, res) => {
  res.send(`Employer with ID ${req.params.id} deleted`);
});


// APPLIES endpoints

app.post('/application/', (req, res) => {
  res.send('Application created');
});

app.get('/application/:id', (req, res) => {
  res.send(`Retrieve application with ID ${req.params.id}`);
});

app.get('/applications/', (req, res) => {
  res.send('All applications retrieved');
});

app.put('/application/:id', (req, res) => {
  res.send(`Update application with ID ${req.params.id}`);
});

app.delete('/application/:id', (req, res) => {
  res.send(`Application with ID ${req.params.id} deleted`);
});



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
