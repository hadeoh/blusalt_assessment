const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    firstName:  { type: String},
    lastName: {type: String},
    email: {type: String, unique: true},
    previousBalance: { type: Number, default: 0.00 },
    currentBalance: { type: Number, default: 0.00 }
});

CustomerSchema.index({email: 'text'})

const customers_conn = process.env.MONGO_CONN_CUSTOMERS;

const customers = mongoose.createConnection(customers_conn, { useNewUrlParser: true });

const Customer = customers.model('Customer', CustomerSchema);

module.exports = Customer;