const mongoose = require('mongoose');
const Customer = require('../models/Customer');

const customers_conn = process.env.MONGO_CONN_CUSTOMERS;

mongoose.createConnection(customers_conn, { useNewUrlParser: true });

const customer = {
    firstName: 'Blu',
    lastName: 'Salt',
    email: 'blusalt@gmail.com'
}

const seedDb = async () => {
    await Customer.create(customer);
}

seedDb().then(() => mongoose.connection.close());