const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./models');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;

const initializeDatabase = async () => {
  try {
    // Drop tables in correct order
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await db.Payment.drop();
    await db.TicketBooking.drop();
    await db.TicketType.drop();
    await db.Event.drop();
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    // Sync all models
    await db.sequelize.sync({ force: true });
    
    console.log('Database synchronized');

    // Add test data
    const event = await db.Event.create({
      event_name: 'Summer Concert',
      event_description: 'A fantastic summer concert',
      event_date: new Date('2024-12-20'),
      capacity: 100,
      status: 'upcoming'
    });

    const ticketType = await db.TicketType.create({
      ticket_name: 'VIP',
      price: 100.00,
      seating_type: 'VIP',
      available_seats: 50,
      event_id: event.event_id
    });

    console.log('Test data inserted successfully');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};

initializeDatabase();