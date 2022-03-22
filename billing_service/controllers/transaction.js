const httpStatus = require('http-status');
const { TransactionQuery } = require('../queries');
const sendResponse = require('../helpers/response');
const rabbitSender = require('../rabbitmq/sender');
const axios = require('axios').default;

const saveTransaction = async (req, res, next) => {
    try {
        let { customerId, amount } = req.body;

        amount = amount.toFixed(2);

        const transaction = await TransactionQuery.create({customerId, amount});

        const data = {transactionId: transaction._id, customerId, amount}

        rabbitSender.send('Worker-Service', await axios.post(process.env.BILLING_WORKER_URL, data))

        return res.json(sendResponse(httpStatus.OK, 'success', transaction, null));
    } catch (error) {
        next(error);
    }
}

const updateTransaction = async (req, res, next) => {
    try {
        const { transactionId } = req.params;

        const transaction = await TransactionQuery.update({status: 'SUCCESS'}, { _id: transactionId });

        if (transaction == null) {
            return res.status(httpStatus.NOT_FOUND).json(sendResponse(httpStatus.NOT_FOUND, 'No such transaction', null, null));
        }

        return res.json(sendResponse(httpStatus.OK, 'success', transaction, null));
    } catch (error) {
        next(error);
    }
}

module.exports = {saveTransaction, updateTransaction}