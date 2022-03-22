const httpStatus = require('http-status');
const { CustomerQuery } = require('../queries');
const sendResponse = require('../helpers/response');
const rabbitSender = require('../rabbitmq/sender');
const axios = require('axios').default;

const updateCustomerBalance = async (req, res, next) => {
    try {
        const { customerId } = req.params;
        const { amount } = req.body;

        const customer = await CustomerQuery.findOne({_id: customerId});

        if (customer == null) {
            return res.status(httpStatus.NOT_FOUND).json(sendResponse(httpStatus.NOT_FOUND, 'No customer with such id', null, null));
        }

        let previousBalance = customer.currentBalance;
        let currentBalance = parseFloat(previousBalance) + parseFloat(amount);

        const newCustomer = await CustomerQuery.update({ previousBalance, currentBalance}, { _id: customerId });

        return res.json(sendResponse(httpStatus.OK, 'success', newCustomer, null));
    } catch (error) {
        next(error);
    }
}

 const fundAccount = async (req, res, next) => {
    try {
        const customer = await CustomerQuery.findOne({ _id: req.body.customerId });

        if (customer == null) {
            return res.status(httpStatus.NOT_FOUND).json(sendResponse(httpStatus.NOT_FOUND, 'No customer with such id', null, null));
        }

        const data = req.body;

        rabbitSender.send('Account-Funding', await axios.post(process.env.BILLING_URL + 'transactions', data))

        return res.json(sendResponse(httpStatus.CREATED, 'Account Funding successful', null, null));
    } catch (error) {
        next(error)
    }

 }

module.exports = {fundAccount, updateCustomerBalance}