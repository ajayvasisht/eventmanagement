const db = require('../models');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await db.Event.findAll({
      include: [{
        model: db.TicketType,
        as: 'TicketTypes'  // Must match exactly with the association alias
      }]
    });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await db.Event.findByPk(req.params.id, {
      include: [{
        model: db.TicketType,
        as: 'TicketTypes'  // Must match exactly with the association alias
      }]
    });
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};