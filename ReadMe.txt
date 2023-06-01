1.  Install Nodejs.
2.  Install Dependencies.
        1. body-parser
        2. cors
        3. dotenv
        4. ejs
        5. express
        6. morgan
        7. mysql
        8. nodemon
        9. url-parse
3.  Install mysql
4.  Create Database mycrud.
5.  Create table categories.
6.  CategoryId as INT as PRIMARY KEY with AUTO_INCREMENT.
7.  CategoryName as VARCHAR and NOT NULL.
8.  Create table products.
9.  ProductId as INT as PRIMARY KEY with AUTO_INCREMENT.
10. ProductName as VARCHAR and NOT NULL.
11. CategoryName as VARCHAR and NOT NULL.
12. CategoryId as INT and NOT NULL.
13. FOREIGN KEY as (CategoryId) with REFERENCES categories(CategoryId)
    
    Example:-
            CREATE TABLE categories (
            CategoryId INT PRIMARY KEY AUTO_INCREMENT,
            CategoryName VARCHAR(50) NOT NULL
            );

            CREATE TABLE products (
            ProductId INT PRIMARY KEY AUTO_INCREMENT,
            ProductName VARCHAR(50) NOT NULL,
            CategoryName VARCHAR(50) NOT NULL,
            CategoryId INT NOT NULL,
            FOREIGN KEY (CategoryId) REFERENCES categories(CategoryId)
            );

14. Open Teminal and npm start.