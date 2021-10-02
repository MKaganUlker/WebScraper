CREATE DATABASE Products;

CREATE TABLE Product(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    image VARCHAR(255),
    price float
);

ALTER TABLE Product
ALTER COLUMN price TYPE VARCHAR;

DELETE FROM product
WHERE id=7;