const db = require('../models');
const TicketBooking = db.TicketBooking;
const TicketType = db.TicketType;

exports.createBooking = async (req, res) => {
  const t = await db.sequelize.transaction();
  
  try {
    const { ticket_type_id, quantity } = req.body;
    
    // Check ticket availability
    const ticketType = await TicketType.findByPk(ticket_type_id);
    if (!ticketType || ticketType.available_seats < quantity) {
      throw new Error('Not enough tickets available');
    }

    // Create booking and update available seats
    const booking = await TicketBooking.create(req.body, { transaction: t });
    await ticketType.update({
      available_seats: ticketType.available_seats - quantity
    }, { transaction: t });

    await t.commit();
    res.status(201).json(booking);
  } catch (error) {
    await t.rollback();
    res.status(400).json({ message: error.message });
  }
};