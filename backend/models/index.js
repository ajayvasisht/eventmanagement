const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'eventpro_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
  }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import models
db.Event = require('./Event')(sequelize, DataTypes);
db.TicketType = require('./TicketType')(sequelize, DataTypes);
db.TicketBooking = require('./TicketBooking')(sequelize, DataTypes);
db.Payment = require('./Payment')(sequelize, DataTypes);

// Define associations
db.Event.hasMany(db.TicketType, {
  foreignKey: 'event_id',
  as: 'TicketTypes'
});

db.TicketType.belongsTo(db.Event, {
  foreignKey: 'event_id'
});

db.TicketType.hasMany(db.TicketBooking, {
  foreignKey: 'ticket_type_id'
});

db.TicketBooking.belongsTo(db.TicketType, {
  foreignKey: 'ticket_type_id'
});

db.TicketBooking.hasOne(db.Payment, {
  foreignKey: 'booking_id'
});

db.Payment.belongsTo(db.TicketBooking, {
  foreignKey: 'booking_id'
});

module.exports = db;