const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const bcrypt = require("bcryptjs");
const session = require("express-session");
const moment = require("moment");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const { v4: uuidv4 } = require('uuid');

saltRounds = 10;

const jobsPerPage = 3;

const jobCategories = {
  occupations: [
    {
      name: "Software Development",
      specialties: [
        "Application Development",
        "Backend Development",
        "Frontend Development",
      ],
    },
    {
      name: "Cybersecurity",
      specialties: [
        "Ethical Hacking",
        "Information Security Analysis",
        "Network Security",
      ],
    },
    {
      name: "Data Science",
      specialties: [
        "Machine Learning",
        "Big Data Analytics",
        "Artificial Intelligence",
      ],
    },
    {
      name: "Medicine",
      specialties: ["General Practice", "Cardiology", "Pediatrics"],
    },
    {
      name: "Nursing",
      specialties: [
        "Critical Care Nursing",
        "Pediatric Nursing",
        "Geriatric Nursing",
      ],
    },
    {
      name: "Therapy",
      specialties: [
        "Physical Therapy",
        "Occupational Therapy",
        "Speech Therapy",
      ],
    },
    {
      name: "Civil Engineering",
      specialties: [
        "Structural Engineering",
        "Transportation Engineering",
        "Environmental Engineering",
      ],
    },
    {
      name: "Mechanical Engineering",
      specialties: [
        "HVAC Engineering",
        "Robotics Engineering",
        "Automotive Engineering",
      ],
    },
    {
      name: "Electrical Engineering",
      specialties: [
        "Power Engineering",
        "Control Systems",
        "Telecommunications",
      ],
    },
    {
      name: "Accounting",
      specialties: [
        "Tax Accounting",
        "Forensic Accounting",
        "Management Accounting",
      ],
    },
    {
      name: "Investment Banking",
      specialties: [
        "Equity Research",
        "Mergers and Acquisitions",
        "Sales and Trading",
      ],
    },
    {
      name: "Financial Planning",
      specialties: [
        "Estate Planning",
        "Retirement Planning",
        "Wealth Management",
      ],
    },
    {
      name: "Teaching",
      specialties: [
        "Elementary Education",
        "Secondary Education",
        "Special Education",
      ],
    },
    {
      name: "Administration",
      specialties: [
        "School Administration",
        "Academic Counseling",
        "Curriculum Development",
      ],
    },
    {
      name: "Educational Technology",
      specialties: [
        "Instructional Design",
        "Learning Management Systems",
        "E-learning Development",
      ],
    },
  ],
};

const greekPrefectures = [
  "Achaea",
  "Aetolia-Acarnania",
  "Arcadia",
  "Argolis",
  "Arta",
  "Attica",
  "Boeotia",
  "Cephalonia",
  "Chania",
  "Chios",
  "Corfu",
  "Corinthia",
  "Cyclades",
  "Dodecanese",
  "Drama",
  "Elis",
  "Euboea",
  "Evros",
  "Evrytania",
  "Florina",
  "Grevena",
  "Heraklion",
  "Imathia",
  "Ioannina",
  "Karditsa",
  "Kastoria",
  "Kavala",
  "Kefalonia",
  "Kilkis",
  "Kozani",
  "Laconia",
  "Larissa",
  "Lassithi",
  "Lesbos",
  "Magnesia",
  "Messenia",
  "Pella",
  "Phocis",
  "Phthiotis",
  "Pieria",
  "Preveza",
  "Rethymno",
  "Rhodope",
  "Samos",
  "Serres",
  "Thesprotia",
  "Thessaloniki",
  "Trikala",
  "Xanthi",
  "Zakynthos",
];

const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/static');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    json: function (context) {
      return JSON.stringify(context);
    },
    ifEquals: function (arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    }
  }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 60 },
  })
);

app.use((req, res, next) => {
  if (req.url.includes("/employee")) {
    res.locals.currentPage = "employee";
  } else if (req.url.includes("/employer")) {
    res.locals.currentPage = "employer";
  } else {
    res.locals.currentPage = "";
  }

  if (req.session.user && "occupation" in req.session.user) {
    res.locals.isEmployee = 1;
  } else {
    res.locals.isEmployee = 0;
  }

  res.locals.session = req.session;
  next();
});

