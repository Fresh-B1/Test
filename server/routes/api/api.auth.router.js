const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const generateTokens = require('../../utils/authUtils');
const configJWT = require('../../middleware/configJWT');

router.post('/authorization', async (req, res) => {
  let user;
  try {
    const { login, password } = req.body;

    user = await User.findOne({ where: { login } });
    if (!user) {
      res.json({ message: 'Такого пользователя нет или пароль неверный' });
      return;
    }
    const isSame = await bcrypt.compare(password, user.password);
    if (!isSame) {
      res.json({ message: 'Такого пользователя нет или пароль неверный' });
      return;
    }
    user = await User.findOne({
      where: { id: user.id },
      attributes: ['id', 'fullName', 'login'],
    });

    const { accessToken, refreshToken } = generateTokens({ user });

    res
      .cookie(configJWT.access.type, accessToken, {
        maxAge: configJWT.access.expiresIn,
        httpOnly: true,
      })
      .cookie(configJWT.refresh.type, refreshToken, {
        maxAge: configJWT.refresh.expiresIn,
        httpOnly: true,
      })
      .json({ message: 'success', user });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.post('/registration', async (req, res) => {
  let user;
  const regex = new RegExp('^[a-zA-Z0-9]+$');
  try {
    const { fullName, login, password, rpassword } = req.body;

    if (login.includes(' ') || !regex.test(login)) {
      res.json({
        message:
          'login должен состоять из латинских бук и не содержать пробелы!',
      });
      return;
    }

    if (password !== rpassword) {
      res.json({ message: 'Пароли не совпадают!' });
      return;
    }
    user = await User.findOne({ where: { login } });
    if (user) {
      res.json({ message: 'Такой пользователь уже есть!' });
      return;
    }
    const hash = await bcrypt.hash(password, 10);
    user = await User.create({ fullName, login, password: hash, score: 0 });

    user = await User.findOne({
      where: { id: user.id },
      attributes: ['id', 'fullName', 'login'],
    });

    const { accessToken, refreshToken } = generateTokens({ user });
    res
      .cookie(configJWT.access.type, accessToken, {
        maxAge: configJWT.access.expiresIn,
        httpOnly: true,
      })
      .cookie(configJWT.refresh.type, refreshToken, {
        maxAge: configJWT.refresh.expiresIn,
        httpOnly: true,
      })
      .json({ message: 'success', user });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get('/check', async (req, res) => {
  try {
    if (res.locals.user) {
      const user = await User.findOne({
        where: { id: res.locals.user.id },
        attributes: ['id', 'fullName', 'login'],
      });
      res.json({ message: 'success', user });
      return;
    }
    res.json({ message: 'Войдите в свой аккаунт' });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get('/logout', (req, res) => {
  try {
    res.clearCookie(configJWT.access.type).clearCookie(configJWT.refresh.type);
    res.json({ message: 'success' });
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
