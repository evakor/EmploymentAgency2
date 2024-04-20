const express = require('express');
const axios = require('axios');
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
  axios.get(`http://localhost:${port}/v1/jobs`)
  .then(response => {
    console.log(response.data)
    res.render('home', { jobs: response.data });
  })
  .catch(error => {
    console.error('Error fetching jobs:', error);
    res.status(500).send('Error fetching jobs');
  });
});

app.get('/employee', async (req, res) => {
  try {
    const id = 1;
    const [jobsResponse, employerResponse] = await Promise.all([
      axios.get(`http://localhost:${port}/v1/jobs`),
      axios.get(`http://localhost:${port}/v1/employee/${id}`)
    ]);

    const jobs = jobsResponse.data;
    const employeeData = employerResponse.data;

    res.render('employeeProfile', {
      employeeData: employeeData,
      jobs: jobs,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error loading employer profile');
  }
});

app.get('/employer', async (req, res) => {
  try {
    const id = 1;
    const [jobsResponse, employerResponse] = await Promise.all([
      axios.get(`http://localhost:${port}/v1/jobs`),
      axios.get(`http://localhost:${port}/v1/employer/${id}`),
      // axios.get(`http://localhost:${port}/v1/applications/byUserId/${id}`)
    ]);

    const jobs = jobsResponse.data;
    const employeeData = employerResponse.data;
    // const applications = applicationsResponse.data;

    res.render('employeeProfile', {
      employeeData: employeeData,
      jobs: jobs,
      // applications: applications,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error loading employer profile');
  }
});

app.get('/jobs', (req, res) => {
  axios.get(`http://localhost:${port}/v1/jobs`)
    .then(response => {
      console.log(response.data)
      res.render('jobs', { jobs: response.data }); // , { jobs: response.data }
    })
    .catch(error => {
      console.error('Error fetching jobs:', error);
      res.status(500).send('Error fetching jobs');
    });
});


  // {
  //   description: "The incumbent will be the Senior Engineer responsible for leading the team responsible for providing engineering services in support of COMSUBPAC (N4) in their delivery of technical assistance to the submarine fleet.",
  //   title: "Senior Engineer",
  //   extendedDescr: "Thousands of new roles. Fifty states. One mission. The Navy is on a once-in-a-generation journey to completely transform its nuclear-powered submarine fleet and maintain its critical undersea advantage. However, this military mandate will require the addition of more than 100,000 skilled workers with the training and commitment to ensure success. And there's not a moment to spare.",
  //   companyName: "BuildSubmarines",
  //   duration: null,
  //   occupation: "Engineer",
  //   specialty: "Mechanical Engineer"}
  // {
  //   firstname: "Maria",
  //   lastname: "Rousou",
  //   email: "marpap@gmail.com",
  //   phone1: "6981234567",
  //   phone2: null,
  //   address: "Ermou 33",
  //   region: "Athens",
  //   comp_name: "Kafe Mpampis",
  //   comp_desc: "To kafe Mpampis einai ena poly omorfo kafe stous propodes ths Akropolis.",
  //   job_title: ["Barman", "Ydravlikos", "Mhxanikos Autokiniton"],
  //   job_desc: "Edo einai to description! Edo tha leei pragmata gia thn douleia!"
  // }

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
