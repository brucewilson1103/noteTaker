CREATE DATABASE noteTakerDB;
USE noteTakerDB;

CREATE TABLE notes
(
	id INT NOT NULL auto_increment,
	title VARCHAR(50) NOT NULL,
  message VARCHAR(250) NOT NULL,
    primary key (id)
);
