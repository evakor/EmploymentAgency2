CREATE TABLE IF NOT EXISTS "EMPLOYEE" (
    "id" SERIAL PRIMARY KEY,
    "firstName" TEXT,
    "lastName" TEXT,
    "region" TEXT,
    "address" TEXT,
    "phone1" TEXT, -- Assuming phone numbers can contain non-numeric characters
    "phone2" TEXT, -- Assuming phone numbers can contain non-numeric characters
    "email" TEXT,
    "password" TEXT,
    "jobCategory" TEXT,
    "profilePicturePath" TEXT,
    "cvPath" TEXT,
    "occupation" TEXT,
    "specialty" TEXT
);

CREATE TABLE IF NOT EXISTS "JOB" (
    "id" SERIAL PRIMARY KEY,
    "imagePath" TEXT,
    "description" TEXT,
    "title" TEXT,
    "extendedDescr" TEXT,
    "companyName" TEXT,
    "duration" DATE,
    "occupation" TEXT,
    "specialty" TEXT
);

CREATE TABLE IF NOT EXISTS "EMPLOYER" (
    "id" SERIAL PRIMARY KEY,
    "firstName" TEXT,
    "lastName" TEXT,
    "region" TEXT,
    "address" TEXT,
    "phone1" TEXT, -- Assuming phone numbers can contain non-numeric characters
    "phone2" TEXT, -- Assuming phone numbers can contain non-numeric characters
    "email" TEXT,
    "password" TEXT,
    "jobCategory" TEXT,
    "profilePicturePath" TEXT,
    "companyName" TEXT,
    "companyDesc" TEXT
);

CREATE TABLE IF NOT EXISTS "Submits" (
    "employerId" INTEGER,
    "jobId" INTEGER,
    "creationDate" DATE,
    PRIMARY KEY ("employerId", "jobId"),
    FOREIGN KEY ("employerId") REFERENCES "EMPLOYER" ("id") ON UPDATE RESTRICT ON DELETE RESTRICT,
    FOREIGN KEY ("jobId") REFERENCES "JOB" ("id") ON UPDATE RESTRICT ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS "Applies" (
    "employeeId" INTEGER,
    "jobId" INTEGER,
    PRIMARY KEY ("employeeId", "jobId"),
    FOREIGN KEY ("employeeId") REFERENCES "EMPLOYEE" ("id") ON UPDATE RESTRICT ON DELETE RESTRICT,
    FOREIGN KEY ("jobId") REFERENCES "JOB" ("id") ON UPDATE RESTRICT ON DELETE RESTRICT
);
