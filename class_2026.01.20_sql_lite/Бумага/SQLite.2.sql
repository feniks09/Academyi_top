PRAGMA foreign_keys = ON;
DROP TABLE if EXISTS "Sheet";
DROP TABLE if EXISTS "Material";
CREATE TABLE if not exists "Material"
(
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" TEXT not NULL check ("name" != '') UNIQUE);
  
 
 CREATE TABLE if not EXISTS "Sheet"
 (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
   "width" REAL NOT NULL CHECK ("width" > 0),
   "heigth" REAL NOT NULL CHECK ("heigth" > 0),
   "material_id" INTEGER NOT NULL,
   FOREIGN KEY ("material_id") REFERENCES "Material" ("id")
     on update CASCADE
     ON delete CASCADE
   );