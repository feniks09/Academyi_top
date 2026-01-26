PRAGMA foreign_keys = ON;
drop TABLE if EXISTS "demo";
DROP TABLE if EXISTS "Результаты конкурса";
DROP TABLE if EXISTS "Страны";
DROP TABLE if EXISTS "Инструменты";
DROP TABLE if EXISTS "Авторы произведения";


CREATE table if not exists "Страны"
 ("id" INTEGER PRIMARY KEY AUTOINCREMENT,
 "Название" NVARCHAR(50) not NULL check ("Название" != '') 
 );
 
 CREATE table if not exists "Инструменты"
 ("id" INTEGER PRIMARY KEY AUTOINCREMENT,
 "Название" NVARCHAR(50) not NULL check ("Название" != '') 
 );

CREATE table if not exists "Авторы произведения"
 ("id" INTEGER PRIMARY KEY AUTOINCREMENT,
 "Фамилия" NVARCHAR(50) not NULL check ("Фамилия" != '') 
 );
 
 create table if not EXISTS "Результаты конкурса"
 ("id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "Фамилия" NVARCHAR(50) not NULL check ("Фамилия" != ''),
  "id_cтраны" INTEGER,
  "id_инструмента" INTEGER,
  "id_автора произведения" INTEGER,
  "Место в зачете" NVARCHAR(50) not NULL check ("Место в зачете" != ''),
  foreign key ("id_cтраны") references "Страны"("id"),
  foreign key ("id_инструмента") references "Инструменты"("id"),
  foreign key ("id_автора произведения") references "Авторы произведения"("id")
 
 );
  
  
  
  