const { Router } = require('express');
const dogsRouter = require('./dogsRouter');
const tempRouter = require('./temperamentsRoute');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', dogsRouter);

router.use('/temperaments', tempRouter);



module.exports = router;
