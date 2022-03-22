const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    amount:  { type: Number},
    status: {type: String, default: 'PENDING'},
    customerId: {type: String, unique: true}
});

TransactionSchema.index({customerId: 'text'})

const transactions_conn = process.env.MONGO_CONN_TRANSACTIONS;

const transactions = mongoose.createConnection(transactions_conn, { useNewUrlParser: true });

const Transaction = transactions.model('Transaction', TransactionSchema);

module.exports = Transaction;