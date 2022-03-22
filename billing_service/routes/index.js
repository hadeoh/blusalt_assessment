const { Router } = require('express');
const transactionRoutes = require('../routes/transaction');


const router = Router();

/** GET /health-check - Check service health */
router.get('/health-check', (_req, res) => res.send({ check: 'server started ok' }));

router.use('/transactions', transactionRoutes);

module.exports = router;