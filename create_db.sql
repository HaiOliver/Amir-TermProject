CREATE TABLE Users (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email varchar(251),
    api_key varchar(251),
    number_of_requests int,
    promo varchar(251)
);

CREATE TABLE VancouverRestaurant (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(251),
    address varchar(251),
    postal_code varchar(251),
    status varchar(251),
    cuisine varchar(251)
);

CREATE TABLE BurnabyRestaurant (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(251),
    address varchar(251),
    postal_code varchar(251),
    status varchar(251),
    cuisine varchar(251)
);

CREATE TABLE RichmondRestaurant (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(251),
    address varchar(251),
    postal_code varchar(251),
    status varchar(251),
    cuisine varchar(251)
);
