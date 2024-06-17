const router = require('express').Router();

// api
const authApiRouter = require('./api/api.auth.router');
const clientsApiRouter = require('./api/api.clients.router');

// api router
router.use('/api/auth', authApiRouter);
router.use('/api/clients', clientsApiRouter);

module.exports = router;
