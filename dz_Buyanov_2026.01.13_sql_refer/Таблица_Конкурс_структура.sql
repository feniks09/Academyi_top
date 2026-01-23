PRAGMA foreign_keys = ON;

drop table if exists "demo";
Drop table if exists "Contest";
Drop table if exists "Participant";
drop table if exists "Сountry";
DROP table if exists "Tools";
DROP table if exists "Аutor_the_work";

create table if not exists "Сountry"
("id" INTEGER PRIMARY KEY AUTOINCREMENT,
 "name" TEXT NOT NULL CHECK( "name" != '' )
);
 
create table if not exists "Tools"
("id" INTEGER PRIMARY KEY AUTOINCREMENT,
 "name" TEXT NOT NULL CHECK( "name" != '' )
);
  
create table if not exists "Аutor_the_work"
("id" INTEGER PRIMARY KEY AUTOINCREMENT,
 "surname" TEXT NOT NULL CHECK( "surname" != '' )
);

CREATE TABLE IF NOT EXISTS "Participant"
("id" INTEGER PRIMARY KEY AUTOINCREMENT,
 "Surname" TEXT not NULL check ("Surname" != ''),
 "Сountry_id" INTEGER,
 "Tools_id" INTEGER,
 "Аutor_the_work_id" INTEGER,
 foreign key ("Сountry_id") references "Сountry"("id")
 on update cascade
 on delete set NULL,
 foreign key ("Tools_id") references "Tools"("id")
 on update cascade
 on delete set NULL,
 foreign key ("Аutor_the_work_id") references "Аutor_the_work"("id")
 on update cascade
 on delete set NULL
);
 
CREATE TABLE IF NOT EXISTS "Contest"
("id" INTEGER PRIMARY KEY AUTOINCREMENT,
 "Participant_id" INTEGER,
 "Place" INTEGER NOT NULL CHECK( "Place" > 0 ),
 FOREIGN KEY ("Participant_id") REFERENCES "Participant"("id")
 ON UPDATE CASCADE
 ON DELETE SET NULL

);
                                          
                                          
   
  
  