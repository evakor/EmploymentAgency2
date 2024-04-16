CREATE TABLE IF NOT EXISTS "USER" (
	"id" integer,
	"firstName" string,
	"lastName" string,
	"region" string,
	"address" string,
	"phone1" integer,
	"phone2" integer,
	"email" string,
	"password" string,
	"jobCategory" string,
	"profilePicturePath" text,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "EMPLOYEE" (
	"cvPath" text,
	"id" integer,
	"occupation" string,
	"specialty" string,
	PRIMARY KEY ("id"),
	FOREIGN KEY ("id") REFERENCES "USER" ("id")
            ON UPDATE RESTRICT
            ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS "JOB" (
	"id" integer,
	"imagePath" text,
	"description" text,
	"title" text,
	"extendedDescr" text,
	"companyName" text,
	"duration" date,
	"occupation" string,
	"specialty" string,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "EMPLOYER" (
	"companyName" text,
	"companyDesc" text,
	"id" integer,
	PRIMARY KEY ("id"),
	FOREIGN KEY ("id") REFERENCES "USER" ("id")
            ON UPDATE RESTRICT
            ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS "Submits" (
	"employerId" integer,
	"jobId" integer,
	"creationDate" date,
	PRIMARY KEY ("employerId", "jobId"),
	FOREIGN KEY ("employerId") REFERENCES "EMPLOYER" ("id")
            ON UPDATE RESTRICT
            ON DELETE RESTRICT,
	FOREIGN KEY ("jobId") REFERENCES "JOB" ("id")
            ON UPDATE RESTRICT
            ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS "Applies" (
	"employeeId" integer,
	"jobId" ,
	PRIMARY KEY ("employeeId", "jobId"),
	FOREIGN KEY ("employeeId") REFERENCES "EMPLOYEE" ("id")
            ON UPDATE RESTRICT
            ON DELETE RESTRICT,
	FOREIGN KEY ("jobId") REFERENCES "JOB" ("id")
            ON UPDATE RESTRICT
            ON DELETE RESTRICT
);

