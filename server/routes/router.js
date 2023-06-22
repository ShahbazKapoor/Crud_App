const express = require('express');
const route = express.Router();
const services = require('../services/render')


/**
 * @description index route
 * @method get
 */
route.get('/', services.indexRoutes);

/**
 * @description product home route
 * @method get
 */
route.get('/products', services.productRoutes);

/**
 * @description category home route
 * @method get
 */
route.get('/category', services.categoryRoutes);

/**
 * @description add product route
 * @method get and post
 */
route.get('/add-product', services.addProduct);
route.post('/products', services.productAdding);
route.post('/addProduct', services.productSave);

/**
 * @description add category route
 * @method get and post
 */
route.get('/add-category', services.addCategory);
route.post('/category', services.categoryAdding);
route.post('/addCategory', services.categorySave);

/**
 * @description update product route
 * @method get and post
 */
route.get('/update-product/:id', services.updateProduct);
route.post('/productupdate', services.productUpdate);

/**
 * @description update home route
 * @method get
 */
route.get('/update-category/:id', services.updateCategory);
route.post('/categoryUpdate', services.categoryUpdate);

/**
 * @description related home route
 * @method get
 */
route.get('/category/:id', services.insideCategory);

/**
 * @description Delete Product
 * @method get
 */
route.get('/deleteProduct/:id', services.deleteProduct);

/**
 * @description Delete Category
 * @method get
 */
route.get('/deleteCategory/:id', services.deleteCategory);

module.exports = route;