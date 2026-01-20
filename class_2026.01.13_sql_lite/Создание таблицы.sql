PRAGMA foreign_keys = ON;

drop table if exists "Album";
drop table if exists "Band";

create table if not exists "Band"
(
  "id" INTEGER primary key AUTOINCREMENT,
  "name" NVARCHAR(50) NOT NULL CHECK ("name" != '') UNIQUE,
  "year_of_creation" INTEGER NOT NULL
  		CHECK ("year_of_creation" > 1900)
);
 
CREATE TABLE IF NOT EXISTS "Album"
("id" INTEGER primary key AUTOINCREMENT,
 "name" NVARCHAR(200) NOT NULL check ('name' != ''),
 "year_of_creation" INTEGER NOT NULL
  		CHECK ("year_of_creation" > 1900),
 "track_count" INTEGER NOT NULL CHECK ('track_count' > 0),
 "band_id" INTEGER,
 FOREIGN KEY ("band_id") references "Band" ("id")
 	on update CASCADE
 	on DELETE cascade 
 
)