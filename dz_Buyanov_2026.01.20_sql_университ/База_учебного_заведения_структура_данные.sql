INSERT INTO "Teacher"
( 
  "Sorname",
  "Name",
 "Patronymik",
 "Status"
)

VALUES
('Иванов', 'Алексей', 'Олегович','На работе'),
('Петров','Валентин','Петрович','На работе'),
('Сидорв','Иван','Валентинович','В отпуске');

INSERT INTO "Student"
( 
  "Sorname",
  "Name",
 "Patronymik",
 "id_group"
)

VALUES
('Филькина','Анастасия','Игоревна', 1),
('Перышкин','Петр','Васильевич', 2),
('Васильков','Инокентий','Смоктуновский', 3);

INSERT INTO "Group"
( 
  "Name",
 "id_courcec_years_study"
)

VALUES
('Л-12', 1),
('Л-21', 2),
('Л-33', 3);

INSERT INTO "Objects"
( 
  "Name",
 "id_teacher",
  "id_group"
)

VALUES
('Математика', 1, 1),
('Физика', 2, 1),
('История', 2, 1),
('Астрономия', 1, 2),
('Физика', 2, 2),
('История', 1, 2);

INSERT INTO "Courcec_years_study"
( 
  "Name",
 "Years_study"
)

VALUES
('1-П', 1),
('2-Ц', 2),
('3-К', 3);



