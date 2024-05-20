const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require("bcryptjs")
const session = require('express-session');
const app = express();
const port = 3000;
const { engine } = require('express-handlebars');

saltRounds = 10;

const jobCategories = {
  occupations: [
    { name: "Software Development", specialties: ["Application Development", "Backend Development", "Frontend Development"] },
    { name: "Cybersecurity", specialties: ["Ethical Hacking", "Information Security Analysis", "Network Security"] },
    { name: "Data Science", specialties: ["Machine Learning", "Big Data Analytics", "Artificial Intelligence"] },
    { name: "Medicine", specialties: ["General Practice", "Cardiology", "Pediatrics"] },
    { name: "Nursing", specialties: ["Critical Care Nursing", "Pediatric Nursing", "Geriatric Nursing"] },
    { name: "Therapy", specialties: ["Physical Therapy", "Occupational Therapy", "Speech Therapy"] },
    { name: "Civil Engineering", specialties: ["Structural Engineering", "Transportation Engineering", "Environmental Engineering"] },
    { name: "Mechanical Engineering", specialties: ["HVAC Engineering", "Robotics Engineering", "Automotive Engineering"] },
    { name: "Electrical Engineering", specialties: ["Power Engineering", "Control Systems", "Telecommunications"] },
    { name: "Accounting", specialties: ["Tax Accounting", "Forensic Accounting", "Management Accounting"] },
    { name: "Investment Banking", specialties: ["Equity Research", "Mergers and Acquisitions", "Sales and Trading"] },
    { name: "Financial Planning", specialties: ["Estate Planning", "Retirement Planning", "Wealth Management"] },
    { name: "Teaching", specialties: ["Elementary Education", "Secondary Education", "Special Education"] },
    { name: "Administration", specialties: ["School Administration", "Academic Counseling", "Curriculum Development"] },
    { name: "Educational Technology", specialties: ["Instructional Design", "Learning Management Systems", "E-learning Development"] }
  ]
};

const greekPrefectures = [
  "Achaea", "Aetolia-Acarnania", "Arcadia", "Argolis", "Arta", "Attica", "Boeotia", "Cephalonia",
  "Chania", "Chios", "Corfu", "Corinthia", "Cyclades", "Dodecanese", "Drama", "Elis",
  "Euboea", "Evros", "Evrytania", "Florina", "Grevena", "Heraklion", "Imathia", "Ioannina",
  "Karditsa", "Kastoria", "Kavala", "Kefalonia", "Kilkis", "Kozani", "Laconia", "Larissa",
  "Lassithi", "Lesbos", "Magnesia", "Messenia", "Pella", "Phocis", "Phthiotis", "Pieria",
  "Preveza", "Rethymno", "Rhodope", "Samos", "Serres", "Thesprotia", "Thessaloniki", "Trikala",
  "Xanthi", "Zakynthos"
];

app.engine('hbs', engine({
  extname: '.hbs',
  helpers: {
    json: function (context) {
      return JSON.stringify(context);
    },
    ifEquals: function(arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    }
  },
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 * 60 }
}));

function authenticate(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.redirect('/login');
  }
}

function setCurrentPage(req, res, next) {
  if (req.path.startsWith('/employee')) {
    req.session.currentPage = 'employee';
  } else if (req.path.startsWith('/employer')) {
    req.session.currentPage = 'employer';
  } else {
    req.session.currentPage = null;
  }
  next();
}

app.use(setCurrentPage);

// REST Routes
app.use(require('./routes/applicationRoutes.js'));
app.use(require('./routes/employeeRoutes.js'));
app.use(require('./routes/employerRoutes.js'));
app.use(require('./routes/jobRoutes.js'));
app.use(require('./routes/submitionRoutes.js'));
app.use(require('./routes/authenticationRoutes.js'));

// View Routes
app.get('/', (req, res) => {
  axios.get(`http://localhost:${port}/v1/jobs/latest`)
    .then(response => {
      console.log(response.data)
      res.render('home', {
        jobs: response.data,
        session: req.session
      });
    })
    .catch(error => {
      console.error('Error fetching jobs:', error);
      res.status(500).send('Error fetching jobs');
    });
});

