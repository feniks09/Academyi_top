PRAGMA foreign_keys = ON;

drop table if exists "demo";
drop table if exists "Страна";
DROP table if exists "Инструменты";
DROP table if exists "Автор_произведения";
Drop table if exists "Конкурс";

create table if not exists "Страна"
("id" INTEGER PRIMARY KEY AUTOINCREMENT
,"Страна" TEXT NOT NULL CHECK( "Страна" != '' ));
 
create table if not exists "Инструменты"
("id" INTEGER PRIMARY KEY AUTOINCREMENT
,"Инструменты" TEXT NOT NULL CHECK( "Инструменты" != '' ));
  
create table if not exists "Автор_произведения"
("id" INTEGER PRIMARY KEY AUTOINCREMENT
,"Автор_произведения" TEXT NOT NULL CHECK( "Автор_произведения" != '' ));

CREATE TABLE IF NOT EXISTS "Конкурс"
("id" INTEGER PRIMARY KEY AUTOINCREMENT
 ,"Фамилия" TEXT NOT NULL CHECK ( "Фамилия" != '' )
 ,"место" INTEGER NOT NULL CHECK( "место" > 0 )
 ,"country_id" INTEGER
 ,FOREIGN KEY ("country_id") REFERENCES "Страна"("id")
  ON UPDATE CASCADE
  ON DELETE SET NULL
 ,"Tools_id" INTEGER
 , foreign key ("Tools_id") references "Инструменты"("id")
 on update cascade
 on delete set NULL
                              
);
                                          
                                          
   
  
  