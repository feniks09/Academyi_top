PRAGMA foreign_keys = ON;
drop TABLE if EXISTS "Данные_цена_количество";
drop TABLE if EXISTS "Марка_мороженного";
drop TABLE if EXISTS "Производитель_мороженного";

create table if not exists "Марка_мороженного"
("id" INTEGER PRIMARY KEY AUTOINCREMENT,
 "name" TEXT NOT NULL check( "name" != '' ) UNIQUE);

create table if not exists "Производитель_мороженного"
("id" INTEGER PRIMARY KEY AUTOINCREMENT,
 "name" TEXT NOT NULL check( "name" != '' ) UNIQUE);
 
CREATE TABLE if not EXISTS "Данные_цена_количество"
("id" INTEGER PRIMARY KEY AUTOINCREMENT,
 "Марка_id" INTEGER,
 "Производитель_id" INTEGER,
 "Цена" INTEGER not NULL CHECK("Цена" > 0),
"Количество" INTEGER not NULL CHECK("Количество" > 0),
 foreign key ("Марка_id") references "Марка_мороженного"("id"),
 foreign key ("Производитель_id") references "Производитель_мороженного"("id"),
 UNIQUE ("Марка_id", "Производитель_id")
);