app.get('/employee', authenticate, async (req, res) => {
  try {
    const { id } = req.query;
    const [jobsResponse, employeeResponse] = await Promise.all([
      axios.get(`http://localhost:${port}/v1/job/byEmployee/${id}`),
      axios.get(`http://localhost:${port}/v1/employee/${id}`)
    ]);

    const jobs = jobsResponse.data;
    const employeeData = employeeResponse.data;

    console.log("req.session");
    console.log(req.session);

    res.render('employeeProfile', {
      employeeData: employeeData,
      jobs: jobs,
      session: req.session
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error loading employer profile');
  }
});

app.get('/employer', authenticate, async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
    const [jobsResponse, employerResponse] = await Promise.all([
      axios.get(`http://localhost:${port}/v1/job/byEmployer/${id}`),
      axios.get(`http://localhost:${port}/v1/employer/${id}`),
      // axios.get(`http://localhost:${port}/v1/applications/byUserId/${id}`)
    ]);

    console.log("req.session");
    console.log(req.session);

    const jobs = jobsResponse.data;
    const employerData = employerResponse.data;
    console.info(employerData);
    // const applications = applicationsResponse.data;

    res.render('employerProfile', {
      employerData: employerData,
      jobs: jobs,
      session: req.session
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error loading employer profile');
  }
});

app.post('/employer', authenticate, async (req, res) => {
  const { editFirstName, editLastName, editEmail, editPhone1, editPhone2, editAddress, editRegion, editCompanyDesc } = req.body;

  try {
    let userId = req.session.user.id;
    await axios.put(`http://localhost:${port}/v1/employer/${userId}`, {
      firstName: editFirstName,
      lastName: editLastName,
      email: editEmail,
      region: editRegion,
      address: editAddress,
      phone1: editPhone1,
      phone2: editPhone2,
      companyDesc: editCompanyDesc
    });
    res.redirect(`/employer?id=${userId}`);
  } catch (error) {
    console.error('Error updating employer info', error);
    res.status(500).send('Error updating employer info');
  }
});

app.get('/jobs', (req, res) => {
  // Extract filters from query parameters
  const { occupation, specialty, region } = req.query;

  // Construct the URL with query parameters for the API request


  if (occupation === undefined && specialty === undefined && region === undefined) {
    axios.get(`http://localhost:${port}/v1/jobs`)
      .then(response => {
        console.log(response.data)
        res.render('jobs', {
          jobs: response.data,
          jobCategories: jobCategories,
          regions: greekPrefectures,
          session: req.session
        }); // , { jobs: response.data }
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
        res.status(500).send('Error fetching jobs');
      });
  }
  else {
    axios.get(`http://localhost:${port}/v1/jobs/getbyfilters?occupation=${occupation}&specialty=${specialty}&region=${region}`)
      .then(response => {
        console.log(response.data);
        res.render('jobs', {
          jobs: response.data,
          jobCategories: jobCategories,
          regions: greekPrefectures,
          session: req.session
        });
      })
      .catch(error => {
        console.error('Error fetching filtered jobs:', error);
        res.status(500).send('Error fetching jobs');
      });
  }
});


app.get('/about', (req, res) => {
  res.render('about', {
    session: req.session
  });
});

app.get('/login', (req, res) => {
  res.render('login', {
    session: req.session
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  axios.get(`http://localhost:${port}/v1/getUserByEmail`, {
    params: { email }
  })
    .then(async (response) => {
      const user = response.data.user;
      const userType = response.data.userType;
      
      console.log(password);
      console.log(user.password);

      const match = await bcrypt.compare(password, user.password);
      console.log(match);

      if (match) {
        const userId = encodeURIComponent(JSON.stringify(user.id));

        req.session.user = user;
        req.session.userType = user.userType;
        req.session.isEmployee = user.userType === "employee";

        if (userType === 'employee') {
          res.redirect(`/employee?id=${userId}`);
        } else if (userType === 'employer') {
          res.redirect(`/employer?id=${userId}`);
        } else {
          res.status(401).send('Login failed: Invalid user type');
        }
      } else {
        res.status(401).send('Login failed: Incorrect password');
      }
    })
    .catch(error => {
      console.error('Login error:', error);
      res.status(401).send('Login failed: ' + error.message);
    });
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).send('Error logging out');
    } else {
      res.redirect('/');
    }
  });
});

