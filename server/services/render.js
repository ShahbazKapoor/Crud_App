const connectDB = require('../database/connection');

exports.indexRoutes = (req,res) => {
    res.render("index");
}

exports.productRoutes = (req,res) => {
    const resultsPerPage = 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * resultsPerPage;
  
    const countQuery = 'SELECT COUNT(*) AS total FROM products';
    const dataQuery = `SELECT * FROM products LIMIT ${offset}, ${resultsPerPage}`;
  
    // Execute the count query to get the total number of products
    connectDB.query(countQuery, (countErr, countRows) => {
        if (countErr) {
            console.error('Error executing count query:', countErr);
            res.status(500).send('Internal Server Error');
        } 
        else {
            const totalResults = countRows[0].total;
            const totalPages = Math.ceil(totalResults / resultsPerPage);

            // Execute the data query to fetch the products for the current page
            connectDB.query(dataQuery, (dataErr, dataRows) => {
            if (dataErr) {
                console.error('Error executing data query:', dataErr);
                res.status(500).send('Internal Server Error');
            } else {
                res.render('products', {
                product_s: dataRows,
                currentPage: page,
                totalPages: totalPages,
                });
            }
            });
        }
    });
}

// exports.categoryRoutes = (req,res) => {
//     let sql = "SELECT * FROM categories";
//     let query = connectDB.query(sql, (err, rows) => {
//         if (err) {
//             console.log(err)
//         }
//         else {
//             res.render("categories", {
//                 category_s: rows,
//             });
//         }

//     });
// }

exports.categoryRoutes = (req, res) => {
    const resultsPerPage = 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * resultsPerPage;

    const countQuery = 'SELECT COUNT(*) AS total FROM categories';
    const dataQuery = `SELECT * FROM categories LIMIT ${offset}, ${resultsPerPage}`;

    // Execute the count query to get the total number of categories
    connectDB.query(countQuery, (countErr, countRows) => {
        if (countErr) {
            console.error('Error executing count query:', countErr);
            res.status(500).send('Internal Server Error');
        } else {
            const totalResults = countRows[0].total;
            const totalPages = Math.ceil(totalResults / resultsPerPage);

            // Execute the data query to fetch the categories for the current page
            connectDB.query(dataQuery, (dataErr, dataRows) => {
                if (dataErr) {
                    console.error('Error executing data query:', dataErr);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.render('categories', {
                        category_s: dataRows,
                        currentPage: page,
                        totalPages: totalPages,
                    });
                }
            });
        }
    });
};


exports.addProduct = (req,res) => {
    res.render("addProduct");
}

exports.productAdding = (req,res) => {
    const { productId, productName, categoryId } = req.body;
    const sql = `INSERT INTO products (ProductId, ProductName, CategoryId) VALUES (${productId}, '${productName}', ${categoryId})`;
    connectDB.query(sql, (err, results) => {
        if (err) {
            console.log(err);
        }
        else{
            res.send("Data added sucessfully!");
        }
    });
}

exports.productSave = (req,res) => {
    let data = {
        ProductName: req.body.ProductName,
        CategoryName: req.body.CategoryName,
        CategoryId: req.body.CategoryId,
      };
      let sql = `INSERT INTO products SET ?`;
      let query = connectDB.query(sql, data, (err, results) => {
        if (err) {
            console.log(err);
        }
        else{
            res.redirect("/products");
        }
    });
}

exports.addCategory = (req,res) => {
    res.render("addCategory");
}

exports.categoryAdding = (req,res) => {
    const { categoryId, categoryName } = req.body;
    const sql = `INSERT INTO categories (CategoryId, CategoryName) VALUES (${categoryId}, '${categoryName}')`;
    connectDB.query(sql, (err, results) => {
        if (err) {
            console.log(err);
        }
        else{
            res.send("Data added sucessfully!");
        }
    });
}

exports.categorySave = (req,res) => {
    let data = {
        CategoryName: req.body.CategoryName,
        CategoryId: req.body.CategoryId,
      };
      let sql = `INSERT INTO categories(CategoryId,CategoryName) values(${data.CategoryId},'${data.CategoryName}')`;
      let query = connectDB.query(sql, (err, results) => {
        if (err){
            console.log(err);
        }
        else{
            res.redirect("/category");
        }
    });
}

exports.updateProduct = (req,res) => {
    const id = req.params.id;
    let sql = `Select * from products where ProductId = ${id}`;
    let query = connectDB.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("updateProduct", {
                product: result[0]
            });
        }

    });
}

exports.productUpdate = (req,res) => {
    const Id = req.body.ProductId;
    let sql = "update products SET ProductName='" + req.body.ProductName + "',  CategoryName='" + req.body.CategoryName + "', CategoryId ='" + req.body.CategoryId + "' where ProductId =" + Id;
    let query = connectDB.query(sql, (err, results) => {
    if (err) {
        console.log(err);
    }
    else {
        res.redirect("/products");
    }
    });
}

exports.updateCategory = (req,res) => {
    const id = req.params.id;
    let sql = `select * FROM categories where CategoryId=${id}`;
    let query = connectDB.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.render("updateCategory", {
            category: result[0]
        });
      }
    });
}

exports.categoryUpdate = (req,res) => {
    const Id = req.body.CategoryId;
    const name = req.body.CategoryName;
    let sql = `update categories set CategoryName = '${name}'  where CategoryId=${Id}`;
    let query = connectDB.query(sql, (err, results) => {
      if (err) {
        console.log(err);
      }
      else{
        res.redirect("/category");
      }
    });
}

exports.insideCategory = (req,res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM products where CategoryId=${id}`;
    let query = connectDB.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
      }
      else {
        res.render("relatedProduct", {
            product_s: rows,
        });
      }
    });
}


exports.deleteProduct = (req,res) => {
    const id = req.params.id;
    let sql = `delete FROM products where ProductId=${id}`;
    let query = connectDB.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
      }
      else{
      res.redirect("/products");
      }
    });
}

exports.deleteCategory = (req,res) => {
    const id = req.params.id;
    let sql = `delete FROM categories where CategoryId=${id}`;
    let query = connectDB.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
      }
      else {
        res.redirect("/category");
      }
    });
}