CREATE TABLE Users (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email varchar(251) NOT NULL,
    number_of_requests int NOT NULL,
    promo varchar(251) NOT NULL,
    token varchar(251) NOT NULL
);

CREATE TABLE VancouverRestaurant (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(251) NOT NULL,
    address varchar(251) NOT NULL,
    postal_code varchar(251) NOT NULL,
    status varchar(251) NOT NULL,
    cuisine varchar(251) NOT NULL
);

select * from VancouverRestaurant;
insert into VancouverRestaurant (id, name, address, postal_code,status, cuisine)
values (1,"Little Sai Gon","3366 Main Street","V5I M2I","Take out only","Vietnamese food");
insert into VancouverRestaurant (id, name, address, postal_code,status, cuisine)
values (2,"Petit","6766 Main Street","Y7I I2I","Dine in","Vietnamese food");
insert into VancouverRestaurant (id, name, address, postal_code,status, cuisine)
values (3,"Hentatsu","3366 Main Street","V5I P8I","Take out only","Sushi");
insert into VancouverRestaurant (id, name, address, postal_code,status, cuisine)
values (4,"Miku Vancouver","3366 Broadway Street","Y7U M2I","Closed permanent","Sushi");
insert into VancouverRestaurant (id, name, address, postal_code,status, cuisine)
values (5,"Blue Caffe","3566 Hamilton","V5I U8O","Take out only","Seafood");
insert into VancouverRestaurant (id, name, address, postal_code,status, cuisine)
values (6,"Au Comptoir","2278 W 4th Ave","U5O M2I","Take out only","French food");


select * from VancouverRestaurant;
--------------------------------------------------------------------------------------------------
CREATE TABLE BurnabyRestaurant (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(251) NOT NULL,
    address varchar(251) NOT NULL,
    postal_code varchar(251) NOT NULL,
    status varchar(251) NOT NULL,
    cuisine varchar(251) NOT NULL
);

select * from BurnabyRestaurant;
insert into BurnabyRestaurant (id, name, address, postal_code,status, cuisine)
values (1,"Little Sai Gon","3366 Main Street","V5I M2I","Take out only","Vietnamese food");
insert into BurnabyRestaurant (id, name, address, postal_code,status, cuisine)
values (2,"Petit","6766 Main Street","Y7I I2I","Dine in","Vietnamese food");
insert into BurnabyRestaurant (id, name, address, postal_code,status, cuisine)
values (3,"Hentatsu","3366 Main Street","V5I P8I","Take out only","Sushi");
insert into BurnabyRestaurant (id, name, address, postal_code,status, cuisine)
values (4,"Miku Vancouver","3366 Broadway Street","Y7U M2I","Closed permanent","Sushi");
insert into BurnabyRestaurant(id, name, address, postal_code,status, cuisine)
values (5,"Blue Caffe","3566 Hamilton","V5I U8O","Take out only","Seafood");
insert into BurnabyRestaurant (id, name, address, postal_code,status, cuisine)
values (6,"Au Comptoir","2278 W 4th Ave","U5O M2I","Take out only","French food");


----------------------------------------------------------------------------------------------------------------
CREATE TABLE RichmondRestaurant (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(251) NOT NULL,
    address varchar(251) NOT NULL,
    postal_code varchar(251) NOT NULL,
    status varchar(251) NOT NULL,
    cuisine varchar(251) NOT NULL
);
