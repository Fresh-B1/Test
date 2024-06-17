const router = require('express').Router();
const { Client } = require('../../db/models');

// Отрисовка списка клиентов на MainPage
router.get('/load', async (req, res) => {
  try {
    const responsibleUser = res.locals.user.id;
    const clients = await Client.findAll({
      where: { userId: responsibleUser },
    });
    res.status(200).json({ message: 'success', clients });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

// Обновление статуса сделки по клиенту
router.patch('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    //Проверка на IDOR
    const checkAuth = await Client.findOne({ where: { id } });
    if (checkAuth.userId !== res.locals.user.id) {
      res.status(401).json({ message: '401' });
      return;
    }

    const updateStatus = await Client.update({ status }, { where: { id } });

    const responsibleUser = res.locals.user.id;
    const clients = await Client.findAll({
      where: { userId: responsibleUser },
    });

    if (updateStatus[0]) {
      res.status(200).json({ message: 'success', clients });
    }
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

module.exports = router;
