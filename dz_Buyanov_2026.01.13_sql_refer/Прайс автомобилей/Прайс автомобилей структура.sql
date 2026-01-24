Pragma foreign_keys = ON;
drop table if EXISTS "demo";
drop table if exists "Price";
drop table if exists "Manufacturer";
drop table if exists "Model";
Drop table if exists "City";

create table if not EXISTS "City"
(
  "id" INTEGER PRIMARY key AUTOINCREMENT,
  "Name" TEXT not NULL CHECK ("Name" != '')
);

create TABLE if not exists "Model"
(
  "id" INTEGER primary key autoincrement,
  "Name" TEXT not NULL check ("Name" != ''),
  "Speed (km/h)" INTEGER NOT NULL check ("Speed (km/h)" > 0)
);

create table if not EXISTS "Manufacturer"
(
 "id" INTEGER PRIMARY key AUTOINCREMENT,
 "Name" TEXT not NULL CHECK ("Name" != ''),
 "City_id" INTEGER,
  FOREIGN KEY ("City_id") references "City"("id")
  ON UPdate CASCADE
  on delete set NULL
);

create table if not exists "Price"
(
  "id" INTEGER primary key autoincrement,
  "Manufacturer_id" INTEGER,
  "Model_id" INTEGER,
  "Yaer" INTEGER not NULL CHECK ("Yaer" > 0),
  "Price (rub)" INTEGER not NULL CHECK ("Price (rub)" > 0),
  foreign key ("Manufacturer_id") references "Manufacturer"("id")
  on update CASCADE
  on delete set NULL,
  foreign key ("Model_id") references "Model"("id")
  on update CASCADE
  on delete set NULL
  );



