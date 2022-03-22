const { Router } = require('express');
const {celebrate} = require('celebrate')
const { default: transactionValidation } = require('../validations/transaction');
const { updateTransaction, saveTransaction } = require('../controllers/transaction');

const router = Router();

router.route('/').post(celebrate(transactionValidation.transaction, { abortEarly: false }), saveTransaction);
router.route('/:transactionId').patch(updateTransaction)

module.exports = router;