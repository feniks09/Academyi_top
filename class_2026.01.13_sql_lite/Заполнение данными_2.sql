DELETE from "Album";
delete from "Band";

insert into "Band"
	("name", "year_of_creation")
VALUES 
	('Звукачи', 1980);
INSERT into "Album"
    ("name", "year_of_creation", "track_count", "band_id")

VALUES
	('Ого-го', 
     1987, 
     10, 
     ( -- Подзапрос. id ищет автомат
       SELECT "id" From "Band"
       where "Band" . "name" like 'Звукачи'
     )
)