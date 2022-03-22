const httpStatus = require('http-status');
const sendResponse = require('../helpers/response');
const rabbitSender = require('../rabbitmq/sender');
const axios = require('axios').default;

const charge = async (req, res, next) => {
    setTimeout(() => {
        try {
            const {transactionId, customerId, amount} = req.body;
            const balanceReq = {amount}
            rabbitSender.send('Customer-Balance', axios.patch(process.env.CUSTOMERS_URL + 'customers/' + customerId, balanceReq))
            rabbitSender.send('Billing-Worker-Transaction', axios.patch(process.env.BILLING_URL + 'transactions/' + transactionId))
            return res.json(sendResponse(httpStatus.OK, 'success', null, null));
        } catch (error) {
            next(error);
        }
    }, 100);
}

module.exports = {charge};