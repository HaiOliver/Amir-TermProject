CREATE TABLE Users (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email varchar(251) NOT NULL,
    api_key varchar(251) NOT NULL,
    number_of_requests int NOT NULL,
    promo varchar(251) NOT NULL
);

CREATE TABLE VancouverRestaurant (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(251) NOT NULL,
    address varchar(251) NOT NULL,
    postal_code varchar(251) NOT NULL,
    status varchar(251) NOT NULL,
    cuisine varchar(251) NOT NULL
);

CREATE TABLE BurnabyRestaurant (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(251) NOT NULL,
    address varchar(251) NOT NULL,
    postal_code varchar(251) NOT NULL,
    status varchar(251) NOT NULL,
    cuisine varchar(251) NOT NULL
);

CREATE TABLE RichmondRestaurant (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(251) NOT NULL,
    address varchar(251) NOT NULL,
    postal_code varchar(251) NOT NULL,
    status varchar(251) NOT NULL,
    cuisine varchar(251) NOT NULL
);
