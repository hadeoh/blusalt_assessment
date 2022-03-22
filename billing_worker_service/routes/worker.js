const { Router } = require('express');
const { charge } = require('../controllers/charge');

const router = Router();

router.route('/').post(charge)

module.exports = router;