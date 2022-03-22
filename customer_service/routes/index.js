const { Router } = require('express');
const customerRoutes = require('../routes/customer');


const router = Router();

/** GET /health-check - Check service health */
router.get('/health-check', (_req, res) => res.send({ check: 'server started ok' }));

router.use('/customers', customerRoutes);

module.exports = router;