app.get('/signup', (req, res) => {
  res.render('signup', {
    session: req.session,
    jobCategories: jobCategories,
    regions: greekPrefectures
  });
});

app.post('/signup', async (req, res) => {
  const { employee_firstname, employee_lastname, employee_email, employee_password,
    employee_region, employee_address, employee_phone1, employee_phone2, employee_occupation,
    employee_specialty, employer_firstname, employer_lastname, employer_email,
    employer_password, employer_region, employer_address, employer_phone1, employer_phone2,
    employer_company_name, employer_company_desc } = req.body;
  
  const email = employee_email !== undefined ? employee_email : employer_email;
  const password = employee_password !== undefined ? employee_password : employer_password;


  try {
    const response = await axios.get(`http://localhost:${port}/v1/getUserByEmail`, {
      params: { email }
    });

    if (response.status === 205) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      console.log(hashedPassword);

      if (employer_firstname === undefined) {
        await axios.post(`http://localhost:${port}/v1/employee`, {
          firstName: employee_firstname,
          lastName: employee_lastname,
          email: employee_email,
          password: hashedPassword,
          region: employee_region,
          address: employee_address,
          phone1: employee_phone1,
          phone2: employee_phone2,
          occupation: jobCategories.occupations[employee_occupation].name,
          specialty: employee_specialty,
          profilePicturePath: null,
          cvPath: null
        });
      } else {
        await axios.post(`http://localhost:${port}/v1/employer`, {
          firstName: employer_firstname,
          lastName: employer_lastname,
          email: employer_email,
          password: hashedPassword,
          region: employer_region,
          address: employer_address,
          phone1: employer_phone1,
          phone2: employer_phone2,
          companyName: employer_company_name,
          companyDesc: employer_company_desc
        });
      }

      const loginResponse = await axios.get(`http://localhost:${port}/v1/getUserByEmail`, {
        params: { email }
      });

      const userType = loginResponse.data.userType;
      const user = loginResponse.data.user;

      const userId = encodeURIComponent(JSON.stringify(user.id));

      req.session.user = user;
      req.session.userType = user.userType;
      req.session.isEmployee = user.userType === "employee";

      if (userType === 'employee') {
        res.redirect(`/employee?id=${userId}`);
      } else if (userType === 'employer') {
        res.redirect(`/employer?id=${userId}`);
      } else {
        res.status(401).send('Login failed: Invalid user type');
      }
    } else {
      res.status(401).send('Sign Up failed: This email is already in use');
    }
  } catch (error) {
    console.error('Sign Up error:', error);
    res.status(401).send('Sign Up failed: ' + error.message);
  }
});

//Update Employer profile
// app.post('/update-employer-profile', async (req, res) => {
//   const { firstName, lastName, email, phone1, phone2, address, region, description } = req.body;

//   try{
//     const employerId = req.session.user.id;
//     const employerProfile = employers[employerId]; 

//     // Update the employer profile with new values
//     if (employerProfile) {
//       axios.post(`http://localhost:${port}/v1/employer`, {
//         employerProfile.email = email,
//         employerProfile.phone1 = phone1,
//         employerProfile.phone2 = phone2,
//         employerProfile.firstName = firstName,
//         employerProfile.lastName = lastName,
//         employerProfile.address = address
//         employerProfile.region = region,
//         employerProfile.companyDesc = description})

//       // Save the updated profile back to the database
//       employers[employerId] = employerProfile; // Replace with actual DB update logic
//       res.status(200).send('Profile updated successfully');
//     } 
      // res.render('employerProfile');
//   } catch (error) {
//     console.error('Error updating employer profile:', error);
//     res.status(500);
//   }
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