// Middleware to set the current user ID globally
function setGlobalUserId(req, res, next) {
  if (req.session && req.session.user && req.session.user.id) {
    res.locals.userId = req.session.user.id;
    console.log(res.locals.userId);
  } else {
    res.locals.userId = null;
  }
  next();
}

function authenticate(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.redirect("/login");
  }
}

function setCurrentPage(req, res, next) {
  if (req.path.startsWith("/employee")) {
    req.session.currentPage = "employee";
  } else if (req.path.startsWith("/employer")) {
    req.session.currentPage = "employer";
  } else {
    req.session.currentPage = null;
  }
  next();
}

app.use(setCurrentPage);
app.use(setGlobalUserId);

// REST Routes
app.use(require("./routes/applicationRoutes.js"));
app.use(require("./routes/employeeRoutes.js"));
app.use(require("./routes/employerRoutes.js"));
app.use(require("./routes/jobRoutes.js"));
app.use(require("./routes/submitionRoutes.js"));
app.use(require("./routes/authenticationRoutes.js"));

app.get("/", (req, res) => {
  axios
    .get(`http://localhost:${port}/v1/jobs/latest`)
    .then((response) => {
      res.render("home", {
        jobs: response.data,
        session: req.session,
        userId: res.locals.userId
      });
    })
    .catch((error) => {
      console.error("Error fetching jobs:", error);
      res.status(500).send("Error fetching jobs");
    });
});

