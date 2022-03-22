const { Router } = require('express');
const workerRoutes = require('../routes/worker');


const router = Router();

/** GET /health-check - Check service health */
router.get('/health-check', (_req, res) => res.send({ check: 'server started ok' }));

router.use('/worker', workerRoutes);

module.exports = router;