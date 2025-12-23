drop TABLE if exists demo;
Drop TABLE if exists employes;
create table if not exists employes 
(
  "id" INTEGER Primary key AUTOINCREMENT,
 "фамилия" TEXT NOT NULL check ("фамилия" != ''),
 "имя" TEXT NOT NULL CHECK ( "имя" != ''),
 "отчество" TEXT CHECK("отчество" != ''),
 "№_отдела" INTEGER NOT NULL CHECK("№_отдела" >= 1 and "№_отдела" <= 10), 
 "должность" TEXT NOT NULL CHECK("должность" != '')
);