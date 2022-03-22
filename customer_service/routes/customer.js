const { Router } = require('express');
const { updateCustomerBalance, fundAccount } = require('../controllers/customer');
const { default: accountFundingValidation } = require('../validations/accountFunding');

const router = Router();

router.route('/:customerId').patch(updateCustomerBalance);
router.route('/fund').post(celebrate(accountFundingValidation.request, { abortEarly: false }), fundAccount);

module.exports = router;