const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('pages/home');
});

app.get('/employee', (req, res) => {
    res.render('pages/employeeProfile');
});
app.get('/employer', (req, res) => {
  res.render('pages/employerProfile', {
    firstname:"Maria",
    lastname: "Rousou",
    email: "marpap@gmail.com",
    phone1: "6981234567",
    phone2: null,
    address: "Ermou 33",
    region: "Athens",
    comp_name: "Kafe Mpampis",
    comp_desc: "To kafe Mpampis einai ena poly omorfo kafe stous propodes ths akropolis.",
    job_title: ["Kafetzis", "Mprizas", "Mhxanikos Autokiniton"],
    job_desc: "Mia fora kai enan kairo htan h kokkinoskoufitsa kai efage ton kako ton lyko telos."
  });
});

app.get('/jobs', (req, res) => {
  res.render('pages/jobs');
});

app.get('/about', (req, res) => {
  res.render('pages/about');
});

app.get('/login', (req, res) => {
  res.render('pages/login');
});

app.get('/signup', (req, res) => {
  res.render('pages/signup');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
