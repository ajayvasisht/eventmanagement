const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const db = require('../models');

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);

router.get('/:id/ticket-types', async (req, res) => {
  try {
    const event = await db.Event.findByPk(req.params.id, {
      include: [{
        model: db.TicketType,
        as: 'TicketTypes'  // Must match exactly with the association alias
      }]
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event.TicketTypes);  // Note the capitalization here too
  } catch (error) {
    console.error('Error fetching ticket types:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;