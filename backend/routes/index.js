const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');

const userRouter = require('./users');
const cardRouter = require('./cards');

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый адрес отсутствует, укажите существующий путь!!!'));
});

module.exports = router;