app.get("/employee", authenticate, async (req, res) => {
  try {
    const { id } = req.query;
    const [jobsResponse, employeeResponse] = await Promise.all([
      axios.get(`http://localhost:${port}/v1/job/byEmployee/${id}`),
      axios.get(`http://localhost:${port}/v1/employee/${id}`),
    ]);

    const jobs = jobsResponse.data;
    const employeeData = employeeResponse.data;

    res.render("employeeProfile", {
      employeeData: employeeData,
      jobs: jobs,
      jobCategories: jobCategories,
      regions: greekPrefectures,
      session: req.session,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error loading employer profile");
  }
});

app.post("/employee", authenticate, async (req, res) => {
  try {
    let userId = res.locals.userId;
    const {
      firstName,
      lastName,
      email,
      region,
      address,
      phone1,
      phone2,
      occupation,
      specialty,
    } = req.body;
    console.error(req.body);
    await axios.put(`http://localhost:${port}/v1/employee/${userId}`, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      region: region,
      address: address,
      phone1: phone1,
      phone2: phone2,
      occupation: typeof occupation === 'string' ? occupation : jobCategories.occupations[parseInt(occupation)].name,
      specialty: specialty,
    });
    res.redirect(`/employee?id=${userId}`);
  } catch (error) {
    console.error("Error updating employee info", error);
    res.status(500).send("Error updating employee info");
  }
});

app.post('/employee/uploadProfilePicture', upload.single('profilePicture'), authenticate, async (req, res) => {
  try {
    let userId = req.session.user.id;
    const filePath = req.file.path;
    await axios.put(`http://localhost:${port}/v1/employee/${userId}`, {
      profilePicturePath: filePath.slice(7)
    });
    res.redirect(`/employee?id=${userId}`);
  } catch (error) {
    console.error('Error uploading image', error);
    res.status(500).send('Error uploading image');
  }
});

app.post('/employee/uploadCV', upload.single('cv'), authenticate, async (req, res) => {
  try {
    let userId = req.session.user.id;
    const filePath = req.file.path;
    await axios.put(`http://localhost:${port}/v1/employee/${userId}`, {
      cvPath: filePath.slice(7)
    });
    res.redirect(`/employee?id=${userId}`);
  } catch (error) {
    console.error('Error uploading CV', error);
    res.status(500).send('Error uploading CV');
  }
});

app.get("/employer", authenticate, async (req, res) => {
  try {
    const { id } = req.query;
    const [jobsResponse, employerResponse] = await Promise.all([
      axios.get(`http://localhost:${port}/v1/job/byEmployer/${id}`),
      axios.get(`http://localhost:${port}/v1/employer/${id}`),
    ]);

    const jobs = jobsResponse.data;
    const employerData = employerResponse.data;

    res.render("employerProfile", {
      employerData: employerData,
      jobs: jobs,
      jobCategories: jobCategories,
      regions: greekPrefectures,
      session: req.session,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error loading employer profile");
  }
});

// Update employer's profile with the pop-up
app.post("/employer", authenticate, async (req, res) => {
  
  let userId = req.session.user.id;
  try {
    const {
      editFirstName,
      editLastName,
      editEmail,
      editRegion,
      editAddress,
      editPhone1,
      editPhone2,
      editCompanyDesc,
      jobTitle,
      jobDescription,
      extendedDescr,
      jobDuration,
      companyName,
      jobOccupation,
      jobSpecialty,
      jobId
    } = req.body;

    if (jobTitle !== undefined) {
      try {
        let newJobResponse = await axios({
          method: "post",
          url: `http://localhost:${port}/v1/job`,
          data: {
            description: jobDescription,
            title: jobTitle,
            extendedDescr: extendedDescr,
            duration: jobDuration,
            companyName: companyName,
            occupation: typeof jobOccupation === 'string' ? jobOccupation : jobCategories.occupations[parseInt(jobOccupation)].name,
            specialty: jobSpecialty,
          },
        });

        await axios({
          method: "post",
          url: `http://localhost:${port}/v1/submition`,
          data: {
            employerId: userId,
            jobId: newJobResponse.data.id,
          },
        });

        res.redirect(`/employer?id=${userId}`);
      } catch (error) {
        console.error("Error creating job", error);
        res.status(500).send("Error creating job");
      }
    } else if (editFirstName !== undefined) {
      try {
        await axios.put(`http://localhost:${port}/v1/employer/${userId}`, {
          firstName: editFirstName,
          lastName: editLastName,
          email: editEmail,
          region: editRegion,
          address: editAddress,
          phone1: editPhone1,
          phone2: editPhone2,
          companyDesc: editCompanyDesc,
        });
        res.redirect(`/employer?id=${userId}`);
      } catch (error) {
        console.error("Error updating employer info", error);
        res.status(500).send("Error updating employer info");
      }
    }
    else{
      const [submitResponse, jobResponse] = await Promise.all([
        axios.delete(`http://localhost:3000/v1/job/${jobId}`),
      ]);
      res.redirect(`/employer?id=${userId}`);
    }
  } catch (error) {
    console.error("Sign Up error:", error);
    res.status(401).send("Sign Up failed: " + error.message);
  }
});

app.post('/employer/uploadProfilePicture', upload.single('profilePicture'), authenticate, async (req, res) => {
  try {
    let userId = req.session.user.id;
    const filePath = req.file.path;
    await axios.put(`http://localhost:${port}/v1/employer/${userId}`, {
      profilePicturePath: filePath.slice(7)
    });
    res.redirect(`/employer?id=${userId}`);
  } catch (error) {
    console.error('Error uploading image', error);
    res.status(500).send('Error uploading image');
  }
});

app.post("/employer/updateJob", authenticate, async (req, res) => {
  
  try {
    const {
      editJobId,
      editJobTitle,
      editJobDescription,
      editJobExtendedDescr,
      editJobDuration,
      editJobCompanyName,
      editJobOccupation,
      editJobSpecialty,
    } = req.body;

    console.log("MEGALO PEOS");
    console.log(req.body);

    const jobId = req.body.jobId; 

    res.redirect("/employer/jobs");
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).send("Internal Server Error");
  }
});



app.get("/jobs", (req, res) => {
  const { occupation, specialty, region } = req.query;

  if (occupation === undefined && specialty === undefined && region === undefined) {
    axios.get(`http://localhost:${port}/v1/jobs`)
      .then((response) => {
        res.render("jobs", {
          jobs: response.data,
          jobCategories: jobCategories,
          regions: greekPrefectures,
          session: req.session,
          userId: res.locals.userId,
        }); // , { jobs: response.data }
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        res.status(500).send("Error fetching jobs");
      });
  } else {
    axios.get(`http://localhost:${port}/v1/jobs/getbyfilters`, { params: { occupation, specialty, region } })
      .then((response) => {
        res.render("jobs", {
          jobs: response.data,
          jobCategories: jobCategories,
          regions: greekPrefectures,
          session: req.session,
          userId: res.locals.userId,
        });
      })
      .catch((error) => {
        console.error("Error fetching filtered jobs:", error);
        res.status(500).send("Error fetching jobs");
      });
  }
});

app.get("/jobs/filters", (req, res) => {
  const { occupation, specialty, region } = req.query;

  axios.get(`http://localhost:${port}/v1/jobs/getbyfilters`, { params: { occupation, specialty, region } })
    .then((response) => {
      res.render("jobs", {
        jobs: response.data,
        jobCategories: jobCategories,
        regions: greekPrefectures,
        session: req.session,
      });
    })
    .catch((error) => {
      console.error("Error fetching filtered jobs:", error);
      res.status(500).send("Error fetching jobs");
    });
  
});

app.post("/jobs", async (req, res) => {
  const jobId = req.body;
  console.log(jobId);
  let userId = res.locals.userId;
  const applicationDate = new Date();
  const formattedDate = moment(applicationDate).format("YYYY-MM-DD");
  if(userId){
    try {
      await axios({
        method: "post",
        url: `http://localhost:${port}/v1/application`,
        data: {
          employeeId: userId,
          jobId: jobId,
          applicationDate: formattedDate,
        }
      });
      res.redirect("/jobs");
    } catch (error) {
      console.error("Your application to the job failed ", error);
      res
        .status(500)
        .send("Sign Your application to the job failed " + error.message);
    }
     
  }else{
    console.error("No sign up");
    res.render("login"); 
  }
  res.render("jobs");
});

app.get("/about", (req, res) => {
  res.render("about", {
    session: req.session,
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
    session: req.session,
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  axios.get(`http://localhost:${port}/v1/getUserByEmail`, { params: { email } })
    .then(async (response) => {
      const user = response.data.user;
      const userType = response.data.userType;
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const userId = encodeURIComponent(JSON.stringify(user.id));

        req.session.user = user;
        req.session.userType = user.userType;

        if (userType === "employee") {
          req.session.userType = "employee";
          res.redirect(`/employee?id=${userId}`);
        } else if (userType === "employer") {
          res.redirect(`/employer?id=${userId}`);
        } else {
          res.status(401).send("Login failed: Invalid user type");
        }
      } else {
        res.status(401).send("Login failed: Incorrect password");
      }
    })
    .catch((error) => {
      console.error("Login error:", error);
      res.status(401).send("Login failed: " + error.message);
    });
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send("Error logging out");
    } else {
      res.redirect("/");
    }
  });
});

