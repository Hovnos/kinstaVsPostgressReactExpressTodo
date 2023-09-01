create database postgres;

create table todos(
    id varchar(255) primary key,
    user_email varchar (255),
    title varchar(30),
    progress int,
    date varchar(300)
);

create table users (
    email varchar(255) primary key,
    hashed_password varchar(255)
);

/*insert into todos(id, user_email, title, progress, date) 
values ('0','filip@test.com','First todo', 10 ,'1april');