PRAGMA foreign_keys = ON;
DROP TABLE IF EXISTS "demo";
DROP TABLE IF EXISTS "Group";
DROP TABLE IF EXISTS "Student";
DROP TABLE IF EXISTS "Objects";
DROP TABLE IF EXISTS "Teacher";
DROP TABLE IF EXISTS "Courcec_years_study";



CREATE TABLE IF NOT EXISTS "Teacher"
("id" INTEGER PRIMARY KEY AUTOINCREMENT,
 "Sorname" TEXT NOT NULL CHECK ("Sorname" != ''),
 "Name" TEXT NOT NULL CHECK ("Name" != ''),
 "Patronymik" TEXT NOT NULL CHECK ("Patronymik" != ''),
 "Status" TEXT NOT NULL CHECK ("Status" != '')
);

CREATE TABLE IF NOT EXISTS "Group"
("id" INTEGER PRIMARY KEY AUTOINCREMENT,
 "Name" TEXT NOT NULL CHECK ("Name" != ''),
 "id_courcec_years_study" INTEGER,
 FOREIGN KEY ("id_courcec_years_study") REFERENCES "Courcec_years_study" ("id") 
);

CREATE TABLE IF NOT EXISTS "Courcec_years_study"
("id" INTEGER PRIMARY KEY AUTOINCREMENT,
 "Name" TEXT NOT NULL CHECK ("Name" != ''),
 "Years_study" INTEGER NOT NULL CHECK ("Years_study" > 0) 
);

CREATE TABLE IF NOT EXISTS "Student"
("id" INTEGER PRIMARY KEY AUTOINCREMENT,
 "Sorname" TEXT NOT NULL CHECK ("Sorname" != ''),
 "Name" TEXT NOT NULL CHECK ("Name" != ''),
 "Patronymik" TEXT NOT NULL CHECK ("Patronymik" != ''),
 "id_group" INTEGER,
 FOREIGN KEY ("id_group") REFERENCES "Group" ("id")
);

CREATE TABLE IF NOT EXISTS "Objects"
("id" INTEGER PRIMARY KEY AUTOINCREMENT,
 "Name" INTEGER NOT NULL CHECK ("Name" != ''),
 "id_teacher" INTEGER,
 "id_group" INTEGER,
 FOREIGN KEY ("id_teacher") REFERENCES "Teacher" ("id"),
 FOREIGN KEY ("id_group") REFERENCES "Group" ("id")
);