app.get("/signup", (req, res) => {
  res.render("signup", {
    jobCategories: jobCategories,
    regions: greekPrefectures,
    session: req.session,
  });
});

app.post("/signup", async (req, res) => {
  const {
    employee_firstname,
    employee_lastname,
    employee_email,
    employee_password,
    employee_region,
    employee_address,
    employee_phone1,
    employee_phone2,
    employee_occupation,
    employee_specialty,
    employer_firstname,
    employer_lastname,
    employer_email,
    employer_password,
    employer_region,
    employer_address,
    employer_phone1,
    employer_phone2,
    employer_company_name,
    employer_company_desc,
  } = req.body;

  const email = employee_email !== undefined ? employee_email : employer_email;
  const password = employee_password !== undefined ? employee_password : employer_password;

  try {
    const response = await axios.get(`http://localhost:${port}/v1/getUserByEmail`, { params: { email } });

    if (response.status === 205) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

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
          occupation: typeof employee_occupation === "string" ? employee_occupation : jobCategories.occupations[parseInt(employee_occupation)].name,
          specialty: employee_specialty,
          profilePicturePath: null,
          cvPath: null,
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
          companyDesc: employer_company_desc,
        });
      }

      const loginResponse = await axios.get(`http://localhost:${port}/v1/getUserByEmail`, { params: { email } });

      const userType = loginResponse.data.userType;
      const user = loginResponse.data.user;

      const userId = encodeURIComponent(JSON.stringify(user.id));

      req.session.user = user;
      req.session.userType = user.userType;
      res.locals.isEmployee = user.userType === "employee";

      if (userType === "employee") {
        res.redirect(`/employee?id=${userId}`);
      } else if (userType === "employer") {
        res.redirect(`/employer?id=${userId}`);
      } else {
        res.status(401).send("Login failed: Invalid user type");
      }
    } else {
      res.status(401).send("Sign Up failed: This email is already in use");
    }
  } catch (error) {
    console.error("Sign Up error:", error);
    res.status(401).send("Sign Up failed: " + error.message);
  }
});

app.get('/pdf/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'public', 'pdfs', filename);
  res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});