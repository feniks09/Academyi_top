PRAGMA foreign_keys = ON;
drop table if exists "demo";
DROP TABLE IF EXISTS "The ship is launched";
drop table if exists "Type_ship";

create table if not exists "Type_ship"
(
  "id" INTEGER primary key AUTOINCREMENT,
 "Project_ship" NVARCHAR(50) NOT NULL CHECK ("Project_ship" != ''),
 "Crew" Nvarchar(50) not NULL CHECK ("Crew" != '')
);

create table if not exists "The ship is launched"
(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "Name" TEXT not NULL check ("Name" != ''),
  "Type_id" INTEGER,
  "The year of launching" INTEGER NOT NULL CHECK ("The year of launching"),
  foreign key ("Type_id") references "Type_ship"("id")
 ON UPDATE CASCADE 
 ON DELETE SET NULL
    
);